import express from "express";
import { createBill, editBill, selectBill, deleteBill, getAllBills } from "../controllers/CRUDbills.js";

const router = express.Router();

// CREATE
router.post("/create", createBill);

// EDIT
router.put("/edit", editBill);

// SELECT
router.get("/:id", selectBill);

// DELETE
router.delete("/:id", deleteBill);

//SelectALL
router.get("/", getAllBills);

export default router;