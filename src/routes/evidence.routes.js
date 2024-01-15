import { Router } from "express";
import {
    getEvidences,
    createEvidence,
    updateEvidence,
    getEvidence,
    deleteEvidence,
} from "../controllers/evidence.controller.js";
import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";
import multer from 'multer';


const router = Router();

const upload = multer({ dest: 'uploads/' }); // Directorio donde se guardarán los archivos

// Routes
router.post("/", upload.array('archivos'), createEvidence);
router.get("/get", getEvidences);
router.put("/:id", updateEvidence);
router.delete("/:id", deleteEvidence);
router.get("/:id", getEvidence);

// router.get("/:id/tasks", getEvidenceTasks);

export default router;
