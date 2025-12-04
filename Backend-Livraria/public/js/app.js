const API = 'http://localhost:3000';

// ============================
// Eventos da página
// ============================
const hoje = new Date();
const eventos = document.querySelectorAll('#Eventos li');
eventos.forEach(evento => {
    const dataEvento = new Date(evento.getAttribute('data-date'));
    if (dataEvento > hoje) {
        evento.classList.add('proximo-evento');
    }
});

// ============================
// Carregar todos os livros
// ============================
async function carregarLivros() {
    try {
        const resposta = await fetch(`${API}/livros`); // ✅ Corrigido
        const livros = await resposta.json();
        console.log('Livros carregados:', livros);
        exibirLivros(livros);
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
    }
}

// ============================
// Buscar livros por nome/autor
// ============================
async function buscarLivros(termoBusca) {
    try {
        const resposta = await fetch(`${API}/livros?nome=${encodeURIComponent(termoBusca)}`);
        const livros = await resposta.json();
        console.log('Resultados da busca:', livros);
        exibirLivros(livros);
        
        if (livros.length === 0) {
            alert('Nenhum livro encontrado!');
        }
    } catch (error) {
        console.error('Erro ao buscar livros:', error);
        alert('Erro ao buscar livros!');
    }
}

// ============================
// Exibir livros na tela
// ============================
function exibirLivros(livros) {
    const container = document.getElementById('livros-container');
    if (!container) return;
    
    container.innerHTML = ''; // Limpa os livros anteriores
    
    livros.forEach(livro => {
        const divLivro = document.createElement('div');
        divLivro.className = 'livro';
        divLivro.innerHTML = `
           img.src = livro.caminho_capa;
            <h3>${livro.titulo}</h3>
            <p>${livro.autor}</p>
            <button onclick="obterLivro(${livro.idLivro})">Ver Detalhes</button>
        `;
        container.appendChild(divLivro);
    });
}

// ============================
// Obter detalhes de um livro
// ============================
async function obterLivro(id) {
    try {
        const resposta = await fetch(`${API}/livros/${id}`);
        const livro = await resposta.json();
        
        const detalhe = document.getElementById('livro-detalhe');
        detalhe.innerHTML = `
            <div class="detail-panel">
                <button onclick="fecharDetalhes()">✖ Fechar</button>
                <h2>${livro.titulo}</h2>
                <p><strong>Autor:</strong> ${livro.autor}</p>
                <p><strong>Descrição:</strong> ${livro.descricao}</p>
                <p><strong>Disponível:</strong> ${livro.disponivel ? 'Sim' : 'Não'}</p>
            </div>
        `;
        detalhe.classList.remove('hidden');
    } catch (error) {
        console.error('Erro ao obter livro:', error);
    }
}

function fecharDetalhes() {
    document.getElementById('livro-detalhe').classList.add('hidden');
}

// ============================
// Configurar formulário de busca
// ============================
document.addEventListener('DOMContentLoaded', () => {
    carregarLivros(); // Carrega livros ao abrir a página
    
    // Captura o formulário de busca
    const formBusca = document.querySelector('form[action="#"]');
    if (formBusca) {
        formBusca.addEventListener('submit', (e) => {
            e.preventDefault(); // Impede recarregar a página
            
            const inputBusca = document.getElementById('search-input');
            const termoBusca = inputBusca.value.trim();
            
            if (termoBusca) {
                buscarLivros(termoBusca);
            } else {
                carregarLivros(); // Se vazio, mostra todos
            }
        });
    }
});

// Torna a função global para uso no HTML
window.obterLivro = obterLivro;
<img src="${l.imagemUrl}" alt="${l.titulo}" onerror="this.src='/img/placeholder.png'"></img>