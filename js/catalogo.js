const API = 'http://localhost:3000'

async function carregarLivros(){
    try {
        const resposta = await fetch(`${API}/livros`)
        const livros = await resposta.json()
        console.log('Livros carregados:', livros)
        
        const container = document.querySelector('.livros')
        container.innerHTML = '' 
        
        livros.forEach(livro => {
            const div = document.createElement('div')
            div.className = 'livro-item'
            div.innerHTML = `
                <img src="${livro.imagem}" alt="${livro.titulo}">
                <h3>${livro.titulo}</h3>
                <p>${livro.autor}</p>
                <p>R$ ${livro.preco}</p>
            `
            container.appendChild(div)
        })
    } catch (error) {
        console.error('Erro ao carregar livros:', error)
    }
}
document.addEventListener('DOMContentLoaded', carregarLivros)