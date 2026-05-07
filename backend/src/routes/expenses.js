import express from "express";
import { createExpense, editExpense, selectExpense, deleteExpense, getAllExpenses } from "../controllers/CRUDexpenses.js";

const router = express.Router();

router.post("/create", createExpense);
router.put("/edit", editExpense);
router.get("/:id", selectExpense);
router.get("/", getAllExpenses);
router.delete("/:id", deleteExpense);

export default router;