
import { db } from "../config/db.js";
// ============================
//  Rotas CRUD
// ============================



export async function criarUsuario(req, res) {
  try {
    const { nome, matricula, email, cpf, senha, data_nascimento,celular, curso } = req.body;

    if (!nome || !matricula || !email ||!cpf ||!senha ||!data_nascimento ||!celular ||!curso) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios." });
    }

    await db.execute(
      `INSERT INTO usuarios (nome, matricula, email, cpf, senha, data_nascimento,celular, curso)
       VALUES (?, ?, ?, ?, ?, ?,?,?)`,
      [nome, matricula, email, cpf, senha, data_nascimento,celular, curso]
    );

    res.json({ mensagem: "Usuário cadastrado com sucesso!" });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};



export async function listarUsuarios (req, res){
  try {
    const [rows] = await db.execute("SELECT * FROM usuarios");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


export async function obterUsuario (req, res){
  try {
    const [rows] = await db.execute("SELECT * FROM usuarios WHERE idUsuario = ?", [
      req.params.id,
    ]);
    if (rows.length === 0)
      return res.status(404).json({ erro: "Usuário não encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function atuallizarUsuario(req, res){
  try {
    const { nome, email, senha } = req.body;
    await db.execute(
      "UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE idUsuario = ?",
      [nome, email, senha, req.params.id]
    );
    res.json({ mensagem: "Usuário atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};


export async function deletarUsuario (req, res){
  try {
    await db.execute("DELETE FROM usuarios WHERE idUsuario = ?", [req.params.id]);
    res.json({ mensagem: "Usuário deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
export async function loginUsuario(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "E-mail e senha são obrigatórios." });
    }

    const [rows] = await db.execute(
      "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
      [email, senha]
    );

    if (rows.length === 0) {
      return res.status(401).json({ erro: "E-mail ou senha incorretos." });
    }

    res.json({
      mensagem: "Login realizado com sucesso!",
      usuario: rows[0]
    });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}
