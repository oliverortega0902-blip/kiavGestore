import express from "express";
import { createWorkspace, editWorkspace, selectWorkspace, deleteWorkspace, getAllWorkstations } from "../controllers/CRUDworkstations.js";

const router = express.Router();

router.post("/create", createWorkspace);
router.put("/edit", editWorkspace);
router.get("/:id", selectWorkspace);
router.get("/", getAllWorkstations);
router.delete("/:id", deleteWorkspace);

export default router;