import { getPool, sql } from "../configuration/db.js";

// CREATE
export const createService = async (req, res) => {
  try {
    const {
      title,
      descript,
      client,
      customer_id,
      event_type,
      event_date,
      e_location,
      e_status,
      duration_hours,
      contract_asingned,
      base_price
    } = req.body;

    const pool = getPool();
    const createdClient = client ?? customer_id ?? null;
    const createdEventType = event_type ?? null;
    const createdStatus = e_status ?? null;
    const createdContractAssigned = contract_asingned ?? false;

    const result = await pool.request()
      .input("title", sql.VarChar, title)
      .input("descript", sql.VarChar, descript)
      .input("client", sql.Int, createdClient)
      .input("event_type", sql.Int, createdEventType)
      .input("event_date", sql.DateTime, event_date)
      .input("e_location", sql.VarChar, e_location)
      .input("e_status", sql.Int, createdStatus)
      .input("duration_hours", sql.Int, duration_hours)
      .input("contract_asingned", sql.Bit, createdContractAssigned)
      .input("base_price", sql.Decimal(10,2), base_price)
      .execute("sp_create_services");

    const created = result.recordset?.[0] ?? null;
    res.json({ message: "Evento/Servicio creado ✅", created, result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al crear evento/servicio ❌", error: error.message });
  }
};

// EDIT
export const editService = async (req, res) => {
  try {
    const { title, descript, client, customer_id, event_type, event_date, e_location, e_status, duration_hours, contract_asingned, base_price } = req.body;
    const { id } = req.params;

    const pool = getPool();
    const editedClient = client ?? customer_id ?? null;
    const editedEventType = event_type ?? null;
    const editedStatus = e_status ?? null;
    const editedContractAssigned = contract_asingned ?? false;

    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("title", sql.VarChar, title)
      .input("descript", sql.VarChar, descript)
      .input("client", sql.Int, editedClient)
      .input("event_type", sql.Int, editedEventType)
      .input("event_date", sql.DateTime, event_date)
      .input("e_location", sql.VarChar, e_location)
      .input("e_status", sql.Int, editedStatus)
      .input("duration_hours", sql.Int, duration_hours)
      .input("contract_asingned", sql.Bit, editedContractAssigned)
      .input("base_price", sql.Decimal(10,2), base_price)
      .execute("sp_edit_services");

    const updated = result.recordset?.[0] ?? null;
    res.json({ message: "Evento/Servicio actualizado ✅", updated, result: result.recordset });
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
      .query("SELECT * FROM vw_events_services ORDER BY event_date ASC");

    res.json(result.recordset);

  } catch (error) {
    console.error("Error:", error.message || error);

    res.status(500).json({
      message: "Error al obtener servicios de eventos ❌",
      error: error.message
    });
  }
};

// GET EVENTS BY EMPLOYEE USER
export const getEmployeeEvents = async (req, res) => {
  try {

    const { userId } = req.params;

    const pool = getPool();

    const result = await pool.request()
      .input("UserId", sql.Int, userId)
      .execute("sp_GetEmployeeEvents");

    res.json(result.recordset);

  } catch (error) {

    console.error("Error:", error.message || error);

    res.status(500).json({
      message: "Error al obtener eventos del empleado ❌",
      error: error.message
    });
  }
};