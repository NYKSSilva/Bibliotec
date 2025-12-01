const API = 'http://localhost:3000'

const hoje = new Date()
const eventos = document.querySelectorAll('#Eventos li')

eventos.forEach(evento => {
    const dataEvento = new Date(evento.getAttribute('data-date'))
    if (dataEvento > hoje){
        evento.classList.add('proximo-evento')
    }
})

// async function carregarLivros(){
//     try {
//         const resposta = await fetch(`${API}/livros`)
//         const livros = await resposta.json()
//         console.log('Livros carregados:', livros)
        
//           const top4 = livros
//             .sort((a, b) => (b.favoritos || 0) - (a.favoritos || 0))
//             .slice(0, 4)

//         const container = document.querySelector('.livros')
//         container.innerHTML = '' 
        
//         top4.forEach(livro => {
//             const div = document.createElement('div')
//             div.className = 'livro-item'
//             div.innerHTML = `
//                 <img class="id${livro.id}" src="${livro.caminho_capa}" alt="">`
//             container.appendChild(div)
//         })
//     } catch (error) {
//         console.error('Erro ao carregar livros:', error)
//     }
// }
// document.addEventListener('DOMContentLoaded', carregarLivros)

