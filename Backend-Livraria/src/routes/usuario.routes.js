import express from "express"
import { 
    listarUsuarios, 
    criarUsuario,
    obterUsuario,
    atuallizarUsuario,
    deletarUsuario,
    loginUsuario
} from "../controllers/usuario.controllers.js";

const router = express.Router();

/* /usuario / */
router.post("/login", loginUsuario)
router.get("/", listarUsuarios);
router.post("/", criarUsuario);
router.get("/:id",obterUsuario);
router.put("/:id",atuallizarUsuario);
router.delete("/:id",deletarUsuario);

export default router;