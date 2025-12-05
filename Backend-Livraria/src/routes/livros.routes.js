import express from "express"
import{
 adicionarLivro,
 atualizarLivro,
 avaliacaoLivros,
 deletarLivro,
 listarLivros,
 obterLivro,
 obterDestaques,
} from "../controllers/livros.controller.js"



const router = express.Router();

router.get('/destaques', obterDestaques);
router.post("/",adicionarLivro);
router.get("/", listarLivros);
router.get("/avaliacoes", avaliacaoLivros)
router.get("/titulo", obterLivro);
router.put("/:id", atualizarLivro);
router.delete("/:id",deletarLivro);

export default router;