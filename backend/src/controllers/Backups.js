import { getPool, sql } from "../configuration/db.js";

export const createFullBackup = async (req, res) => {
  try {

    const pool = getPool();

    await pool.request()
      .execute('sp_backup_full');

    res.json({
      success: true,
      message: 'Backup full creado correctamente'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Error creando backup full',
      error: error.message
    });
  }
};

export const createLogBackup = async (req, res) => {
  try {

    const pool = getPool();

    await pool.request()
      .execute('sp_backup_transaction_log');

    res.json({
      success: true,
      message: 'Backup log creado correctamente'
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: 'Error creando backup log',
      error: error.message
    });
  }
};