import express from "express";
import cors from "cors";

// Importar routers
import itemsRoutes from "./routes/items.routes.js";
import billsRoutes from "./routes/bills.js";
import clientTypesRoutes from "./routes/client_type.js";
import clientsRoutes from "./routes/clients.js";
import departmentsRoutes from "./routes/departments.js";
import elementStatusRoutes from "./routes/element_status.js";
import employeesRoutes from "./routes/employees.js";
import eventEmployeesRoutes from "./routes/event_employees.js";
import eventItemsRoutes from "./routes/event_items.js";
import eventServicesRoutes from "./routes/event_services.js";
import eventStatusRoutes from "./routes/event_status.js";
import eventTypesRoutes from "./routes/event_type.js";
import expensesRoutes from "./routes/expenses.js";
import inventoryAlertsRoutes from "./routes/inventory_alerts.js";
import inventoryRoutes from "./routes/inventory.js";
import paymentMethodsRoutes from "./routes/payment_methods.js";
import rolesRoutes from "./routes/roles.js";
import userRolesRoutes from "./routes/user_roles.js";
import usersRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";
import workstationsRoutes from "./routes/workstations.js";
import backupRoutes from "./routes/backupruta.js";

const app = express();

// Middlewares globales
const corsOptions = {
  origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',').map((origin) => origin.trim()) : true,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Ruta base (para probar que el server funciona)
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Rutas principales
app.use("/api/items", itemsRoutes);
app.use("/api/bills", billsRoutes);
app.use("/api/clientTypes", clientTypesRoutes);
app.use("/api/clients", clientsRoutes);
app.use("/api/departments", departmentsRoutes);
app.use("/api/elementStatus", elementStatusRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/eventEmployees", eventEmployeesRoutes);
app.use("/api/eventItems", eventItemsRoutes);
app.use("/api/eventServices", eventServicesRoutes);
app.use("/api/eventStatus", eventStatusRoutes);
app.use("/api/eventTypes", eventTypesRoutes);
app.use("/api/expenses", expensesRoutes);
app.use("/api/inventoryAlerts", inventoryAlertsRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/paymentMethods", paymentMethodsRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/userRoles", userRolesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/workstations", workstationsRoutes);
console.log("IMPORT BACKUP:", backupRoutes);
app.use("/api/backup", backupRoutes);
// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({
    message: "Ruta no encontrada ❌"
  });
});

// Manejo global de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Error interno del servidor ⚠️"
  });
});

export default app;