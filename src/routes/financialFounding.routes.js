
import { Router } from "express";
import {
    getFinancialFoundings,
    createFinancialFounding,
    updateFinancialFounding,
    getFinancialFounding,
    deleteFinancialFounding,
    getFinancialFoundingMunicipalitys

} from "../controllers/financialFounding.controller.js";
import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";


const router = Router();
// Routes
router.post("/", createFinancialFounding);
router.get("/", checkAuth, checkRoleAuth(['student', "director", 'juridico', 'enlace', 'dinamizador']), getFinancialFoundings);
router.put("/:id", updateFinancialFounding);
router.delete("/:id", deleteFinancialFounding);

router.get("/:id", getFinancialFounding);


router.get("/:id/municipalitys", getFinancialFoundingMunicipalitys);


export default router;
