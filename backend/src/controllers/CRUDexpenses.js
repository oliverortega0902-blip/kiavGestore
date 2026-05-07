import { getPool, sql } from "../configuration/db.js";

// CREATE
export const createExpense = async (req, res) => {
  try {
    const { event_id, descript, amount, expenses_status } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("event_id", sql.Int, event_id)
      .input("descript", sql.VarChar, descript)
      .input("amount", sql.Decimal(10,2), amount)
      .input("expenses_status", sql.Bit, expenses_status)
      .execute("sp_create_spent");

    res.json({ message: "Egreso creado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al crear egreso ❌", error: error.message });
  }
};

// EDIT
export const editExpense = async (req, res) => {
  try {
    const { id, event_id, descript, amount, expenses_status } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("event_id", sql.Int, event_id)
      .input("descript", sql.VarChar, descript)
      .input("amount", sql.Decimal(10,2), amount)
      .input("expenses_status", sql.Bit, expenses_status)
      .execute("sp_edit_spent");

    res.json({ message: "Egreso actualizado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al editar egreso ❌", error: error.message });
  }
};

// SELECT
export const selectExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_select_spent");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al obtener egreso ❌", error: error.message });
  }
};

// DELETE
export const deleteExpense = async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_delete_spent");

    res.json({ message: "Egreso eliminado ✅" });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al eliminar egreso ❌", error: error.message });
  }
};

// controllers/expenses.controller.js
export const getAllExpenses = async (req, res) => {
  try {
    const pool = getPool();

    const result = await pool.request()
      .query("SELECT * FROM vw_expenses ORDER BY title");

    res.json(result.recordset);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener gastos ❌",
      error: error.message
    });
  }
};