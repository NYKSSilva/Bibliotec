import express from "express"
import{
    criarAvaliacao,
    listarAvaliacoes,
    listarAvaliacoesPorLivro,
} from "../controllers/avaliacao.controllers.js"

const router = express.Router();

// router.get("/", listarAvaliacoes)
// router.get("/:idLivro", listarAvaliacoesPorLivro)
// router.post("/", criarAvaliacao)
router.get("/", listarAvaliacoes);
router.post("/", criarAvaliacao);
router.get("/livro/:idLivro", listarAvaliacoesPorLivro);
export default router;