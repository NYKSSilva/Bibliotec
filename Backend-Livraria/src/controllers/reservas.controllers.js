import { db} from "../config/db.js";

export async function listarReservas(req ,res) {
    try {
        const [rows] = await db.execute("SELECT * FROM reservas");
    res.json(rows);
    } catch (error) {
        res.status(500).json({ erro: err.message });
    }
}

export async function criarReserva(req,res) {
  try {
    const { idUsuario, idLivro } = req.body;

    const sql = `
      INSERT INTO reservas (
        idUsuario,
        idLivro,
        data_retirada,
        data_devolucao
      )
      VALUES (
        ?, 
        ?, 
        CURDATE(),
        DATE_ADD(CURDATE(), INTERVAL 14 DAY)
      )
    `;

    const [result] = await db.execute(sql, [idUsuario, idLivro]);

    // Buscar datas geradas pelo banco
    const [rows] = await db.execute(
      'SELECT data_retirada, data_devolucao FROM reservas WHERE idReservas = ?',
      [result.insertId]
    );

    res.json({
      sucesso: true,
      dataRetirada: rows[0].data_retirada,
      dataDevolucao: rows[0].data_devolucao
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao reservar livro' });
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