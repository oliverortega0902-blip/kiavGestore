import { getPool, sql } from "../configuration/db.js";

// CREATE
export const createEventItem = async (req, res) => {
  try {
    const { event, inventory, quantity } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("event", sql.Int, event)
      .input("inventory", sql.Int, inventory)
      .input("quantity", sql.Int, quantity)
      .execute("sp_create_event_inv");

    res.json({ message: "Item de inventario asignado al evento ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al asignar item ❌", error: error.message });
  }
};

// EDIT
export const editEventItem = async (req, res) => {
  try {
    const { id, event, inventory, quantity } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("event", sql.Int, event)
      .input("inventory", sql.Int, inventory)
      .input("quantity", sql.Int, quantity)
      .execute("sp_edit_event_inv");

    res.json({ message: "Item de inventario actualizado en evento ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al actualizar item ❌", error: error.message });
  }
};

// SELECT
export const selectEventItem = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_select_event_inv");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al obtener item de evento ❌", error: error.message });
  }
};

// DELETE
export const deleteEventItem = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_delete_event_inv");

    res.json({ message: "Item de inventario eliminado del evento ✅" });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al eliminar item ❌", error: error.message });
  }
};

// controllers/eventItems.controller.js
export const getAllEventItems = async (req, res) => {
  try {
    const pool = getPool();

    const result = await pool.request()
      .query("SELECT * FROM vw_event_items ORDER BY event_title");

    res.json(result.recordset);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener items ❌",
      error: error.message
    });
  }
};