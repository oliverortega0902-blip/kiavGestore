import { getPool, sql } from "../configuration/db.js";

// CREATE
export const createService = async (req, res) => {
  try {
    const { title, descript, client, event_type, event_date, e_location, e_status, duration_hours, contract_asingned, base_price } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("title", sql.VarChar, title)
      .input("descript", sql.VarChar, descript)
      .input("client", sql.Int, client)
      .input("event_type", sql.Int, event_type)
      .input("event_date", sql.DateTime, event_date)
      .input("e_location", sql.VarChar, e_location)
      .input("e_status", sql.Int, e_status)
      .input("duration_hours", sql.Int, duration_hours)
      .input("contract_asingned", sql.Bit, contract_asingned)
      .input("base_price", sql.Decimal(10,2), base_price)
      .execute("sp_create_services");

    res.json({ message: "Evento/Servicio creado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al crear evento/servicio ❌", error: error.message });
  }
};

// EDIT
export const editService = async (req, res) => {
  try {
    const { id, title, descript, client, event_type, event_date, e_location, e_status, duration_hours, contract_asingned, base_price } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("title", sql.VarChar, title)
      .input("descript", sql.VarChar, descript)
      .input("client", sql.Int, client)
      .input("event_type", sql.Int, event_type)
      .input("event_date", sql.DateTime, event_date)
      .input("e_location", sql.VarChar, e_location)
      .input("e_status", sql.Int, e_status)
      .input("duration_hours", sql.Int, duration_hours)
      .input("contract_asingned", sql.Bit, contract_asingned)
      .input("base_price", sql.Decimal(10,2), base_price)
      .execute("sp_edit_services");

    res.json({ message: "Evento/Servicio actualizado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al editar evento/servicio ❌", error: error.message });
  }
};

// SELECT
export const selectService = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_select_services");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al obtener evento/servicio ❌", error: error.message });
  }
};

// DELETE
export const deleteService = async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_delete_services");

    res.json({ message: "Evento/Servicio eliminado ✅" });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al eliminar evento/servicio ❌", error: error.message });
  }
};

// GET ALL
export const getAllEventServices = async (req, res) => {
  try {
    const pool = getPool();

    const result = await pool.request()
      .query("SELECT * FROM vw_events_services");

    res.json(result.recordset);

  } catch (error) {
    console.error("Error:", error.message || error);

    res.status(500).json({
      message: "Error al obtener servicios de eventos ❌",
      error: error.message
    });
  }
};

