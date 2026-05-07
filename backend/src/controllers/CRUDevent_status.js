import { getPool, sql } from "../configuration/db.js";

// CREATE
export const createEventStatus = async (req, res) => {
  try {
    const { name } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("name", sql.VarChar, name)
      .execute("sp_create_events");

    res.json({ message: "Estado de evento creado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al crear estado de evento ❌", error: error.message });
  }
};

// EDIT
export const editEventStatus = async (req, res) => {
  try {
    const { id, name } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("name", sql.VarChar, name)
      .execute("sp_edit_events");

    res.json({ message: "Estado de evento actualizado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al editar estado de evento ❌", error: error.message });
  }
};

// SELECT
export const selectEventStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_select_events");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al obtener estado de evento ❌", error: error.message });
  }
};

// DELETE
export const deleteEventStatus = async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_delete_events");

    res.json({ message: "Estado de evento eliminado ✅" });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al eliminar estado de evento ❌", error: error.message });
  }
};

// controllers/eventStatus.controller.js
export const getAllEventStatus = async (req, res) => {
  try {
    const pool = getPool();

    const result = await pool.request()
      .query("SELECT * FROM vw_event_status ORDER BY name");

    res.json(result.recordset);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener estados de eventos ❌",
      error: error.message
    });
  }
};