import { getPool, sql } from "../configuration/db.js";

// CREATE
export const createEmployee = async (req, res) => {
  try {
    const { national_id, fullname, email, phone, workstation, assigned_user } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("national_id", sql.VarChar, national_id)
      .input("fullname", sql.VarChar, fullname)
      .input("email", sql.VarChar, email)
      .input("phone", sql.VarChar, phone)
      .input("workstation", sql.Int, workstation)
      .input("assigned_user", sql.Int, assigned_user)
      .execute("sp_create_employees");

    res.json({ message: "Empleado creado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al crear empleado ❌", error: error.message });
  }
};

// EDIT
export const editEmployee = async (req, res) => {
  try {
    const { id, national_id, fullname, email, phone, workstation, assigned_user } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("national_id", sql.VarChar, national_id)
      .input("fullname", sql.VarChar, fullname)
      .input("email", sql.VarChar, email)
      .input("phone", sql.VarChar, phone)
      .input("workstation", sql.Int, workstation)
      .input("assigned_user", sql.Int, assigned_user)
      .execute("sp_edit_employees");

    res.json({ message: "Empleado actualizado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al editar empleado ❌", error: error.message });
  }
};

// SELECT
export const selectEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_select_employees");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al obtener empleado ❌", error: error.message });
  }
};

// DELETE
export const deleteEmployee = async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_delete_employees");

    res.json({ message: "Empleado eliminado ✅" });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al eliminar empleado ❌", error: error.message });
  }
};

// controllers/employees.controller.js
export const getAllEmployees = async (req, res) => {
  try {
    const pool = getPool();

    const result = await pool.request()
      .query("SELECT * FROM vw_employees ORDER BY employment_date");

    res.json(result.recordset);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener empleados ❌",
      error: error.message
    });
  }
};