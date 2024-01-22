import { Router } from "express";
import {

    updateComunity,
    deleteComunity,
    createComunity,

    getEntrepreneurs,
    getEntrepreneur,

} from "../controllers/comunity.controller.js";

import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";


const router = Router();

// Routes
router.post("/", createComunity);
router.put("/:id", updateComunity);
router.delete("/:id", deleteComunity);
router.get("/", checkAuth, checkRoleAuth(['student', "director", 'juridico', 'enlace', 'dinamizador']), getEntrepreneurs);
router.get("/:id", getEntrepreneur);

export default router;
