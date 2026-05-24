import express from "express";

import {
  createSupplier,
  editSupplier,
  selectSupplier,
  deleteSupplier,
  getAllSuppliers
} from "../controllers/CRUDsuppliers.js";

const router = express.Router();

// CREATE
router.post(
  "/create",
  createSupplier
);

// EDIT
router.put(
  "/edit",
  editSupplier
);

// SELECT
router.get(
  "/:id",
  selectSupplier
);

// DELETE
router.delete(
  "/:id",
  deleteSupplier
);

// GET ALL
router.get(
  "/",
  getAllSuppliers
);

export default router;