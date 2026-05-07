import { getPool, sql } from "../configuration/db.js";

// ADD EMPLOYEE TO EVENT
export const addEmployeeToEvent = async (req, res) => {
  try {
    const { event_id, employee_id } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("event_id", sql.Int, event_id)
      .input("employee_id", sql.Int, employee_id)
      .execute("sp_add_employee_to_event");

    res.json({ message: "Empleado añadido al evento ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al añadir empleado ❌", error: error.message });
  }
};

// EDIT EMPLOYEE AT EVENT
export const editEmployeeAtEvent = async (req, res) => {
  try {
    const { id, event_id, employee_id } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("event_id", sql.Int, event_id)
      .input("employee_id", sql.Int, employee_id)
      .execute("sp_edit_employee_at_event");

    res.json({ message: "Empleado actualizado en evento ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al actualizar empleado ❌", error: error.message });
  }
};

// SELECT EMPLOYEES PER EVENT
export const selectEmployeesPerEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_select_employees_per_event");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al obtener empleados del evento ❌", error: error.message });
  }
};

// DELETE EMPLOYEE AT EVENT
export const deleteEmployeeAtEvent = async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_delete_employees_at_event");

    res.json({ message: "Empleado eliminado del evento ✅" });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al eliminar empleado ❌", error: error.message });
  }
};

// controllers/eventEmployees.controller.js
export const getAllEventEmployees = async (req, res) => {
  try {
    const pool = getPool();

    const result = await pool.request()
      .query("SELECT * FROM vw_event_employees");

    res.json(result.recordset);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener empleados de eventos ❌",
      error: error.message
    });
  }
};