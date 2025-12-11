const API = 'http://localhost:3000';
// helper: montar URL da capa a partir do campo vindo do banco
function urlCapa(livro) {
  const campo = livro.imagemUrl || livro.caminho_capa || livro.imagem || livro.capa || livro.arquivo;

  if (!campo || campo.trim() === "") {
    return "/img/placeholder.png";
  }

  if (campo.startsWith("http") || campo.startsWith("//")) {
    return campo;
  }

  if (campo.startsWith("/")) {
    return campo;
  }

  return `/capas/${campo}`;
}


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
        <img src="${urlCapa(l)}" alt="${l.titulo}" onerror="this.src='/img/placeholder.png'">
        <h3 class="titulo">${l.titulo}</h3>
        <p class="autor">${l.autor || 'Desconhecido'}</p>
        <button class="fav-btn" data-id="${l.idLivro}">❤️ Favoritar</button>
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
// Buscar livros por título ou autor
// ============================
async function buscarLivros(termo) {
  try {
    const res = await fetch(`${API}/livros/titulo?titulo=${encodeURIComponent(termo)}`);
    if (!res.ok) {
      const container = document.getElementById('livros-destaques');
      container.innerHTML = '<p style="text-align: center; color: #666;">Nenhum livro encontrado.</p>';
      return;
    }

    const data = await res.json();


    const livros = Array.isArray(data) ? data : (data ? [data] : []);

    const container = document.getElementById('livros-destaques');

    if (livros.length === 0) {
      container.innerHTML = '<p style="text-align: center; color: #666;">Nenhum livro encontrado.</p>';
      return;
    }

    container.innerHTML = livros.map(l => `
      <div class="livro-card">
       <img src="${urlCapa(l)}" alt="${l.titulo || 'Capa'}" onerror="this.src='/img/placeholder.png'">
        <h3 class="titulo">${l.titulo || 'Sem título'}</h3>
    <p class="autor">${l.autor || 'Desconhecido'}</p>
      </div>
    `).join('');
  } catch (err) {
    console.error('Erro ao buscar livros:', err);
    alert('Erro ao buscar livros. Tente novamente.');
  }
}

// ============================
// Obter detalhes de um livro
// ============================
async function obterLivro(id) {
  try {
    const res = await fetch(`${API}/livros/${id}`);
    const livro = await res.json();
    
    // Criar modal ou seção de detalhes
    const detalhesHTML = `
      <div id="livro-detalhe" class="modal">
        <div class="modal-content">
          <span class="close" onclick="fecharDetalhes()">&times;</span>
          <img src="${urlCapa(livro)}" alt="${livro.titulo}">
          <h2>${livro.titulo}</h2>
          <p><strong>Autor:</strong> ${livro.autor || 'Desconhecido'}</p>
          <p><strong>Categoria:</strong> ${livro.categoria || 'Não informada'}</p>
          <p><strong>Descrição:</strong> ${livro.descricao || 'Sem descrição disponível'}</p>
        </div>
      </div>
    `;
    
  
    const modalAntigo = document.getElementById('livro-detalhe');
    if (modalAntigo) {
      modalAntigo.remove();
    }
    
   
    document.body.insertAdjacentHTML('beforeend', detalhesHTML);
  } catch (err) {
    console.error('Erro ao obter detalhes do livro:', err);
    alert('Erro ao carregar detalhes do livro.');
  }
}

// ============================
// Fechar modal de detalhes
// ============================
function fecharDetalhes() {
  const modal = document.getElementById('livro-detalhe');
  if (modal) {
    modal.remove();
  }
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
    formBusca.addEventListener('submit', async (e) => {
      e.preventDefault();
      const termo = document.getElementById('search-input').value.trim();
      
      if (termo) {
        await buscarLivros(termo);
      } else {
        await carregarDestaques();
      }
    });
  }
});
document.addEventListener("click", async (e) => {
  if (!e.target.classList.contains("fav-btn")) return;

  const usuario = JSON.parse(localStorage.getItem("usuario"));
  if (!usuario) {
    alert("Você precisa estar logado para favoritar livros.");
    window.location.href = "login.html";
    return;
  }

  const idLivro = e.target.dataset.id;

  try {
    const res = await fetch(`${API}/favoritos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idUsuario: usuario.idUsuario,
        idLivro: idLivro
      })
    });

    const data = await res.json();
    alert(data.mensagem || "Livro favoritado!");
  } catch (err) {
    console.error("Erro ao favoritar:", err);
    alert("Erro ao favoritar o livro.");
  }
});

// Tornar funções globais
window.obterLivro = obterLivro;
window.fecharDetalhes = fecharDetalhes;
window.buscarLivros = buscarLivros;