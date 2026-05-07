import express from "express";
import { addEmployeeToEvent, editEmployeeAtEvent, selectEmployeesPerEvent, deleteEmployeeAtEvent, getAllEventEmployees } from "../controllers/CRUDevent_employees.js";

const router = express.Router();

router.post("/add", addEmployeeToEvent);
router.put("/edit", editEmployeeAtEvent);
router.get("/:id", selectEmployeesPerEvent);
router.get("/", getAllEventEmployees);
router.delete("/:id", deleteEmployeeAtEvent);

export default router;