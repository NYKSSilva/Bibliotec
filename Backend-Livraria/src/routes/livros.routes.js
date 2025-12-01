import express from "express"
import{
 adicionarLivro,
 buscarLivros,
 avaliacaoLivros,
  obterLivros,
 atualizarLivro,
 deletarLivro,
 
  
} from "../controllers/livros.controller.js"



const router = express.Router();


// Rotas ESPECÍFICAS primeiro
router.get("/buscar", buscarLivros);
router.get("/avaliacoes", avaliacaoLivros);

// Depois rotas gerais
router.get("/", obterLivros);
router.get("/:id", obterLivros); // Caso você realmente queira buscar por ID

// CRUD
router.post("/", adicionarLivro);
router.put("/:id", atualizarLivro);
router.delete("/:id", deletarLivro);

export default router;

