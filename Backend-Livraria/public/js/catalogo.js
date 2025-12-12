const API = 'http://localhost:3000';

let todosLivros = [];

// função reaproveitada do início
function urlCapa(livro) {
    const campo = livro.imagemUrl || livro.caminho_capa || livro.imagem || livro.capa || livro.arquivo;
    if (!campo || campo.trim() === "") return "public/img/placeholder.png";
    if (campo.startsWith("http") || campo.startsWith("//")) return campo;
    if (campo.startsWith("/")) return campo;
    return `/capas/${campo}`;
}

async function carregarLivros() {
    try {
        const resposta = await fetch(`${API}/livros`);
        const livros = await resposta.json();
        todosLivros = livros;
        exibirLivros(livros);
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
    }
}

function exibirLivros(livros) {
    const container = document.querySelector('.livros');
    container.innerHTML = '';

    livros.forEach(livro => {
        const div = document.createElement('div');
        div.className = 'livro-item';
        div.innerHTML = `
            <img src="${urlCapa(livro)}" alt="${livro.titulo}">
            <h3>${livro.titulo}</h3>
            <p>${livro.autor}</p>
        `;
        container.appendChild(div);
    });
}

// 🔥 CORREÇÃO DO FORM
const searchForm = document.getElementById('search-form');   // <-- certo agora

if (searchForm) {
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const termo = document.getElementById('search-input').value.trim();
        if (!termo) {
            exibirLivros(todosLivros);
            return;
        }

        try {
            const resposta = await fetch(`${API}/livros?busca=${encodeURIComponent(termo)}`);  // <-- corrigido
            const livros = await resposta.json();
            exibirLivros(livros.length ? livros : []);
        } catch (error) {
            console.error('Erro na pesquisa:', error);
            alert('Erro ao pesquisar: ' + error.message);
        }
    });
}

function exibirLivros(livros) {
    const container = document.querySelector('.livros')
    container.innerHTML = '' 
    
    livros.forEach(livro => {
        const div = document.createElement('div')
        div.className = 'livro-item'
        div.onclick = () => window.location.href = `livro.html?id=${livro.idLivro}`;
        div.innerHTML = `
            <img src="${livro.caminho_capa}" alt="${livro.titulo}">
            <h3>${livro.titulo}</h3>
            <p>${livro.autor}</p>
        `
        container.appendChild(div)
    })
}


// FILTRO POR CATEGORIA
document.querySelectorAll('.menu li').forEach(categoria => {
    categoria.addEventListener('click', (e) => {
        const nomeCategoria = e.target.textContent.trim();

        if (nomeCategoria.toLowerCase() === 'tudo') {
            exibirLivros(todosLivros);
            return;
        }

        const livrosFiltrados = todosLivros.filter(livro =>
            (livro.categoria && livro.categoria === nomeCategoria) ||
            (livro.genero && livro.genero === nomeCategoria)
        );

        exibirLivros(livrosFiltrados.length > 0 ? livrosFiltrados : []);
    });
});

document.addEventListener('DOMContentLoaded', carregarLivros);
