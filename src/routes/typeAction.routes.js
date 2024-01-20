
import { Router } from "express";
import {
    getTypeActions,
    createTypeAction,
    updateTypeAction,
    getTypeAction,
    deleteTypeAction,
    

} from "../controllers/typeAction.controller.js";
import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";


const router = Router();
// Routes
router.post("/", createTypeAction);
router.get("/", checkAuth, checkRoleAuth(['student', "director", 'juridico', 'enlace', 'dinamizador']), getTypeActions);
router.put("/:id", updateTypeAction);
router.delete("/:id", deleteTypeAction);

router.get("/:id", getTypeAction);


// router.get("/:id/municipalitys", getTypeActionMunicipalitys);


export default router;
