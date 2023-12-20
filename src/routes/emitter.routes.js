
import { Router } from "express";
import {
    getEmitters,
    createEmitter,
    updateEmitter,
    getEmitter,
    deleteEmitter,
    

} from "../controllers/emitter.controller.js";
import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";


const router = Router();
// Routes
router.post("/", createEmitter);
router.get("/", checkAuth, checkRoleAuth(['student', "director", 'juridico', 'enlace', 'dinamizador']), getEmitters);
router.put("/:id", updateEmitter);
router.delete("/:id", deleteEmitter);
router.get("/:id", getEmitter);



export default router;
