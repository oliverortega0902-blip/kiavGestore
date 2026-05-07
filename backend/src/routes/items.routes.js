console.log("📦 items.routes REAL cargado");
import { Router } from "express";

const router = Router();

// Ruta de prueba
router.get("/", (req, res) => {
  res.json({ message: "Items funcionando ✅" });
});

export default router;