import { db} from "../config/db.js";

export async function criarUsuario(req, res) {
  try {
    const { nome, matricula, email, cpf, senha, data_nascimento, celular, curso } = req.body;

    if (!nome || !matricula || !email || !cpf || !senha || !data_nascimento || !celular || !curso) {
      return res.status(400).json({ erro: "Campos obrigatórios faltando" });
    }

    if (cpf.length !== 11) {
      return res.status(400).json({ erro: "CPF inválido. Deve conter 11 dígitos." });
    }

    if (celular.length !== 11) {
      return res.status(400).json({ erro: "Celular inválido. Deve conter 11 dígitos." });
    }

    const [cpfRows] = await db.execute(
      "SELECT cpf FROM usuarios WHERE cpf = ?",
      [cpf]
    );

    if (cpfRows.length > 0) {
      return res.status(400).json({ erro: "CPF já está cadastrado" })
    }

    const [celularRows] = await db.execute(
      "SELECT celular FROM usuarios WHERE celular = ?",
      [celular]
    );

    if (celularRows.length > 0) {
      return res.status(400).json({ erro: "Celular já está cadastrado" })
    }

      const [emailRows] = await db.execute(
      "SELECT matricula FROM usuarios WHERE email = ?",
      [email]
    );

    if (emailRows.length > 0) {
      return res.status(400).json({ erro: "Email já está cadastrado" })
    }

      const [matriculaRows] = await db.execute(
      "SELECT matricula FROM usuarios WHERE matricula = ?",
      [matricula]
    );

    if (matriculaRows.length > 0) {
      return res.status(400).json({ erro: "Matricula já está cadastrada" })
    }


    await db.execute(
      "INSERT INTO usuarios (nome, matricula, email, cpf, senha, data_nascimento, celular, curso) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [nome, matricula, email, cpf, senha, data_nascimento, celular, curso]
    );

    res.json({ mensagem: "Usuário criado com sucesso!" });

  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

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