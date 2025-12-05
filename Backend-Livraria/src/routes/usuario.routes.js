import express, { application } from "express"
import { 
    listarUsuarios, 
    criarUsuario,
    obterUsuario,
    obterMeuPerfil,
    atuallizarUsuario,
    deletarUsuario,
    loginUsuario
} from "../controllers/usuario.controller.js";

const router = express.Router();

/* /usuario / */
router.get("/", listarUsuarios);
router.post("/", criarUsuario);
router.post("/login", loginUsuario);
router.get("/user", obterMeuPerfil);
router.get("/:id",obterUsuario);
router.put("/:id",atuallizarUsuario);
router.delete("/:id",deletarUsuario);


export default router;