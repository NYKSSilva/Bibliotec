import express from "express"
import{
 adicionarLivro,
 atualizarLivro,
 avaliacaoLivros,
 deletarLivro,
 listarLivros,
 obterDestaque
} from "../controllers/livros.controllers.js"



const router = express.Router();


router.post("/",adicionarLivro);
router.get("/", listarLivros);
router.get("/avaliacoes", avaliacaoLivros)
router.put("/:id", atualizarLivro);
router.delete("/:id",deletarLivro);
router.get("/destaques", obterDestaque)
export default router;