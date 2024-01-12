import { Router } from "express";
import {
    createOrigin,
    getOrigins,
    updateOrigin,
    deleteOrigin,
    getOrigin,
} from "../controllers/origin.controller.js";

import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";


const router = Router();

// Routes
router.post("/", createOrigin);
router.put("/:id", updateOrigin);
router.delete("/:id", deleteOrigin);
router.get("/", checkAuth, checkRoleAuth(['student', "director", 'juridico', 'enlace', 'dinamizador']), getOrigins);
router.get("/:id", getOrigin);

export default router;
