import express from "express"
import{
    criarAvaliacao,
    listarAvaliacoes,
} from "../controllers/avaliacao.controllers.js"

const router = express.Router();


router.get("/", listarAvaliacoes)
router.post("/", criarAvaliacao)

export default router;