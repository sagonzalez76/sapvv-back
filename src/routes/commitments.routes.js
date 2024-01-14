import { Router } from "express";
import {
    createCommitment,
    getCommitments,
    updateCommitment,
    deleteCommitment,
    getCommitment,
} from "../controllers/commitment.controller.js";

import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";


const router = Router();

// Routes
router.post("/", createCommitment);
router.put("/:id", updateCommitment);
router.delete("/:id", deleteCommitment);
router.get("/", checkAuth, checkRoleAuth(['student', "director", 'juridico', 'enlace', 'dinamizador']), getCommitments);
router.get("/:id", getCommitment);

export default router;
