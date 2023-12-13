import { Router } from "express";
import {
    getRoles,
    createRole,
    updateRole,
    getRole,
    deleteRole
} from "../controllers/role.controller.js";

import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";


const router = Router();

// Routes
router.post("/", createRole);
router.get("/", checkAuth, checkRoleAuth(['student', "director"]), getRoles);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);
router.get("/:id", getRole);


export default router;
