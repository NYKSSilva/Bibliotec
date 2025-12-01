const API = 'http://localhost:3000'

async function carregarLivros(){
    try {
        const resposta = await fetch(`${API}/livros`)
        const livros = await resposta.json()
        console.log('Livros carregados:', livros)

        const container = document.querySelector('.livros')
        container.innerHTML = '' 
        
        top4.forEach(livro => {
            const div = document.createElement('div')
            div.className = 'livro-item'
            div.innerHTML = `
                <img class="id${livro.idLivro}" src="${livro.caminho_capa}" alt="">`
            container.appendChild(div)
        })
    } catch (error) {
        console.error('Erro ao carregar livros:', error)
    }
}
document.addEventListener('DOMContentLoaded', carregarLivros)