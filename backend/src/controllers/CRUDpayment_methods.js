import { getPool, sql } from "../configuration/db.js";

// CREATE
export const createPaymentMethod = async (req, res) => {
  try {
    const { payment_type, descript } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("payment_type", sql.VarChar, payment_type)
      .input("descript", sql.VarChar, descript)
      .execute("sp_create_payment_method");

    res.json({ message: "Método de pago creado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al crear método de pago ❌", error: error.message });
  }
};

// EDIT
export const editPaymentMethod = async (req, res) => {
  try {
    const { id, payment_type, descript } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("payment_type", sql.VarChar, payment_type)
      .input("descript", sql.VarChar, descript)
      .execute("sp_edit_payment_method");

    res.json({ message: "Método de pago actualizado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al editar método de pago ❌", error: error.message });
  }
};

// SELECT
export const selectPaymentMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_select_payment_method");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al obtener método de pago ❌", error: error.message });
  }
};

// DELETE
export const deletePaymentMethod = async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_delete_payment_method");

    res.json({ message: "Método de pago eliminado ✅" });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al eliminar método de pago ❌", error: error.message });
  }
};

// controllers/paymentMethods.controller.js
export const getAllPaymentMethods = async (req, res) => {
  try {
    const pool = getPool();

    const result = await pool.request()
      .query("SELECT * FROM vw_payment_methods ORDER BY name");

    res.json(result.recordset);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener métodos de pago ❌",
      error: error.message
    });
  }
};
