import express from "express";
import { createEventStatus, editEventStatus, selectEventStatus, deleteEventStatus, getAllEventStatus } from "../controllers/CRUDevent_status.js";

const router = express.Router();

router.post("/create", createEventStatus);
router.put("/edit", editEventStatus);
router.get("/:id", selectEventStatus);
router.get("/", getAllEventStatus);
router.delete("/:id", deleteEventStatus);

export default router;