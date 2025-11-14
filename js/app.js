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
        console.log('Livros carregados:', livros)
    } catch (error) {
        console.error('Erro ao carregar livros:', error)
    }
}

document.addEventListener('DOMContentLoaded', carregarLivros)