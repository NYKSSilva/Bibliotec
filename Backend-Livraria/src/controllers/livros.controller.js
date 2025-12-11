import { db } from "../config/db.js";

export async function adicionarLivro(req, res) {
  try {
    const { titulo, autor, sinopse, ativo, caminho_capa } = req.body;
    if (!titulo || !autor || !sinopse || !caminho_capa)
      return res.status(400).json({ erro: "Campos obrigatórios" });

    await db.execute(
      "INSERT INTO livros (titulo, autor, sinopse, ativo, caminho_capa) VALUES (?, ?, ?, ?, ?)",
      [titulo, autor, sinopse, ativo, caminho_capa] 
    );

    res.json({ mensagem: "Livro adicionado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function listarLivros(req, res) {
  try {
    const { titulo, genero } = req.query;

    if (!titulo && !genero) {
      const [rows] = await db.execute("SELECT * FROM livros");
      return res.json(rows);
    }

    const where = [];
    const params = [];
    if (titulo) {
      where.push("titulo LIKE ?");
      params.push(`%${titulo}%`);
    }
    if (genero) {
      where.push("genero LIKE ?");
      params.push(`%${genero}%`);
    }

    const sql = `SELECT * FROM livros WHERE ${where.join(" OR ")}`;
    const [rows] = await db.execute(sql, params);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function atualizarLivro(req, res) {
  try {
    const { titulo, autor, descricao, disponivel } = req.body;
    await db.execute(
      "UPDATE livros SET titulo = ?, autor = ?, descricao = ?, disponivel = ? WHERE idLivro = ?",
      [titulo, autor, descricao, disponivel, req.params.id]
    );
    res.json({ mensagem: "Livro atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function deletarLivro(req, res) {
  try {
    await db.execute("DELETE FROM livros WHERE idLivro = ?", [req.params.id]);
    res.json({ mensagem: "Livro deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function obterLivro(req, res) {
  const titulo = req.query.titulo;

  try {
    if (titulo) {
      const [rows] = await db.execute(
        "SELECT * FROM livros WHERE titulo LIKE ?",
        [`%${titulo}%`]
      );

      const livros = rows.map(r => ({
        ...r,
        imagemUrl: montarImagemUrl(r.caminho_capa)
      }));

      return res.json(livros);
    }
    const [rows] = await db.execute("SELECT * FROM livros");

    const livros = rows.map(r => ({
      ...r,
      imagemUrl: montarImagemUrl(r.caminho_capa)
    }));

    return res.json(livros);

  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
}

export async function avaliacaoLivros(req, res) {
  try {
    const [rows] = await db.execute(`
      SELECT
        l.titulo,
        IFNULL(ROUND(AVG(a.nota), 2), 0) AS Media,
        COUNT(a.idAvaliacoes) AS Total_de_avaliações
      FROM livros l
      LEFT JOIN avaliacoes a ON l.idLivro = a.idLivro
      GROUP BY l.idLivro, l.titulo
      ORDER BY l.titulo
    `);
    
    return res.json(rows);
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
}
