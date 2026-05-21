import { getPool, sql } from "../configuration/db.js";

// ASIGNAR ROL
export const asignRole = async (req, res) => {
  try {
    const { users_id, role_id } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("users_id", sql.Int, users_id)
      .input("role_id", sql.Int, role_id)
      .execute("sp_asign_role");

    res.json({ message: "Rol asignado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al asignar rol ❌", error: error.message });
  }
};

// CAMBIAR ROL
export const changeRole = async (req, res) => {
  try {
    const { id, users_id, role_id } = req.body;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("users_id", sql.Int, users_id)
      .input("role_id", sql.Int, role_id)
      .execute("sp_change_role");

    res.json({ message: "Rol actualizado ✅", result: result.recordset });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al cambiar rol ❌", error: error.message });
  }
};

// SELECT
export const selectRoleAsign = async (req, res) => {
  try {
    const { id } = req.params;
    const pool = getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_select_roles_asign");

    res.json(result.recordset);
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al obtener asignación ❌", error: error.message });
  }
};

// DELETE
export const deleteRoleAsign = async (req, res) => {
  try {
    const pool = getPool();
    const { id } = req.params;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .execute("sp_delete_roles_asign");

    res.json({ message: "Asignación eliminada ✅" });
  } catch (error) {
    console.error("Error:", error.message || error);
    res.status(500).json({ message: "Error al eliminar asignación ❌", error: error.message });
  }
};

// controllers/userRoles.controller.js
export const getAllUserRoles = async (req, res) => {
  try {
    const pool = getPool();

    const result = await pool.request()
      .query("SELECT * FROM vw_user_roles");

    res.json(result.recordset);

  } catch (error) {
    res.status(500).json({
      message: "Error al obtener roles de usuario ❌",
      error: error.message
    });
  }
};

export const getRoleByUserId = async (req, res) => {

  try {

    const { userId } = req.params;

    const pool = getPool();

    const result = await pool.request()
      .input("userId", sql.Int, userId)
      .query(`
        SELECT
          ur.*,
          u.username AS username,
          r.name AS role_name,
          r.name AS name
        FROM user_roles ur
        INNER JOIN roles r
          ON ur.role_id = r.id
        INNER JOIN users u
          ON ur.users_id = u.id
        WHERE ur.users_id = @userId
      `);

    res.json(result.recordset);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Error obteniendo rol del usuario ❌",
      error: error.message
    });

  }

};