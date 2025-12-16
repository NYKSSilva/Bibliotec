import { db} from "../config/db.js";

export async function listarFavoritos(req, res) {
  try {
    // Pegando o id do usuário da URL
    const idUsuarioRaw = req.params.id;
    console.log("ID do usuário recebido:", idUsuarioRaw);

    // Converte para número
    const idUsuario = Number(idUsuarioRaw);
    if (isNaN(idUsuario)) {
      return res.status(400).json({ erro: "ID do usuário inválido" });
    }
    console.log("ID do usuário convertido:", idUsuario);

    // Testar se o banco está respondendo com uma query simples
    try {
      await db.execute("SELECT 1");
    } catch (dbErr) {
      console.error("Erro de conexão com o banco:", dbErr);
      return res.status(500).json({ erro: "Erro de conexão com o banco" });
    }

    // Query para buscar os favoritos do usuário
    const [rows] = await db.execute(
      `SELECT 
          f.idFavorito, 
          f.idLivro,
          l.titulo,
          l.autor,
          l.caminho_capa
       FROM favoritos f
       JOIN livros l ON f.idLivro = l.idLivro
       WHERE f.idUsuario = ?`,
      [idUsuario]
    );

    console.log("Resultados da query:", rows);

    res.json(rows);

  } catch (err) {
    console.error("Erro na rota favoritos:", err);
    res.status(500).json({ erro: err.message });
  }
}



export async function criarFavorito(req, res) {
  try {
    const { idUsuario, idLivro } = req.body;

    if (idUsuario === undefined || idLivro === undefined) {
      return res.status(400).json({ erro: "Campos obrigatórios" });
    }

    const [existe] = await db.execute(
      "SELECT 1 FROM favoritos WHERE idUsuario = ? AND idLivro = ?",
      [idUsuario, idLivro]
    );

    if (existe.length > 0) {
      return res.status(409).json({ erro: "Livro já está nos favoritos" });
    }

    await db.execute(
      "INSERT INTO favoritos (idUsuario, idLivro) VALUES (?, ?)",
      [idUsuario, idLivro]
    );

    res.json({ mensagem: "Livro favoritado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function deletarFavorito(req, res) {
  try {
    await db.execute("DELETE FROM favoritos WHERE idFavorito = ?", [req.params.id]);
    res.json({ mensagem: "Livro retirado dos favoritos!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};