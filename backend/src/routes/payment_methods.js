import express from "express";
import { createPaymentMethod, editPaymentMethod, selectPaymentMethod, deletePaymentMethod, getAllPaymentMethods } from "../controllers/CRUDpayment_methods.js";

const router = express.Router();

router.post("/create", createPaymentMethod);
router.put("/edit", editPaymentMethod);
router.get("/:id", selectPaymentMethod);
router.get("/", getAllPaymentMethods);
router.delete("/:id", deletePaymentMethod);

export default router;