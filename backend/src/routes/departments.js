import express from "express";
import { createDepartment, editDepartment, selectDepartment, deleteDepartment, getAllDepartments } from "../controllers/CRUDdepartments.js";

const router = express.Router();

// CREATE
router.post("/create", createDepartment);

// EDIT
router.put("/edit", editDepartment);

// SELECT
router.get("/:id", selectDepartment);

router.get("/", getAllDepartments);

// DELETE
router.delete("/:id", deleteDepartment);

export default router;