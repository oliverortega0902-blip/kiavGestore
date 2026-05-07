import express from "express";
import { createEmployee, editEmployee, selectEmployee, deleteEmployee, getAllEmployees } from "../controllers/CRUDemployees.js";

const router = express.Router();

router.post("/create", createEmployee);
router.put("/edit", editEmployee);
router.get("/:id", selectEmployee);
router.get("/", getAllEmployees);
router.delete("/:id", deleteEmployee);

export default router;