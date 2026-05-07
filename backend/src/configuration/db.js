import sql from "mssql/msnodesqlv8.js";
import dotenv from "dotenv";

dotenv.config();

const config = {
  connectionString: `Driver={ODBC Driver 18 for SQL Server};
  Server=${process.env.DB_SERVER};
  Database=${process.env.DB_DATABASE};
  Trusted_Connection=Yes;
  TrustServerCertificate=Yes;
  Encrypt=no;`
};

let pool = null;

export const connectDB = async () => {
  try {
    pool = new sql.ConnectionPool(config);
    
    pool.on("error", (err) => {
      console.error("❌ Error en el pool de conexión:", err);
      pool = null;
    });

    await pool.connect();
    console.log("✅ Conectado con Windows Authentication");

    // prueba real
    const result = await pool.request().query("SELECT 1 AS test");
    console.log("✅ Prueba de conexión exitosa:", result.recordset);

  } catch (error) {
    console.error("❌ Error de conexión:", error.message || error);
    throw error;
  }
};

export const getPool = () => {
  if (!pool) {
    throw new Error("La conexión a la base de datos no está inicializada. Ejecuta connectDB() primero.");
  }
  return pool;
};

export { sql };