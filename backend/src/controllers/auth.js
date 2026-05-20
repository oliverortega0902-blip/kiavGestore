import crypto from "node:crypto";
import { getPool, sql } from "../configuration/db.js";

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password, 'utf8').digest('hex');
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username y password requeridos" });
    }

    const hashedPassword = hashPassword(password);
    const pool = getPool();
    const result = await pool.request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, hashedPassword)
      .query(`SELECT TOP 1 id, username
              FROM dbo.users
              WHERE username = @username
                AND password_hash = @password`);

    if (!result.recordset.length) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const user = result.recordset[0];
    res.json({ message: "Inicio de sesión exitoso", user });
  } catch (error) {
    console.error("Error en login:", error.message || error);
    res.status(500).json({ message: "Error interno de autenticación" });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username y password requeridos" });
    }

    const pool = getPool();
    const existing = await pool.request()
      .input("username", sql.VarChar, username)
      .query(`SELECT 1 AS existsUser FROM dbo.users WHERE username = @username`);

    if (existing.recordset.length) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = hashPassword(password);
    await pool.request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, hashedPassword)
      .query(`INSERT INTO dbo.users (username, password_hash)
              VALUES (@username, @password)`);

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    console.error("Error en registro:", error.message || error);
    res.status(500).json({ message: "Error interno al registrar usuario" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { username, oldPassword, newPassword } = req.body;

    if (!username || !oldPassword || !newPassword) {
      return res.status(400).json({ message: "Datos incompletos para cambiar contraseña" });
    }

    const pool = getPool();
    const hashedOldPassword = hashPassword(oldPassword);
    const hashedNewPassword = hashPassword(newPassword);

    const existing = await pool.request()
      .input("username", sql.VarChar, username)
      .input("oldPassword", sql.VarChar, hashedOldPassword)
      .query(`SELECT TOP 1 id FROM dbo.users WHERE username = @username AND password_hash = @oldPassword`);

    if (!existing.recordset.length) {
      return res.status(401).json({ message: "La contraseña actual es incorrecta" });
    }

    await pool.request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, hashedNewPassword)
      .query(`UPDATE dbo.users SET password_hash = @password WHERE username = @username`);

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error en changePassword:", error.message || error);
    res.status(500).json({ message: "Error interno al cambiar contraseña" });
  }
};
