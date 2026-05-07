import express from "express";
import { createUser, editUser, selectUser, deleteUser, getAllUsers } from "../controllers/CRUDusers.js";

const router = express.Router();

router.post("/create", createUser);
router.put("/edit", editUser);
router.get("/:id", selectUser);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

export default router;