import { db } from "../config/db.js";

function montarImagemUrl(caminho) {
  if (!caminho || caminho.trim() === "") {
    return "/img/placeholder.png";
  }

  const c = caminho.trim();

  if (c.startsWith("http") || c.startsWith("//")) return c;
  if (c.startsWith("/")) return c;

  return `/capas/${encodeURIComponent(c)}`;
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
  const busca = req.query.busca;

  try {
    let query = "SELECT * FROM livros";
    let params = [];

    if (busca) {
      query += " WHERE titulo LIKE ? OR autor LIKE ?";
      params = [`%${busca}%`, `%${busca}%`];
    }

    const [rows] = await db.execute(query, params);

    const livros = rows.map(r => ({
      ...r,
      imagemUrl: montarImagemUrl(r.caminho_capa)
    }));

    res.json(livros);

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

export async function obterDestaque(req, res) {
  try {
    const [rows] = await db.execute(`
            SELECT * FROM livros LIMIT 6
        `);

    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function atualizarLivro(req, res) {
  try {
    const { titulo, autor, genero, editora, ano_publicacao, isbn_10, isbn_13, idioma, formato, caminho_capa, sinopse, ativo } = req.body;
    await db.execute(
      "UPDATE livros SET titulo = ?, autor = ?, genero = ?, editora = ?, ano_publicacao = ?, isbn_10 = ?, isbn_13 = ?, idioma = ?, formato = ?, caminho_capa = ?, sinopse = ?, ativo = ? WHERE idLivro = ?",
      [titulo, autor, genero, editora, ano_publicacao, isbn_10, isbn_13, idioma, formato, caminho_capa, sinopse, ativo, req.params.id]
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