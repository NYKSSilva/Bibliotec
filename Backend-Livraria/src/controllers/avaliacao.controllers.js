import { db} from "../config/db.js";

export async function listarAvaliacoes(req ,res) {
    try {
        const [rows] = await db.execute("SELECT * FROM avaliacoes");
    res.json(rows);
    } catch (error) {
        res.status(500).json({ erro: err.message });
    }
}

export async function criarAvaliacao(req, res) {
  try {
    const {idUsuario, idLivro, nota, comentario } = req.body;
    if (!idUsuario || !idLivro || !nota || !comentario )
      return res.status(400).json({ erro: "Campos obrigatórios" });

    await db.execute(
      "INSERT INTO avaliacoes (idUsuario, idLivro, nota, comentario) VALUES (?, ?, ?, ?)",
      [idUsuario, idLivro, nota, comentario]
    );

    res.json({ mensagem: "Avaliação adicionada com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};