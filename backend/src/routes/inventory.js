import express from "express";
import { createInventory, editInventory, selectInventory, deleteInventory, getAllInventory } from "../controllers/CRUDinventory.js";

const router = express.Router();

router.post("/create", createInventory);
router.put("/edit", editInventory);
router.get("/:id", selectInventory);
router.get("/", getAllInventory);
router.delete("/:id", deleteInventory);

export default router;