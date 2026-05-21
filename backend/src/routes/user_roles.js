import express from "express";
import { asignRole, changeRole, selectRoleAsign, deleteRoleAsign,getAllUserRoles, getRoleByUserId } from "../controllers/CRUDuser_roles.js";

const router = express.Router();

router.post("/asign", asignRole);
router.put("/change", changeRole);
router.get("/:id", selectRoleAsign);
router.get("/", getAllUserRoles);
router.delete("/:id", deleteRoleAsign);
router.get("/user/:userId", getRoleByUserId);

export default router;