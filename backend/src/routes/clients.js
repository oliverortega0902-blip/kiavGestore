import express from "express";
import { createClient, editClient, selectClient, deleteClient, getAllClients } from "../controllers/CRUDclients.js";

const router = express.Router();

// CREATE
router.post("/create", createClient);

// EDIT
router.put("/edit", editClient);

// SELECT
router.get("/:id", selectClient);

router.get("/", getAllClients);

// DELETE
router.delete("/:id", deleteClient);

export default router;