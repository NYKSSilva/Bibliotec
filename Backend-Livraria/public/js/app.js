const API = 'http://localhost:3000';

// ============================
// Carregar destaques (6 primeiros livros)
// ============================
async function carregarDestaques() {
  try {
    const res = await fetch(`${API}/livros/destaques`);
    const livros = await res.json();
    const container = document.getElementById('livros-destaques');
    
    container.innerHTML = livros.map(l => `
      <div class="livro-card">
        <img src="${l.imagemUrl}" alt="${l.titulo}" onerror="this.src='/img/placeholder.png'">
        <h3>${l.titulo}</h3>
        <p>${l.autor || 'Desconhecido'}</p>
        <button onclick="obterLivro(${l.idLivro})">Ver Detalhes</button>
      </div>
    `).join('');
  } catch (err) {
    console.error('Erro ao carregar destaques:', err);
  }
}

// ============================
// Carregar todos os livros
// ============================
async function carregarLivros() {
  try {
    const res = await fetch(`${API}/livros`);
    const livros = await res.json();
    exibirLivros(livros);
  } catch (err) {
    console.error('Erro ao carregar livros:', err);
  }
}



// ============================
// Obter detalhes de um livro
// ============================
async function obterLivro(id) {
  const titulo = req.query.titulo;

  if (!titulo) {
  return res.status(400).json({ mensagem: "Por favor, informe o título do livro." });
}

try {
  const [rows] = await db.execute(
    "SELECT * FROM livros WHERE titulo LIKE ?",
    [`%${titulo}%`]
  );

  if (rows.length === 0) {
    return res.status(404).json({ mensagem: "Nenhum livro encontrado com esse título." });
  }

  res.json(rows);

} catch (err) {
  res.status(500).json({ erro: err.message });
} }

function fecharDetalhes() {
  document.getElementById('livro-detalhe').classList.add('hidden');
}

// ============================
// Inicializar ao carregar página
// ============================
document.addEventListener('DOMContentLoaded', () => {
  // Carregar destaques
  carregarDestaques();
  
  // Eventos próximos
  const hoje = new Date();
  const eventos = document.querySelectorAll('#Eventos li');
  eventos.forEach(evento => {
    const dataEvento = new Date(evento.getAttribute('data-date'));
    if (dataEvento > hoje) {
      evento.classList.add('proximo-evento');
    }
  });
  
//   // Formulário de busca
//   const formBusca = document.getElementById('search-form');
//   if (formBusca) {
//     formBusca.addEventListener('submit', (e) => {
//       e.preventDefault();
//       const termo = document.getElementById('search-input').value.trim();
//       if (termo) {
//         buscarLivros(termo);
//       } else {
//         carregarDestaques();
//       }
//     });
//   }
// });

// Tornar funções globais
window.obterLivro = obterLivro;
window.fecharDetalhes = fecharDetalhes;
})