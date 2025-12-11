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
// import { loginUsuario } from "./controllers/usuario.controller.js";
// ============================
//  Configuração de caminhos
// ============================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicPath = path.resolve(__dirname, "..", "public");


// ============================
//  Configuração do servidor
// ============================
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(publicPath));

// ===== ARQUIVOS ESTÁTICOS (1º) =====
app.use(express.static(publicPath));
app.use('/capas', express.static(path.join(publicPath, 'livros')));

// ===== ROTA RAIZ (2º) =====
app.get("/", (req, res) => {
    res.sendFile(path.join(publicPath, "login.html"));
})

// ===== ROTAS DE API (3º) — SEM DUPLICATAS =====
app.use("/usuarios", usuarioRoutes)
app.use("/livros", livrosRoutes)  // 
app.use("/avaliacoes", avaliacoesRoutes)
app.use("/reservas", reservasRoutes)
app.use("/favoritos", favoritosRoutes)

// ===== FALLBACK SPA (ÚLTIMO) — para rotas desconhecidas =====
// app.use((req, res) => {
//   const index = path.join(publicPath, 'index.html');
//   res.sendFile(index, err => {
//     if (err) res.status(404).json({ error: "Página não encontrada" });
//   });
// });
app.use((req, res) => {
    res.status(404).json({ error: "Página não encontrada" });
});


// ============================
//  Inicia o servidor
// ============================
const PORT = 3000;
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📍 Acesse: http://localhost:${PORT}`);
});
