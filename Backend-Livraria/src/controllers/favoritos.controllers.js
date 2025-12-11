import { db } from "../config/db.js";

// LISTAR favoritos com informações do livro
export async function listarFavoritos(req, res) {
    try {
        const idUsuario = req.params.id;

        const [rows] = await db.execute(`
  SELECT 
    favoritos.idFavorito,
    livros.idLivro,
    livros.titulo,
    livros.autor,
    livros.imagemUrl,
    livros.caminho_capa,
    livros.capa,
    livros.imagem,
    livros.arquivo
  FROM favoritos
  INNER JOIN livros ON livros.idLivro = favoritos.idLivro
  WHERE favoritos.idUsuario = ?
`, [idUsuario]);

        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}


// CRIAR favorito
export async function criarFavorito(req, res) {
    try {
        const { idUsuario, idLivro } = req.body;

        if (idUsuario === undefined || idLivro === undefined) {
            return res.status(400).json({ erro: "Campos obrigatórios." });
        }

        await db.execute(
            "INSERT IGNORE INTO favoritos (idUsuario, idLivro) VALUES (?, ?)",
            [idUsuario, idLivro]
        );

        res.json({ mensagem: "Livro favoritado com sucesso!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}


// DELETAR favorito usando idUsuario + idLivro
export async function deletarFavorito(req, res) {
    try {
        const { idUsuario, idLivro } = req.body;

        if (!idUsuario || !idLivro) {
            return res.status(400).json({ erro: "idUsuario e idLivro são obrigatórios." });
        }

        await db.execute(
            "DELETE FROM favoritos WHERE idUsuario = ? AND idLivro = ?",
            [idUsuario, idLivro]
        );

        res.json({ mensagem: "Livro removido dos favoritos!" });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}
