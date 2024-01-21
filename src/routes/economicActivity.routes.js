
import { Router } from "express";
import {
    getEconomicActivitys,
    createEconomicActivity,
    updateEconomicActivity,
    getEconomicActivity,
    deleteEconomicActivity,
    getEconomicActivityMunicipalitys

} from "../controllers/economicActivity.controller.js";
import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";


const router = Router();
// Routes
router.post("/", createEconomicActivity);
router.get("/", checkAuth, checkRoleAuth(['student', "director", 'juridico', 'enlace', 'dinamizador']), getEconomicActivitys);
router.put("/:id", updateEconomicActivity);
router.delete("/:id", deleteEconomicActivity);

router.get("/:id", getEconomicActivity);


router.get("/:id/municipalitys", getEconomicActivityMunicipalitys);


export default router;
