import { Router } from "express";
import {
    createMunicipality,
    getMunicipalitys,
    updateMunicipality,
    deleteMunicipality,
    getMunicipality,
} from "../controllers/municipality.controller.js";

import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";


const router = Router();

// Routes
router.post("/", createMunicipality);
router.put("/:id", updateMunicipality);
router.delete("/:id", deleteMunicipality);
router.get("/", checkAuth, checkRoleAuth(['administrador', "director", 'juridico', 'enlace', 'dinamizador']), getMunicipalitys);
router.get("/:id", getMunicipality);

export default router;
