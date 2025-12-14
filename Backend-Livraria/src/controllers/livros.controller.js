import { db } from "../config/db.js";

function montarImagemUrl(caminho) {
  if (!caminho) return null;
  if (caminho.startsWith('http')) return caminho;
  return `/capas/${caminho}`;
}

export async function adicionarLivro(req, res) {
  try {
    const { titulo, autor, genero, editora, ano_publicacao, isbn_10, isbn_13, idioma, formato, caminho_capa, sinopse, ativo } = req.body;
    if (!titulo || !autor || !genero || !editora || !ano_publicacao || !isbn_13 || !idioma || !formato || !caminho_capa || !sinopse || ativo === undefined)
      return res.status(400).json({ erro: "Campos obrigatórios" });

    const [tituloRows] = await db.execute(
      "SELECT titulo FROM livros WHERE titulo = ?",
      [titulo]
    );

    if (tituloRows.length > 0) {
      return res.status(400).json({ erro: "Livro já está cadastrado" })
    }

    const [isbn10Rows] = await db.execute(
      "SELECT isbn_10 FROM livros WHERE isbn_10 = ?",
      [isbn_10]
    );

    if (isbn10Rows.length > 0) {
      return res.status(400).json({ erro: "Identificação (isbn10) já está cadastrado" })
    }

    const [isbn13Rows] = await db.execute(
      "SELECT isbn_13 FROM livros WHERE isbn_13 = ?",
      [titulo]
    );

    if (isbn13Rows.length > 0) {
      return res.status(400).json({ erro: "Identificação (isbn13) já está cadastrado" })
    }

    await db.execute(
      "INSERT INTO livros (titulo, autor, genero, editora, ano_publicacao, isbn_10, isbn_13, idioma, formato, caminho_capa, sinopse, ativo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [titulo, autor, genero, editora, ano_publicacao, isbn_10, isbn_13, idioma, formato, caminho_capa, sinopse, ativo]
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

export async function obterLivroPorId(req, res) {
  try {
    const [rows] = await db.execute("SELECT * FROM livros WHERE idLivro = ?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ erro: "Livro não encontrado" });
    const livro = rows[0];
    livro.imagemUrl = montarImagemUrl(livro.caminho_capa);
    res.json(livro);
  } catch (err) {
    res.status(500).json({ erro: err.message });
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
