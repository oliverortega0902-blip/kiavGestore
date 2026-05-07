import { getPool, sql } from "../configuration/db.js";

// CREATE
export const createClient = async (req, res) => {
  try {
    const { fullname, national_id, email, phone, kind } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("fullname", sql.VarChar, fullname)
      .input("national_id", sql.VarChar, national_id)
      .input("email", sql.VarChar, email)
      .input("phone", sql.VarChar, phone)
      .input("kind", sql.Int, kind)
      .execute("sp_create_clients");

    res.json({ message: "Cliente creado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al crear cliente ❌", error: error.message });
  }
};

// EDIT
export const editClient = async (req, res) => {
  try {
    const { id, fullname, national_id, email, phone, kind } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("fullname", sql.VarChar, fullname)
      .input("national_id", sql.VarChar, national_id)
      .input("email", sql.VarChar, email)
      .input("phone", sql.VarChar, phone)
      .input("kind", sql.Int, kind)
      .execute("sp_edit_clients");

    res.json({ message: "Cliente actualizado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al editar cliente ❌", error: error.message });
  }
};

// SELECT
export const selectClient = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_select_clients");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al obtener cliente ❌", error: error.message });
  }
};

// DELETE
export const deleteClient = async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_delete_clients");

    res.json({ message: "Cliente eliminado ✅" });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al eliminar cliente ❌", error: error.message });
  }
};

export const getAllClients = async (req, res) => {
  try {
    const pool = getPool();

    const result = await pool.request()
      .query("SELECT * FROM vw_clients ORDER BY fullname");

    res.json(result.recordset);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener clientes ❌",
      error: error.message
    });
  }
};
