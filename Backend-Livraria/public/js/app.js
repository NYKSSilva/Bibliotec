const API = 'http://localhost:3000';

// ============================
// Carregar destaques (6 primeiros livros)
// ============================
async function carregarDestaques() {
  try {
    const res = await fetch('/livros/destaques');
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
// Buscar livros
// ============================
async function buscarLivros(termo) {
  try {
    const res = await fetch(`${API}/livros/buscar?q=${encodeURIComponent(termo)}`);
    const livros = await res.json();
    exibirLivros(livros);
    
    if (livros.length === 0) {
      alert('Nenhum livro encontrado!');
    }
  } catch (err) {
    console.error('Erro ao buscar livros:', err);
  }
}

// ============================
// Exibir livros na tela
// ============================
function exibirLivros(livros) {
  const container = document.getElementById('livros-container');
  if (!container) return;
  
  container.innerHTML = livros.map(l => `
    <div class="livro-card">
      <img src="${l.imagemUrl || l.caminho_capa || '/img/placeholder.png'}" 
           alt="${l.titulo}" 
           onerror="this.src='/img/placeholder.png'">
      <h3>${l.titulo}</h3>
      <p>${l.autor || 'Desconhecido'}</p>
      <button onclick="obterLivro(${l.idLivro})">Ver Detalhes</button>
    </div>
  `).join('');
}

// ============================
// Obter detalhes de um livro
// ============================
async function obterLivro(id) {
  try {
    const res = await fetch(`${API}/livros/${id}`);
    const livro = await res.json();
    
    const detalhe = document.getElementById('livro-detalhe');
    detalhe.innerHTML = `
      <div class="detail-panel">
        <button onclick="fecharDetalhes()">✖ Fechar</button>
        <h2>${livro.titulo}</h2>
        <p><strong>Autor:</strong> ${livro.autor || '-'}</p>
        <p><strong>Descrição:</strong> ${livro.descricao || 'Sem descrição'}</p>
        <p><strong>Disponível:</strong> ${livro.disponivel ? 'Sim' : 'Não'}</p>
      </div>
    `;
    detalhe.classList.remove('hidden');
  } catch (err) {
    console.error('Erro ao obter livro:', err);
  }
}

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
  
  // Formulário de busca
  const formBusca = document.getElementById('search-form');
  if (formBusca) {
    formBusca.addEventListener('submit', (e) => {
      e.preventDefault();
      const termo = document.getElementById('search-input').value.trim();
      if (termo) {
        buscarLivros(termo);
      } else {
        carregarDestaques();
      }
    });
  }
});

// Tornar funções globais
window.obterLivro = obterLivro;
window.fecharDetalhes = fecharDetalhes;