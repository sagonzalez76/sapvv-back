import { Router } from "express";
import {
    createAgent,
    getAgents,
    updateAgent,
    deleteAgent,
    getAgent,
} from "../controllers/agent.controller.js";

import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";


const router = Router();

// Routes
router.post("/", createAgent);
router.put("/:id", updateAgent);
router.delete("/:id", deleteAgent);
router.get("/", checkAuth, checkRoleAuth(['administrador', "director", 'juridico', 'enlace', 'dinamizador']), getAgents);
router.get("/:id", getAgent);

export default router;
