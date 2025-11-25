import { db} from "../config/db.js";

export async function listarReservas(req ,res) {
    try {
        const [rows] = await db.execute("SELECT * FROM reservas");
    res.json(rows);
    } catch (error) {
        res.status(500).json({ erro: err.message });
    }
}
export async function criarReserva(req, res) {
  try {
    const {idUsuario, idLivro, data_retirada, data_devolucao, confirmado_email } = req.body;
    if (!idUsuario || !idLivro || !data_retirada || !data_devolucao || !confirmado_email === undefined )
      return res.status(400).json({ erro: "Campos obrigatórios" });

    await db.execute(
      "INSERT INTO reservas (idUsuario, idLivro,data_retirada, data_devolucao, confirmado_email) VALUES (?, ?, ?, ?, ?)",
      [idUsuario, idLivro,data_retirada, data_devolucao, confirmado_email]
    );

    res.json({ mensagem: "Reserva adicionada com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function deletarReserva(req, res) {
  try {
    await db.execute("DELETE FROM reservas WHERE idReservas = ?", [req.params.id]);
    res.json({ mensagem: "Reserva deletada com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

export async function reservasAtivas(req, res) {
  try { 
    const [rows] = await db.execute(`SELECT * FROM reservas WHERE data_devolucao >= CURDATE() ORDER BY data_devolucao ASC`);
    res.json(rows)
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};