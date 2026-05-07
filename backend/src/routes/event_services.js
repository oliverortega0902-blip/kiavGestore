import express from "express";
import { createService, editService, selectService, deleteService, getAllEventServices} from "../controllers/CRUDevent_services.js";

const router = express.Router();

router.post("/create", createService);
router.put("/edit", editService);
router.get("/:id", selectService);
router.delete("/:id", deleteService);
router.get("/", getAllEventServices);

export default router;