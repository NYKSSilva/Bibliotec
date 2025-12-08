const API = 'http://localhost:3000'

let todosLivros = []

async function carregarLivros(){
    try {
        const resposta = await fetch(`${API}/livros`)
        const livros = await resposta.json()
        todosLivros = livros
        console.log('Livros carregados:', livros)
        exibirLivros(livros)
    } catch (error) {
        console.error('Erro ao carregar livros:', error)
    }
}

function exibirLivros(livros) {
    const container = document.querySelector('.livros')
    container.innerHTML = '' 
    
    livros.forEach(livro => {
        const div = document.createElement('div')
        div.className = 'livro-item'
        div.innerHTML = `
            <img src="${livro.caminho_capa}" alt="${livro.titulo}">
            <h3>${livro.titulo}</h3>
            <p>${livro.autor}</p>
        `
        container.appendChild(div)
    })
}

const searchForm = document.getElementById('search')
if (searchForm) {
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const titulo = document.getElementById('search-input').value.trim()
        
        if (!titulo) {
            alert('Digite o nome do livro para pesquisar')
            return
        }
        
        try {
            const resposta = await fetch(`${API}/livros?titulo=${encodeURIComponent(titulo)}`)
            const livros = await resposta.json()
            
            if (livros.length === 0) {
                alert('Nenhum livro encontrado com esse título')
                return
            }
            
            console.log('Resultados da pesquisa:', livros)
            exibirLivros(livros)
        } catch (error) {
            console.error('Erro na pesquisa:', error)
            alert('Erro ao pesquisar: ' + error.message)
        }
    })
}

document.querySelectorAll('.menu li').forEach(categoria => {
    categoria.addEventListener('click', (e) => {
        const nomeCategoria = e.target.textContent.trim()
        console.log('Categoria selecionada:', nomeCategoria)
       if (nomeCategoria.toLowerCase() === 'tudo') {
                exibirLivros(todosLivros)
                return
            }
            
            const livrosFiltrados = todosLivros.filter(livro => 
                (livro.categoria && livro.categoria === nomeCategoria) ||
                (livro.genero && livro.genero === nomeCategoria)
            )
        
        exibirLivros(livrosFiltrados.length > 0 ? livrosFiltrados : todosLivros)
    })
})
document.addEventListener('DOMContentLoaded', carregarLivros)