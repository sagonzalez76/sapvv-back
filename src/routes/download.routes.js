import { Router } from "express";
import  {downloadFile}  from "../controllers/download.controller.js";
import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";

const router = Router();

// Routes
router.get("/:url", downloadFile);

export default router;