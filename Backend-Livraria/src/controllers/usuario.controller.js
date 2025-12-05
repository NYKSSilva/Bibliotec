import { db} from "../config/db.js";

export async function criarUsuario(req, res) {
  try {
    const { nome, email, senha } = req.body;
    if (!nome || !email || !senha)
      return res.status(400).json({ erro: "Campos obrigatórios" });

    await db.execute(
      "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)",
      [nome, email, senha]
    );

    res.json({ mensagem: "Usuário criado com sucesso!" });
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

export async function obterMeuPerfil(req, res) {
  try {
   
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ erro: "Token não fornecido" });

    const decoded = jwt.verify(token, 'sua-chave-secreta');
    const [rows] = await db.execute(
      "SELECT idUsuario, nome, email, matricula, curso FROM usuarios WHERE idUsuario = ?",
      [decoded.idUsuario]
    );

    if (rows.length === 0) 
      return res.status(404).json({ erro: "Usuário não encontrado" });

    res.json(rows[0]);
  } catch (err) {
    res.status(401).json({ erro: "Token inválido" });
  }
}

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
    if (!email || !senha)
      return res.status(400).json({ erro: "Email e senha são obrigatórios" });

    const [rows] = await db.execute(
      "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
      [email, senha]
    );

    if (rows.length === 0)
      return res.status(401).json({ erro: "Informações inválidas" });

    const usuario = { ...rows[0] };
    delete usuario.senha;

    res.json({ mensagem: "Login realizado com sucesso", usuario });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};