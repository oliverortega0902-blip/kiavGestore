import { getPool, sql } from "../configuration/db.js";

const extractShortMessage = (input) => {
  if (!input) return 'Error desconocido';
  let s = typeof input === 'string' ? input : String(input);
  // take first non-empty line
  const firstLine = s.split(/\r?\n/).map(l => l.trim()).find(l => l && l.length > 0) || s;
  // if contains colon parts, prefer last segment (often the DB message)
  const parts = firstLine.split(':');
  let candidate = parts.length > 1 ? parts[parts.length - 1].trim() : firstLine.trim();
  // remove long parenthetical technical details
  candidate = candidate.replace(/\([^)]*\)/g, '').replace(/\s{2,}/g, ' ').trim();
  return candidate || 'Error desconocido';
};

// CREATE
export const createBill = async (req, res) => {
  try {
    const { event_id, amount, payment_method } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("event_id", sql.Int, event_id)
      .input("amount", sql.Decimal(10,2), amount)
      .input("payment_method", sql.Int, payment_method)
      .execute("sp_create_sales");

    res.json({ message: "Factura creada ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: 'vulneracion de seguridad y legalidad' });
  }
};

// EDIT
export const editBill = async (req, res) => {
  try {
    const { id, event_id, amount, payment_method } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("event_id", sql.Int, event_id)
      .input("amount", sql.Decimal(10,2), amount)
      .input("payment_method", sql.Int, payment_method)
      .execute("sp_edit_sales");

    res.json({ message: "Factura actualizada ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: 'vulneracion de seguridad y legalidad' });
  }
};

// SELECT
export const selectBill = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_select_sales");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: 'vulneracion de seguridad y legalidad' });
  }
};

// DELETE
export const deleteBill = async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_delete_sales");

    res.json({ message: "Factura eliminada ✅" });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: 'vulneracion de seguridad y legalidad' });
  }
};

export const getAllBills = async (req, res) => {
  try {
    const pool = getPool();

    const result = await pool.request()
      .query("SELECT * FROM vw_bills ORDER BY payment_date");

    res.json(result.recordset);

  } catch (error) {
    res.status(500).json({ message: 'vulneracion de seguridad y legalidad' });
  }
};