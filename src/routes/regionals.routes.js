import { Router } from "express";
import {
    createRegional,
    getRegionals,
    updateRegional,
    deleteRegional,
    getRegional,
} from "../controllers/regional.controller.js";

import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";


const router = Router();

// Routes
router.post("/", createRegional);
router.put("/:id", updateRegional);
router.delete("/:id", deleteRegional);
router.get("/", checkAuth, checkRoleAuth(['administrador', "director", 'juridico', 'enlace', 'dinamizador']), getRegionals);
router.get("/:id", getRegional);

export default router;
