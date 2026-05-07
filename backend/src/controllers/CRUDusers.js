import { getPool, sql } from "../configuration/db.js";

// CREATE
export const createUser = async (req, res) => {
  try {
    const { nombre, contrasena } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("nombre", sql.VarChar, nombre)
      .input("contrasena", sql.VarChar, contrasena)
      .execute("sp_create_users");

    res.json({ message: "Usuario creado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al crear usuario ❌", error: error.message });
  }
};

// EDIT
export const editUser = async (req, res) => {
  try {
    const { id, new_user, new_password } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("new_user", sql.VarChar, new_user)
      .input("new_password", sql.VarChar, new_password)
      .execute("sp_edit_users");

    res.json({ message: "Usuario actualizado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al editar usuario ❌", error: error.message });
  }
};

// SELECT
export const selectUser = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_select_users");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al obtener usuario ❌", error: error.message });
  }
};

// DELETE
export const deleteUser = async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_delete_users");

    res.json({ message: "Usuario eliminado ✅" });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al eliminar usuario ❌", error: error.message });
  }
};

// controllers/users.controller.js
export const getAllUsers = async (req, res) => {
  try {
    const pool = getPool();

    const result = await pool.request()
      .query("SELECT * FROM vw_users ORDER BY username");

    res.json(result.recordset);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener usuarios ❌",
      error: error.message
    });
  }
};