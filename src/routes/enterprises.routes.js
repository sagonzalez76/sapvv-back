
import { Router } from "express";
import {
    getEnterprises,
    createEnterprise,
    updateEnterprise,
    getEnterprise,
    deleteEnterprise,


} from "../controllers/enterprise.controller.js";
import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";


const router = Router();
// Routes
router.post("/", createEnterprise);
router.get("/", checkAuth, checkRoleAuth(['administrador', "director", 'juridico', 'enlace', 'dinamizador']), getEnterprises);
router.put("/:id", updateEnterprise);
router.delete("/:id", deleteEnterprise);
router.get("/:id", getEnterprise);



export default router;
