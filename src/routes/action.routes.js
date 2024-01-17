import { Router } from "express";
import {
    getActions,
    createAction,
    updateAction,
    getAction,
    deleteAction,
    // getActionEvidences,
    getImageEvidences,
    getVideoEvidences,
    getAudioEvidences,
    getDocumentEvidences
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

// router.get("/:id/evidences", getActionEvidences);
router.get("/:id/evidences/images", getImageEvidences);
router.get("/:id/evidences/videos", getVideoEvidences);
router.get("/:id/evidences/audios", getAudioEvidences);
router.get("/:id/evidences/documentos", getDocumentEvidences);





export default router;
