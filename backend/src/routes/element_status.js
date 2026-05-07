import express from "express";
import { createElementStatus, editElementStatus, selectElementStatus, deleteElementStatus, getAllElementStatus } from "../controllers/CRUDelement_status.js";

const router = express.Router();

// CREATE
router.post("/create", createElementStatus);

// EDIT
router.put("/edit", editElementStatus);

// SELECT
router.get("/:id", selectElementStatus);

router.get("/", getAllElementStatus);

// DELETE
router.delete("/:id", deleteElementStatus);

export default router;