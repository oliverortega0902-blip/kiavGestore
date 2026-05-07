import { getPool, sql } from "../configuration/db.js";

// CREATE
export const createEventType = async (req, res) => {
  try {
    const { name } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("name", sql.VarChar, name)
      .execute("sp_create_event_kind");

    res.json({ message: "Tipo de evento creado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al crear tipo de evento ❌", error: error.message });
  }
};

// EDIT
export const editEventType = async (req, res) => {
  try {
    const { id, name } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("name", sql.VarChar, name)
      .execute("sp_edit_event_kind");

    res.json({ message: "Tipo de evento actualizado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al editar tipo de evento ❌", error: error.message });
  }
};

// SELECT
export const selectEventType = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_select_event_kind");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al obtener tipo de evento ❌", error: error.message });
  }
};

// DELETE
export const deleteEventType = async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_delete_event_kind");

    res.json({ message: "Tipo de evento eliminado ✅" });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al eliminar tipo de evento ❌", error: error.message });
  }
};


// controllers/eventTypes.controller.js
export const getAllEventTypes = async (req, res) => {
  try {
    const pool = getPool();

    const result = await pool.request()
      .query("SELECT * FROM vw_event_types ORDER BY name");

    res.json(result.recordset);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener tipos de eventos ❌",
      error: error.message
    });
  }
};
