import express from "express";
import { createEventItem, editEventItem, selectEventItem, deleteEventItem, getAllEventItems } from "../controllers/CRUDevent_items.js";

const router = express.Router();

router.post("/create", createEventItem);
router.put("/edit", editEventItem);
router.get("/:id", selectEventItem);
router.get("/", getAllEventItems);
router.delete("/:id", deleteEventItem);

export default router;