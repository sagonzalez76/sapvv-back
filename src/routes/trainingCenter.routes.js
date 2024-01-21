
import { Router } from "express";
import {
    getTrainingCenters,
    createTrainingCenter,
    updateTrainingCenter,
    getTrainingCenter,
    deleteTrainingCenter,
    getTrainingCenterMunicipalitys

} from "../controllers/trainingCenter.controller.js";
import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";


const router = Router();
// Routes
router.post("/", createTrainingCenter);
router.get("/", checkAuth, checkRoleAuth(['student', "director", 'juridico', 'enlace', 'dinamizador']), getTrainingCenters);
router.put("/:id", updateTrainingCenter);
router.delete("/:id", deleteTrainingCenter);

router.get("/:id", getTrainingCenter);


router.get("/:id/municipalitys", getTrainingCenterMunicipalitys);


export default router;
