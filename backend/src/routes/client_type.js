import express from "express";
import { createType, editType, selectType, deleteType, getAllClientTypes } from "../controllers/CRUDclient_type.js";

const router = express.Router();

// CREATE
router.post("/create", createType);

// EDIT
router.put("/edit", editType);

// SELECT
router.get("/:id", selectType);

router.get("/", getAllClientTypes);

// DELETE
router.delete("/:id", deleteType);

export default router;