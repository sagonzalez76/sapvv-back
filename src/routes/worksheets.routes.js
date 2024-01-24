import { Router } from "express";
import {
    createWorksheet,
    getWorksheets,
    updateWorksheet,
    deleteWorksheet,
    getWorksheet,
} from "../controllers/worksheet.controller.js";

import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";


const router = Router();

// Routes
router.post("/", createWorksheet);
router.put("/:id", updateWorksheet);
router.delete("/:id", deleteWorksheet);
router.get("/", checkAuth, checkRoleAuth(['administrador', "director", 'juridico', 'enlace', 'dinamizador']), getWorksheets);
router.get("/:id", getWorksheet);

export default router;
