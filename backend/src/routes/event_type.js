import express from "express";
import { createEventType, editEventType, selectEventType, deleteEventType, getAllEventTypes } from "../controllers/CRUDevent_type.js";

const router = express.Router();

router.post("/create", createEventType);
router.put("/edit", editEventType);
router.get("/:id", selectEventType);
router.get("/", getAllEventTypes);
router.delete("/:id", deleteEventType);

export default router;