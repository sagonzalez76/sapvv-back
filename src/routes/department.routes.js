
import { Router } from "express";
import {
    getDepartments,
    createDepartment,
    updateDepartment,
    getDepartment,
    deleteDepartment,
    getDepartmentMunicipalitys

} from "../controllers/department.controller.js";
import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";


const router = Router();
// Routes
router.post("/", createDepartment);
router.get("/", checkAuth, checkRoleAuth(['administrador', "director", 'juridico', 'enlace', 'dinamizador']), getDepartments);
router.put("/:id", updateDepartment);
router.delete("/:id", deleteDepartment);

router.get("/:id", getDepartment);


router.get("/:id/municipalitys", getDepartmentMunicipalitys);


export default router;
