import { Router } from "express";
import {
getUsers
} from "../controllers/user.controller.js";
import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";

const router = Router();

// Routes
router.get("/", checkAuth, checkRoleAuth(['student', "director"]),getUsers);


export default router;
