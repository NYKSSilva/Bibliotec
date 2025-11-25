import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "./config/db.js";
import usuarioRoutes from "./routes/usuario.routes.js"
import livrosRoutes from "./routes/livros.routes.js"
import avaliacoesRoutes from "./routes/avaliacoes.routes.js"
import reservasRoutes  from "./routes/reservas.routes.js"
import favoritosRoutes from "./routes/favoritos.routes.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.join(__dirname, "../../"); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static(publicPath)); 

app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "inicio.html"));
})

app.use("/usuarios", usuarioRoutes)
app.use("/livros", livrosRoutes)
app.use("/avaliacoes", avaliacoesRoutes)
app.use("/reservas", reservasRoutes)
app.use("/favoritos", favoritosRoutes)

const PORT = 3000;
app.listen(PORT, () => console.log(` Servidor rodando na porta ${PORT}`));