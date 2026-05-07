import { getPool, sql } from "../configuration/db.js";

// CREATE
export const createRole = async (req, res) => {
  try {
    const { name } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("name", sql.VarChar, name)
      .execute("sp_create_role");

    res.json({ message: "Rol creado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al crear rol ❌", error: error.message });
  }
};

// EDIT
export const editRole = async (req, res) => {
  try {
    const { id, name } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("name", sql.VarChar, name)
      .execute("sp_edit_role");

    res.json({ message: "Rol actualizado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al editar rol ❌", error: error.message });
  }
};

// SELECT
export const selectRole = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_select_role");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al obtener rol ❌", error: error.message });
  }
};

// DELETE
export const deleteRole = async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_delete_role");

    res.json({ message: "Rol eliminado ✅" });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al eliminar rol ❌", error: error.message });
  }
};

// controllers/roles.controller.js
export const getAllRoles = async (req, res) => {
  try {
    const pool = getPool();

    const result = await pool.request()
      .query("SELECT * FROM vw_roles ORDER BY name");

    res.json(result.recordset);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener roles ❌",
      error: error.message
    });
  }
};