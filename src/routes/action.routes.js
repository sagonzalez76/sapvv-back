import { Router } from "express";
import {
    getActions,
    createAction,
    updateAction,
    getAction,
    deleteAction,
    getActionEvidences,
} from "../controllers/action.controller.js";
import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";



const router = Router();

// Routes
router.post("/", createAction);
router.get("/", checkAuth, checkRoleAuth(['student', "director", 'juridico', 'enlace', 'dinamizador']), getActions);
router.put("/:id", updateAction);
router.delete("/:id", deleteAction);
router.get("/:id", getAction);

router.get("/:id/evidences", getActionEvidences);

export default router;
