
import { Router } from "express";
import {
    getEnterprises,
    createEnterprise,
    updateEnterprise,
    getEnterprise,
    deleteEnterprise,
    getProductiveUnitys,
    getProductiveUnity,


} from "../controllers/enterprise.controller.js";
import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";


const router = Router();
// Routes
router.post("/", createEnterprise);
router.get("/", checkAuth, checkRoleAuth(['administrador', "director", 'juridico', 'enlace', 'dinamizador']), getProductiveUnitys);
router.put("/:id", updateEnterprise);
router.delete("/:id", deleteEnterprise);
router.get("/:id", getProductiveUnity);



export default router;
