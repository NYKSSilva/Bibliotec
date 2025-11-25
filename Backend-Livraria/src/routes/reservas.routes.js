import express from "express"
import {
   listarReservas,
   criarReserva,
   deletarReserva,
   reservasAtivas
} from "../controllers/reservas.controllers.js"

const router = express.Router();

router.get("/", listarReservas);
router.post("/", criarReserva); 
router.delete("/:id", deletarReserva);
router.get("/ativas", reservasAtivas);

export default router;