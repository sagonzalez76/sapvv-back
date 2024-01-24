import { Router } from "express";
import {
    createMeasure,
    getMeasures,
    updateMeasure,
    deleteMeasure,
    getMeasure
} from "../controllers/measure.controller.js";

import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";


const router = Router();

// Routes
router.post("/", createMeasure);
router.put("/:id", updateMeasure);
router.delete("/:id", deleteMeasure);
router.get("/", checkAuth, checkRoleAuth(['administrador', "director", 'juridico', 'enlace', 'dinamizador']), getMeasures);
router.get("/:id", getMeasure);

export default router;
