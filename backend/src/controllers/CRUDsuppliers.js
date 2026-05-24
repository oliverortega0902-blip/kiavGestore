import { getPool, sql } from "../configuration/db.js";

const extractShortMessage = (input) => {

  if (!input) return 'Error desconocido';

  let s =
    typeof input === 'string'
      ? input
      : String(input);

  const firstLine =
    s.split(/\r?\n/)
      .map(l => l.trim())
      .find(l => l && l.length > 0) || s;

  const parts =
    firstLine.split(':');

  let candidate =
    parts.length > 1
      ? parts[parts.length - 1].trim()
      : firstLine.trim();

  candidate =
    candidate
      .replace(/\([^)]*\)/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim();

  return candidate || 'Error desconocido';
};

// ─────────────────────────────────────────────────────────────
// CREATE
// ─────────────────────────────────────────────────────────────

export const createSupplier = async (req, res) => {

  try {

    const {
      provider,
      descript
    } = req.body;

    const pool = getPool();

    const result =
      await pool.request()

        .input(
          "provider",
          sql.VarChar(255),
          provider
        )

        .input(
          "descript",
          sql.VarChar(500),
          descript
        )

        .execute(
          "sp_suppliers_create"
        );

    res.json({
      message:
        "Proveedor creado ✅",
      result:
        result.recordset
    });

  } catch (error) {

    console.error(
      "Error:",
      error.message || error
    );

    res.status(500).json({
      message:
        extractShortMessage(
          error.message || error
        )
    });
  }
};

// ─────────────────────────────────────────────────────────────
// EDIT
// ─────────────────────────────────────────────────────────────

export const editSupplier = async (req, res) => {

  try {

    const {
      id,
      provider,
      descript
    } = req.body;

    const pool = getPool();

    const result =
      await pool.request()

        .input(
          "id",
          sql.Int,
          id
        )

        .input(
          "provider",
          sql.VarChar(255),
          provider
        )

        .input(
          "descript",
          sql.VarChar(500),
          descript
        )

        .execute(
          "sp_suppliers_update"
        );

    res.json({
      message:
        "Proveedor actualizado ✅",
      result:
        result.recordset
    });

  } catch (error) {

    console.error(
      "Error:",
      error.message || error
    );

    res.status(500).json({
      message:
        extractShortMessage(
          error.message || error
        )
    });
  }
};

// ─────────────────────────────────────────────────────────────
// SELECT
// ─────────────────────────────────────────────────────────────

export const selectSupplier = async (req, res) => {

  try {

    const { id } = req.params;

    const pool = getPool();

    const result =
      await pool.request()

        .input(
          "id",
          sql.Int,
          id
        )

        .execute(
          "sp_suppliers_get_by_id"
        );

    res.json(
      result.recordset
    );

  } catch (error) {

    console.error(
      "Error:",
      error.message || error
    );

    res.status(500).json({
      message:
        extractShortMessage(
          error.message || error
        )
    });
  }
};

// ─────────────────────────────────────────────────────────────
// DELETE
// ─────────────────────────────────────────────────────────────

export const deleteSupplier = async (req, res) => {

  try {

    const { id } = req.params;

    const pool = getPool();

    await pool.request()

      .input(
        "id",
        sql.Int,
        id
      )

      .execute(
        "sp_suppliers_delete"
      );

    res.json({
      message:
        "Proveedor eliminado ✅"
    });

  } catch (error) {

    console.error(
      "Error:",
      error.message || error
    );

    res.status(500).json({
      message:
        extractShortMessage(
          error.message || error
        )
    });
  }
};

// ─────────────────────────────────────────────────────────────
// GET ALL
// ─────────────────────────────────────────────────────────────

export const getAllSuppliers = async (req, res) => {

  try {

    const pool = getPool();

    const result =
      await pool.request()
        .query(`
          SELECT *
          FROM vw_suppliers
          ORDER BY provider ASC
        `);

    res.json(
      result.recordset
    );

  } catch (error) {

    console.error(
      "Error:",
      error.message || error
    );

    res.status(500).json({
      message:
        extractShortMessage(
          error.message || error
        )
    });
  }
};