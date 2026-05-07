import { getPool, sql } from "../configuration/db.js";

// CREATE
export const createElementStatus = async (req, res) => {
  try {
    const { name } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("name", sql.VarChar, name)
      .execute("sp_create_inv_state");

    res.json({ message: "Estado de inventario creado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al crear estado de inventario ❌", error: error.message });
  }
};

// EDIT
export const editElementStatus = async (req, res) => {
  try {
    const { id, name } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("name", sql.VarChar, name)
      .execute("sp_edit_inv_state");

    res.json({ message: "Estado de inventario actualizado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al editar estado de inventario ❌", error: error.message });
  }
};

// SELECT
export const selectElementStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_select_inv_state");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al obtener estado de inventario ❌", error: error.message });
  }
};

// DELETE
export const deleteElementStatus = async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_delete_inv_state");

    res.json({ message: "Estado de inventario eliminado ✅" });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al eliminar estado de inventario ❌", error: error.message });
  }
};

// controllers/elementStatus.controller.js
export const getAllElementStatus = async (req, res) => {
  try {
    const pool = getPool();

    const result = await pool.request()
      .query("SELECT * FROM vw_element_status ORDER BY name");

    res.json(result.recordset);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener estados ❌",
      error: error.message
    });
  }
};