// ============================
//  Dependências
// ============================
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import usuarioRoutes from "./routes/usuario.routes.js"
import livrosRoutes from "./routes/livros.routes.js"
import avaliacoesRoutes from "./routes/avaliacoes.routes.js"
import reservasRoutes  from "./routes/reservas.routes.js"
import favoritosRoutes from "./routes/favoritos.routes.js"

// ============================
//  Configuração do servidor
// ============================
const app = express();
app.use(cors());
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "..", "Bibliotec"))); // agora index.html, css e js serão servidos

app.get("/", (req,res)=>{
  res.send("API rodando com sucesso")
})

app.use("/usuarios", usuarioRoutes)
app.use("/livros", livrosRoutes)
app.use("/avaliacoes", avaliacoesRoutes)
app.use("/reservas", reservasRoutes)
app.use("/favoritos",favoritosRoutes)

// ============================
//  Inicia o servidor
// ============================
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));