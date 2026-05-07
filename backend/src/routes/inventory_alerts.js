import express from "express";
import { createAlert, editAlert, selectAlert, deleteAlert, getAllInventoryAlerts } from "../controllers/CRUDinventory_alerts.js";

const router = express.Router();

router.post("/create", createAlert);
router.put("/edit", editAlert);
router.get("/:id", selectAlert);
router.get("/", getAllInventoryAlerts);
router.delete("/:id", deleteAlert);

export default router;