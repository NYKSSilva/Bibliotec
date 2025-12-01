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
//  Configuração de caminhos
// ============================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.resolve(__dirname, "..", "public");

console.log("📁 Caminho public:", publicPath); // ✅ Debug

// ============================
//  Configuração do servidor
// ============================
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(publicPath));

app.use("/usuarios", usuarioRoutes)
app.use("/livros", livrosRoutes)
app.use("/avaliacoes", avaliacoesRoutes)
app.use("/reservas", reservasRoutes)
app.use("/favoritos", favoritosRoutes)
app.use("/livros", livrosRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// ============================
//  Inicia o servidor
// ============================
const PORT = 3000;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Acesse: http://localhost:${PORT}`);
});

// ✅ Tratamento de erros
server.on('error', (err) => {
  console.error('❌ Erro ao iniciar servidor:', err);
});

process.on('uncaughtException', (err) => {
  console.error('❌ Erro não capturado:', err);
});