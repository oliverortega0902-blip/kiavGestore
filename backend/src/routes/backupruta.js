import express from "express";
import {
  createFullBackup,
  createLogBackup
} from "../controllers/Backups.js";

const router = express.Router();

// FULL BACKUP
router.post("/full", createFullBackup);

// TRANSACTION LOG BACKUP
router.post("/log", createLogBackup);

export default router;