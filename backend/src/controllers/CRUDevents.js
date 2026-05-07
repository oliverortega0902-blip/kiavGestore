import { getPool, sql } from "../configuration/db.js";

// CREATE
export const createEvent = async (req, res) => {
  try {
    const { title, client_id, event_date, location, base_price, status } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("title", sql.VarChar, title)
      .input("client_id", sql.Int, client_id)
      .input("event_date", sql.Date, event_date)
      .input("location", sql.VarChar, location)
      .input("base_price", sql.Decimal(10,2), base_price)
      .input("status", sql.VarChar, status)
      .execute("sp_create_events");

    res.json({ message: "Evento creado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al crear evento ❌", error: error.message });
  }
};

// EDIT
export const editEvent = async (req, res) => {
  try {
    const { id, title, client_id, event_date, location, base_price, status } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("title", sql.VarChar, title)
      .input("client_id", sql.Int, client_id)
      .input("event_date", sql.Date, event_date)
      .input("location", sql.VarChar, location)
      .input("base_price", sql.Decimal(10,2), base_price)
      .input("status", sql.VarChar, status)
      .execute("sp_edit_events");

    res.json({ message: "Evento actualizado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al editar evento ❌", error: error.message });
  }
};

// SELECT
export const selectEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_select_events");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al obtener evento ❌", error: error.message });
  }
};

// SELECT ALL
export const selectAllEvents = async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool.request()
      .execute("sp_select_all_events");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al obtener eventos ❌", error: error.message });
  }
};

// DELETE
export const deleteEvent = async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_delete_events");

    res.json({ message: "Evento eliminado ✅" });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al eliminar evento ❌", error: error.message });
  }
};

// controllers/eventServices.controller.js
export const getAllEventServices = async (req, res) => {
  try {
    const pool = getPool();

    const result = await pool.request()
      .query("SELECT * FROM vw_events_services ORDER BY event_date");

    res.json(result.recordset);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener servicios de eventos ❌",
      error: error.message
    });
  }
};