
import { Router } from "express";
import {
    getTypeComunitys,
    createTypeComunity,
    updateTypeComunity,
    getTypeComunity,
    deleteTypeComunity,
    getTypeComunityMunicipalitys

} from "../controllers/typeComunity.controller.js";
import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";


const router = Router();
// Routes
router.post("/", createTypeComunity);
router.get("/", checkAuth, checkRoleAuth(['student', "director", 'juridico', 'enlace', 'dinamizador']), getTypeComunitys);
router.put("/:id", updateTypeComunity);
router.delete("/:id", deleteTypeComunity);

router.get("/:id", getTypeComunity);


router.get("/:id/municipalitys", getTypeComunityMunicipalitys);


export default router;
