import { db} from "../config/db.js";

export async function listarFavoritos(req ,res) {
    try {
        const idUsuario = req.params.id;
        const [rows] = await db.execute("SELECT * FROM favoritos WHERE idUsuario = ?", [idUsuario]);
    res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
}
export async function criarFavorito(req, res) {
  try {
      const { idUsuario, idLivro } = req.body;
    if (!idUsuario === undefined || !idLivro === undefined)
      return res.status(400).json({ erro: "Campos obrigatórios" });

    await db.execute(
      "INSERT INTO favoritos (idUsuario, idLivro) VALUES (?, ?)",
      [idUsuario, idLivro]
    );

    res.json({ mensagem: "Livro favoritado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function deletarFavorito(req, res) {
  try {
    await db.execute("DELETE FROM favoritos WHERE idFavorito = ?", [req.params.id]);
    res.json({ mensagem: "Livro retirado dos favoritos!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};