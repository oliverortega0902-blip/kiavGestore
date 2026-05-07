import { getPool, sql } from "../configuration/db.js";

// CREATE
export const createInventory = async (req, res) => {
  try {
    const { element, unit_price, actual_price, stock_actual, stock_alert, state, element_type } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("element", sql.VarChar, element)
      .input("unit_price", sql.Decimal(10,2), unit_price)
      .input("actual_price", sql.Decimal(10,2), actual_price)
      .input("stock_actual", sql.Int, stock_actual)
      .input("stock_alert", sql.Int, stock_alert)
      .input("state", sql.Int, state)
      .input("element_type", sql.Bit, element_type)
      .execute("sp_create_inv");

    res.json({ message: "Inventario creado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al crear inventario ❌", error: error.message });
  }
};

// EDIT
export const editInventory = async (req, res) => {
  try {
    const { id, element, unit_price, actual_price, stock_actual, stock_alert, state, element_type } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("element", sql.VarChar, element)
      .input("unit_price", sql.Decimal(10,2), unit_price)
      .input("actual_price", sql.Decimal(10,2), actual_price)
      .input("stock_actual", sql.Int, stock_actual)
      .input("stock_alert", sql.Int, stock_alert)
      .input("state", sql.Int, state)
      .input("element_type", sql.Bit, element_type)
      .execute("sp_edit_inv");

    res.json({ message: "Inventario actualizado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al editar inventario ❌", error: error.message });
  }
};

// SELECT
export const selectInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_select_inv");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al obtener inventario ❌", error: error.message });
  }
};

// DELETE
export const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_delete_inv");

    res.json({ message: "Inventario eliminado ✅" });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al eliminar inventario ❌", error: error.message });
  }
};

// controllers/inventory.controller.js
export const getAllInventory = async (req, res) => {
  try {
    const pool = getPool();

    const result = await pool.request()
      .query("SELECT * FROM vw_inventory ORDER BY element");

    res.json(result.recordset);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener inventario ❌",
      error: error.message
    });
  }
};