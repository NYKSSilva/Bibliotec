import express from "express"
import{
 adicionarLivro,
 atualizarLivro,
 avaliacaoLivros,
 deletarLivro,
 listarLivros,
 obterLivro,
 obterLivroPorId,
} from "../controllers/livros.controller.js"



const router = express.Router();


router.post("/",adicionarLivro);
router.get("/", listarLivros);
router.get("/avaliacoes", avaliacaoLivros)
router.get("/:id", obterLivroPorId);
router.put("/:id", atualizarLivro);
router.delete("/:id",deletarLivro);
export default router;