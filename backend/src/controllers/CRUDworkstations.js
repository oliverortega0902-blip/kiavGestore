import { getPool, sql } from "../configuration/db.js";

// CREATE
export const createWorkspace = async (req, res) => {
  try {
    const { title, department } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("title", sql.VarChar, title)
      .input("department", sql.Int, department)
      .execute("sp_create_workspaces");

    res.json({ message: "Espacio de trabajo creado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al crear espacio de trabajo ❌", error: error.message });
  }
};

// EDIT
export const editWorkspace = async (req, res) => {
  try {
    const { id, title, department } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("title", sql.VarChar, title)
      .input("department", sql.Int, department)
      .execute("sp_edit_workspaces");

    res.json({ message: "Espacio de trabajo actualizado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al editar espacio de trabajo ❌", error: error.message });
  }
};

// SELECT
export const selectWorkspace = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_select_workspaces");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al obtener espacio de trabajo ❌", error: error.message });
  }
};

// DELETE
export const deleteWorkspace = async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_delete_workspaces");

    res.json({ message: "Espacio de trabajo eliminado ✅" });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al eliminar espacio de trabajo ❌", error: error.message });
  }
};

// controllers/workstations.controller.js
export const getAllWorkstations = async (req, res) => {
  try {
    const pool = getPool();

    const result = await pool.request()
      .query("SELECT * FROM vw_workstations ORDER BY title");

    res.json(result.recordset);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener estaciones ❌",
      error: error.message
    });
  }
};