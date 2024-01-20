
import { Router } from "express";
import {
    getDependencys,
    createDependency,
    updateDependency,
    getDependency,
    deleteDependency,
    

} from "../controllers/dependency.controller.js";
import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";


const router = Router();
// Routes
router.post("/", createDependency);
router.get("/", checkAuth, checkRoleAuth(['student', "director", 'juridico', 'enlace', 'dinamizador']), getDependencys);
router.put("/:id", updateDependency);
router.delete("/:id", deleteDependency);

router.get("/:id", getDependency);



export default router;
