import { Router } from "express";
import {
    createComunity,
    getComunitys,
    updateComunity,
    deleteComunity,
    getComunity,
    getHolders,
    getHolder
} from "../controllers/comunity.controller.js";

import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";


const router = Router();

// Routes
router.post("/", createComunity);
router.put("/:id", updateComunity);
router.delete("/:id", deleteComunity);
router.get("/", checkAuth, checkRoleAuth(['student', "director", 'juridico', 'enlace', 'dinamizador']), getComunitys);
router.get("/holders", checkAuth, checkRoleAuth(['student', "director", 'juridico', 'enlace', 'dinamizador']), getHolders);
router.get("/:id", getComunity);
router.get("/holders/:id", getHolder);


export default router;
