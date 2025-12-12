import express from "express"
import{
 adicionarLivro,
 atualizarLivro,
 avaliacaoLivros,
 deletarLivro,
 listarLivros,
 obterLivroPorId,
 obterDestaque
} from "../controllers/livros.controller"



const router = express.Router();

router.get("/:id", obterLivroPorId);
router.post("/",adicionarLivro);
router.get("/", listarLivros);
router.get("/avaliacoes", avaliacaoLivros)
router.put("/:id", atualizarLivro);
router.delete("/:id",deletarLivro);
router.get("/destaques", obterDestaque)
export default router;