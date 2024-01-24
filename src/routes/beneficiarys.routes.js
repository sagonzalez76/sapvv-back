import { Router } from "express";
import {
    createBeneficiary,
    getBeneficiarys,
    updateBeneficiary,
    deleteBeneficiary,
    getBeneficiary,
} from "../controllers/beneficiary.controller.js";

import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";


const router = Router();

// Routes
router.post("/", createBeneficiary);
router.put("/:id", updateBeneficiary);
router.delete("/:id", deleteBeneficiary);
router.get("/", checkAuth, checkRoleAuth(['administrador', "director", 'juridico', 'enlace', 'dinamizador']), getBeneficiarys);
router.get("/:id", getBeneficiary);

export default router;
