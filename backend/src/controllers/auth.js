import crypto from "node:crypto";
import { getPool, sql } from "../configuration/db.js";

// ───────────────── HASH ─────────────────

const hashPassword = (password) => {

  return crypto
    .createHash('sha256')
    .update(password, 'utf8')
    .digest('hex');
};

// ───────────────── LOGIN ─────────────────

export const login = async (req, res) => {

  try {

    const {
      username,
      password
    } = req.body;

    if (!username || !password) {

      return res.status(400).json({
        message: "Username y password requeridos"
      });
    }

    const hashedPassword =
      hashPassword(password);

    const pool = getPool();

    const result = await pool.request()

      .input(
        "username",
        sql.VarChar,
        username
      )

      .input(
        "password",
        sql.VarChar,
        hashedPassword
      )

      .query(`
        SELECT TOP 1
          u.id,
          u.username,
          r.name
        FROM users u

        INNER JOIN user_roles ur
          ON ur.users_id = u.id

        INNER JOIN roles r
          ON r.id = ur.role_id

        WHERE
          u.username = @username
          AND u.password_hash = @password
      `);

    if (!result.recordset.length) {

      return res.status(401).json({
        message: "Credenciales inválidas"
      });
    }

    const user =
      result.recordset[0];

    res.json({
      message:
        "Inicio de sesión exitoso",
      user
    });

  } catch (error) {

    console.error(
      "Error en login:",
      error.message || error
    );

    res.status(500).json({
      message:
        "Error interno de autenticación"
    });
  }
};

// ───────────────── REGISTER ─────────────────

export const registerUser = async (req, res) => {

  try {

    const {
      username,
      password,
      adminUsername,
      adminPassword
    } = req.body;

    // VALIDAR CAMPOS

    if (
      !username ||
      !password ||
      !adminUsername ||
      !adminPassword
    ) {

      return res.status(400).json({
        message: "Datos incompletos"
      });
    }

    const pool = getPool();

    // ───── VALIDAR ADMIN ─────

    const hashedAdminPassword =
      hashPassword(adminPassword);

    const adminResult =
      await pool.request()

        .input(
          "adminUsername",
          sql.VarChar,
          adminUsername
        )

        .input(
          "adminPassword",
          sql.VarChar,
          hashedAdminPassword
        )

        .query(`
          SELECT TOP 1
            u.id,
            u.username
          FROM users u

          INNER JOIN user_roles ur
            ON ur.users_id = u.id

          WHERE
            u.username = @adminUsername
            AND u.password_hash = @adminPassword
            AND ur.role_id = 1
        `);

    // SI NO ES ADMIN → DENEGAR

    if (!adminResult.recordset.length) {

      return res.status(403).json({
        message:
          "Credenciales de administrador inválidas"
      });
    }

    // ───── VALIDAR SI EL USUARIO YA EXISTE ─────

    const existing =
      await pool.request()

        .input(
          "username",
          sql.VarChar,
          username
        )

        .query(`
          SELECT TOP 1 id
          FROM users
          WHERE username = @username
        `);

    if (existing.recordset.length) {

      return res.status(409).json({
        message:
          "El usuario ya existe"
      });
    }

    // ───── CREAR USUARIO ─────

    const hashedPassword =
      hashPassword(password);

    const insertUser =
      await pool.request()

        .input(
          "username",
          sql.VarChar,
          username
        )

        .input(
          "password",
          sql.VarChar,
          hashedPassword
        )

        .query(`
          INSERT INTO users (
            username,
            password_hash
          )

          OUTPUT INSERTED.id

          VALUES (
            @username,
            @password
          )
        `);

    const newUserId =
      insertUser.recordset[0].id;

    // ───── ASIGNAR ROL EMPLOYEE ─────

    await pool.request()

      .input(
        "users_id",
        sql.Int,
        newUserId
      )

      .input(
        "role_id",
        sql.Int,
        2
      )

      .query(`
        INSERT INTO user_roles (
          users_id,
          role_id
        )

        VALUES (
          @users_id,
          @role_id
        )
      `);

    res.status(201).json({
      message:
        "Usuario registrado correctamente"
    });

  } catch (error) {

    console.error(
      "Error en registro:",
      error.message || error
    );

    res.status(500).json({
      message:
        "Error interno al registrar usuario"
    });
  }
};

// ───────────────── CHANGE PASSWORD ─────────────────

export const changePassword = async (req, res) => {

  try {

    const {
      username,
      oldPassword,
      newPassword
    } = req.body;

    if (
      !username ||
      !oldPassword ||
      !newPassword
    ) {

      return res.status(400).json({
        message:
          "Datos incompletos para cambiar contraseña"
      });
    }

    const pool = getPool();

    const hashedOldPassword =
      hashPassword(oldPassword);

    const hashedNewPassword =
      hashPassword(newPassword);

    const existing =
      await pool.request()

        .input(
          "username",
          sql.VarChar,
          username
        )

        .input(
          "oldPassword",
          sql.VarChar,
          hashedOldPassword
        )

        .query(`
          SELECT TOP 1 id
          FROM users
          WHERE
            username = @username
            AND password_hash = @oldPassword
        `);

    if (!existing.recordset.length) {

      return res.status(401).json({
        message:
          "La contraseña actual es incorrecta"
      });
    }

    await pool.request()

      .input(
        "username",
        sql.VarChar,
        username
      )

      .input(
        "password",
        sql.VarChar,
        hashedNewPassword
      )

      .query(`
        UPDATE users

        SET password_hash = @password

        WHERE username = @username
      `);

    res.json({
      message:
        "Contraseña actualizada correctamente"
    });

  } catch (error) {

    console.error(
      "Error en changePassword:",
      error.message || error
    );

    res.status(500).json({
      message:
        "Error interno al cambiar contraseña"
    });
  }
};