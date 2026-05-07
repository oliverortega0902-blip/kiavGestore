import { getPool, sql } from "../configuration/db.js";

// CREATE
export const createDepartment = async (req, res) => {
  try {
    const { name } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("name", sql.VarChar, name)
      .execute("sp_create_departments");

    res.json({ message: "Departamento creado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al crear departamento ❌", error: error.message });
  }
};

// EDIT
export const editDepartment = async (req, res) => {
  try {
    const { id, name } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("name", sql.VarChar, name)
      .execute("sp_edit_departments");

    res.json({ message: "Departamento actualizado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al editar departamento ❌", error: error.message });
  }
};

// SELECT
export const selectDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_select_departments");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al obtener departamento ❌", error: error.message });
  }
};

// DELETE
export const deleteDepartment = async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_delete_departments");

    res.json({ message: "Departamento eliminado ✅" });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al eliminar departamento ❌", error: error.message });
  }
};

// controllers/departments.controller.js
export const getAllDepartments = async (req, res) => {
  try {
    const pool = getPool();

    const result = await pool.request()
      .query("SELECT * FROM vw_departments ORDER BY name");

    res.json(result.recordset);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener departamentos ❌",
      error: error.message
    });
  }
};