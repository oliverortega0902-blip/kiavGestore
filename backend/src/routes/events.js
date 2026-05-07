import express from "express";
import { createEvent, editEvent, selectEvent, deleteEvent, selectAllEvents } from "../controllers/CRUDevents.js";

const router = express.Router();

// CREATE
router.post("/create", createEvent);

// EDIT
router.put("/edit", editEvent);

// SELECT ALL
router.get("/", selectAllEvents);

// SELECT
router.get("/:id", selectEvent);

router.get("/", getAllEventServices);

// DELETE
router.delete("/:id", deleteEvent);

export default router;