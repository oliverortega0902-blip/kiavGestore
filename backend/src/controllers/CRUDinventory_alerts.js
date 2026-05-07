import { getPool, sql } from "../configuration/db.js";

// CREATE
export const createAlert = async (req, res) => {
  try {
    const { inventory_id, alert_message } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("inventory_id", sql.Int, inventory_id)
      .input("alert_message", sql.VarChar, alert_message)
      .execute("sp_create_alert");

    res.json({ message: "Alerta creada ✅", result: result.recordset });
  } catch (error) {
    console.error("Error en createAlert:", error.message || error);
    res.status(500).json({ message: "Error al crear alerta ❌", error: error.message });
  }
};

// EDIT
export const editAlert = async (req, res) => {
  try {
    const { id, inventory_id, alert_message, is_resolved } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("inventory_id", sql.Int, inventory_id)
      .input("alert_message", sql.VarChar, alert_message)
      .input("is_resolved", sql.Bit, is_resolved)
      .execute("sp_edit_alert");

    res.json({ message: "Alerta actualizada ✅", result: result.recordset });
  } catch (error) {
    console.error("Error en editAlert:", error.message || error);
    res.status(500).json({ message: "Error al editar alerta ❌", error: error.message });
  }
};

// SELECT
export const selectAlert = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_select_alert");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error en selectAlert:", error.message || error);
    res.status(500).json({ message: "Error al obtener alerta ❌", error: error.message });
  }
};

// DELETE
export const deleteAlert = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_delete_alert");

    res.json({ message: "Alerta eliminada ✅" });
  } catch (error) {
    console.error("Error en deleteAlert:", error.message || error);
    res.status(500).json({ message: "Error al eliminar alerta ❌", error: error.message });
  }
};

// controllers/inventoryAlerts.controller.js
export const getAllInventoryAlerts = async (req, res) => {
  try {
    const pool = getPool();

    const result = await pool.request()
      .query("SELECT * FROM vw_inventory_alerts ORDER BY alert_date");

    res.json(result.recordset);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener alertas ❌",
      error: error.message
    });
  }
};
