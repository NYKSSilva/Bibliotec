import express, { application } from "express"
import { 
    listarUsuarios, 
    criarUsuario,
    obterUsuario,
    atuallizarUsuario,
    deletarUsuario
} from "../controllers/usuario.controller.js";

const router = express.Router();

/* /usuario / */
router.get("/", listarUsuarios);
router.post("/", criarUsuario);
router.get("/:id",obterUsuario);
router.put("/:id",atuallizarUsuario);
router.delete("/:id",deletarUsuario);

export default router;