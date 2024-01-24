
import { Router } from "express";
import {
    getConcertations,
    createConcertation,
    updateConcertation,
    getConcertation,
    deleteConcertation,


} from "../controllers/concertation.controller.js";
import { checkAuth } from "../middleware/authenticate.js";
import { checkRoleAuth } from "../middleware/roleAuthenticate.js";


const router = Router();
// Routes
router.post("/", createConcertation);
router.get("/", checkAuth, checkRoleAuth(['administrador', "director", 'juridico', 'enlace', 'dinamizador']), getConcertations);
router.put("/:id", updateConcertation);
router.delete("/:id", deleteConcertation);
router.get("/:id", getConcertation);



export default router;
