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

  const search = document.getElementById('search');
  if (search) {
    search.addEventListener('submit', async (e) => {
      e.preventDefault();
      const termo = document.getElementById('search-input').value.trim();
      
      if (termo) {
        await buscarLivros(termo);
      } else {
        await carregarDestaques();
      }
    });
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