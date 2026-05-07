import express from "express";
import { asignRole, changeRole, selectRoleAsign, deleteRoleAsign,getAllUserRoles } from "../controllers/CRUDuser_roles.js";

const router = express.Router();

router.post("/asign", asignRole);
router.put("/change", changeRole);
router.get("/:id", selectRoleAsign);
router.get("/", getAllUserRoles);
router.delete("/:id", deleteRoleAsign);

export default router;