import express from "express"
import{
 adicionarLivro,
 atualizarLivro,
 avaliacaoLivros,
 deletarLivro,
 listarLivros,
 obterLivro,
} from "../controllers/livros.controller.js"



const router = express.Router();


router.post("/",adicionarLivro);
router.get("/", listarLivros);
router.get("/avaliacoes", avaliacaoLivros)
router.get("/:id", obterLivro);
router.put("/:id", atualizarLivro);
router.delete("/:id",deletarLivro);
export default router;