import express from "express";
import { login, registerUser, changePassword } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", registerUser);
router.post("/change-password", changePassword);

export default router;
