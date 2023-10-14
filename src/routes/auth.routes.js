import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import { checkAuth } from "../middleware/authenticate.js";

const router = Router()

  
router.post("/signUp", signUp) ;

router.post("/signIn", signIn);



export default router;