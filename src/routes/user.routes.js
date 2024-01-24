import { Router } from "express";
import {
    getUsers,
    // createUser,
    updateUser,
    getUser,
    deleteUser,
} from "../controllers/user.controller.js";
import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";

const router = Router();

// Routes
router.get("/", checkAuth, checkRoleAuth(['administrador', "director", 'juridico', 'enlace', 'dinamizador']), getUsers);
// router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/:id", getUser);

export default router;
