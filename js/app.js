const API = 'http://localhost:3000'

const hoje = new Date()
const eventos = document.querySelectorAll('#Eventos li')

eventos.forEach(evento => {
    const dataEvento = new Date(evento.getAttribute('data-date'))
    if (dataEvento > hoje){
        evento.classList.add('proximo-evento')
    }
})

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
            carregarLivros(livros)
        } catch (error) {
            console.error('Erro na pesquisa:', error)
            alert('Erro ao pesquisar: ' + error.message)
        }
    })
}

document.addEventListener('DOMContentLoaded', carregarLivros)

