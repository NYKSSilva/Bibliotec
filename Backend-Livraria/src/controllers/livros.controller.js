
import { db } from "../config/db.js";

export async function obterDestaques(req, res) {
  try {
    const [rows] = await db.query("SELECT idLivro, titulo, autor, caminho_capa FROM livros LIMIT 6");
    const livros = rows.map(r => {
      const raw = r.caminho_capa ? String(r.caminho_capa).trim() : '';
      const imagemUrl = raw
        ? (raw.startsWith('http') || raw.startsWith('//') ? raw : (raw.startsWith('/') ? raw : `/capas/${encodeURIComponent(raw)}`))
        : '/img/placeholder.png';
      return {
        idLivro: r.idLivro,
        titulo: r.titulo,
        autor: r.autor,
        imagemUrl
      };
    });
    res.json(livros);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao obter destaques" });
  }
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

  const titulo = req.query.titulo;
  const genero = req.query.genero


  if (!titulo || !genero) {
    try {
      const [rows] = await db.execute("SELECT * FROM livros");
      res.json(rows);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  } else {
    try {
      const [rows] = await db.query("SELECT idLivro, titulo, autor, caminho_capa FROM livros");
    const livros = rows.map(r => ({
      idLivro: r.idLivro,
      titulo: r.titulo,
      autor: r.autor,
      imagemUrl: r.caminho_capa && r.caminho_capa.startsWith('http') ? r.caminho_capa : (r.caminho_capa ? `/capas/${r.caminho_capa}` : '/img/placeholder.png')
    }));
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }


};
export async function obterLivro(req, res) {
  const titulo = req.query.titulo;

  if (!titulo) {
    try {
      const [rows] = await db.execute("SELECT * FROM livros");
      res.json(rows);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  } else {
    try {
      const [rows] = await db.execute(`SELECT * FROM livros  WHERE titulo LIKE '%${titulo}%'`);
      res.json(rows);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }

  
  try {
    const [rows] = await db.execute("SELECT * FROM livros WHERE idLivro = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ erro: "Livro não encontrado" });
    res.json(rows[0]);
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
