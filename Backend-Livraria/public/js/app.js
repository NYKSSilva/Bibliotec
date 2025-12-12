// ...existing code...
const API = 'http://localhost:3000';

// helper: montar URL da capa a partir do campo vindo do banco
function urlCapa(livro) {
  const campo = livro.imagemUrl || livro.caminho_capa || livro.imagem || livro.capa || livro.arquivo;
  if (!campo || campo.trim() === "") return "public/img/placeholder.png";
  if (campo.startsWith("http") || campo.startsWith("//")) return campo;
  if (campo.startsWith("/")) return campo;
  return `/capas/${campo}`;
}

// função reutilizável de render
function exibirLivros(livros, containerSelector = '#livros-destaques') {
  const container = document.querySelector(containerSelector) || document.querySelector('.Destaques') || document.querySelector('.livros');
  if (!container) {
    console.warn('Container para livros não encontrado:', containerSelector);
    return;
  }
  container.innerHTML = livros.map(l => `
    <div class="livro-card livro-item">
      <div class="livro-cover">
        <img src="${urlCapa(l)}" alt="${(l.titulo||'').replace(/"/g,'&quot;')}" onerror="this.src='public/img/placeholder.png'">
      </div>
      <h3 class="titulo">${l.titulo || 'Sem título'}</h3>
      <p class="autor">${l.autor || 'Desconhecido'}</p>
    </div>
  `).join('');
}

async function carregarDestaques() {
  try {
    let res = await fetch(`${API}/livros/destaques`);
    let livros = [];
    if (res.ok) {
      livros = await res.json();
    } else {
      const r2 = await fetch(`${API}/livros`);
      if (r2.ok) {
        const all = await r2.json();
        livros = all.slice(0, 6);
      } else {
        console.warn('Nenhuma rota de livros disponível:', res.status, r2 && r2.status);
      }
    }
    if (livros.length === 0) {
      const container = document.getElementById('livros-destaques');
      if (container) container.innerHTML = '<p style="text-align:center;color:#666">Nenhum livro para exibir.</p>';
    } else {
      exibirLivros(livros, '#livros-destaques');
    }
  } catch (err) {
    console.error('Erro ao carregar destaques:', err);
  }
}

// carregar todos (se precisar em outra área)
async function carregarLivros() {
  try {
    const res = await fetch(`${API}/livros`);
    if (!res.ok) throw new Error('Erro ao obter /livros: ' + res.status);
    const livros = await res.json();
    exibirLivros(livros, '.livros');
  } catch (err) {
    console.error('Erro ao carregar livros:', err);
  }
}

// buscar por título (usa query param em /livros)
async function buscarLivros(termo) {
  try {
    const res = await fetch(`${API}/livros?busca=${encodeURIComponent(termo)}`);
    if (!res.ok) {
      // se backend não devolve 404 JSON, mostra mensagem
      const container = document.getElementById('livros-destaques');
      if (container) container.innerHTML = '<p style="text-align:center;color:#666">Nenhum livro encontrado.</p>';
      return;
    }
    const livros = await res.json();
    if (!Array.isArray(livros) || livros.length === 0) {
      const container = document.getElementById('livros-destaques');
      if (container) container.innerHTML = '<p style="text-align:center;color:#666">Nenhum livro encontrado.</p>';
      return;
    }
    exibirLivros(livros, '#livros-destaques');
  } catch (err) {
    console.error('Erro ao buscar livros:', err);
    alert('Erro ao buscar livros. Veja console.');
  }
}

// detalhes permanecem iguais...
async function obterLivro(id) { /* ...existing code... */ }
function fecharDetalhes() { /* ...existing code... */ }

// inicialização
document.addEventListener('DOMContentLoaded', () => {
  carregarDestaques();
  // carregarLivros(); // descomente se quiser carregar catálogo em outra área

  // form de busca: id no HTML é "search" ou "search-form"? ajuste conforme
  const formBusca = document.getElementById('search') || document.getElementById('search-form') || document.getElementById('searchForm');
  if (formBusca) {
    formBusca.addEventListener('submit', async (e) => {
      e.preventDefault();
      const input = document.getElementById('search-input') || document.querySelector('input[name="titulo"]');
      const termo = input ? input.value.trim() : '';
      if (termo) await buscarLivros(termo);
      else await carregarDestaques();
    });
  }
});

// expor funções globais caso precise do HTML inline
window.obterLivro = obterLivro;
window.fecharDetalhes = fecharDetalhes;
window.buscarLivros = buscarLivros;
// ...existing code...