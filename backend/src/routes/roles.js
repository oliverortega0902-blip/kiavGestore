import express from "express";
import { createRole, editRole, selectRole, deleteRole, getAllRoles } from "../controllers/CRUDroles.js";

const router = express.Router();

router.post("/create", createRole);
router.put("/edit", editRole);
router.get("/:id", selectRole);
router.get("/", getAllRoles);
router.delete("/:id", deleteRole);

export default router;