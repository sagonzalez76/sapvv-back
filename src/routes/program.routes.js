import { Router } from "express";
import {
    getPrograms,
    createProgram,
    updateProgram,
    getProgram,
    deleteProgram,
} from "../controllers/program.controller.js";
import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";



const router = Router();

// Routes
router.post("/", createProgram);
router.get("/", checkAuth, checkRoleAuth(['administrador', "director", 'juridico', 'enlace', 'dinamizador']), getPrograms);
router.put("/:id", updateProgram);
router.delete("/:id", deleteProgram);
router.get("/:id", getProgram);

// router.get("/:id/tasks", getProgramTasks);

export default router;
