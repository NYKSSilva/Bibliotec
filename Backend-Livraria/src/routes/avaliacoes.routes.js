import express from "express"
import{
    criarAvaliacao,
    listarAvaliacoes,
    listarAvaliacoesPorLivro,
} from "../controllers/avaliacao.controllers.js"

const router = express.Router();

router.get("/", listarAvaliacoes)
router.get("/:idLivro", listarAvaliacoesPorLivro)
router.post("/", criarAvaliacao)

export default router;