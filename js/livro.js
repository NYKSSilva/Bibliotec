const API = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const form = document.getElementById('livroForm'); 

    if (!id) {
        window.location.href = 'catalogo.html';
        return;
    }

    try {
        const res = await fetch(`${API}/livros/${id}`);
        if (!res.ok) {
            console.error(`Erro: Livro com ID ${id} não encontrado. Status: ${res.status}`);
            throw new Error('Livro não encontrado');
        }
        const livro = await res.json();
       
        form.innerHTML = `
            <div class="livro-detalhes">
                <div class="capa-titulo">
                    <img src="${livro.imagemUrl || 'public/img/placeholder.png'}" alt="${livro.titulo}" style="max-width: 200px;">
                    <h6>${livro.titulo}</h6>
                </div>
                <div class="info">
                    <p class="autor"><strong>Autor:</strong> ${livro.autor}</p>
                    <p class="genero"><strong>Gênero:</strong> ${livro.genero || 'N/A'}</p>
                    <p class="editora"><strong>Editora:</strong> ${livro.editora || 'N/A'}</p>
                    <p class="ano"><strong>Ano:</strong> ${livro.ano_publicacao || 'N/A'}</p>
                    <p class="sinopse"><strong>Sinopse:</strong> ${livro.sinopse || 'N/A'}</p>
                    <p class="formato"><strong>Formato:</strong> ${livro.formato || 'N/A'}</p>
                    <p class="disponivel"><strong>Disponivel:</strong> ${livro.ativo ? 'Sim' : 'Não'}</p>
                </div>
                <div class="botoes">
                    <button id="btn-voltar">Voltar</button>
                    <button id="btn-reservar">Reservar</button>
                </div>
            </div>
        `;
        form.addEventListener('click', (event) => {
            if (event.target.id === 'btn-voltar') {
                event.preventDefault(); 
                
                if (window.history.length > 1) {
                    window.history.back(); 
                } else {
                    window.location.href = 'catalogo.html'; 
                }
            }
            
            if (event.target.id === 'btn-reservar') {
                event.preventDefault();
                alert(`Reservando o livro: ${livro.titulo}`);
            }
        });

    } catch (err) {
        console.error('Erro ao carregar livro:', err);
        form.innerHTML = `<p style="color: red;">Erro ao carregar o livro. ${err.message}. Tente novamente mais tarde.</p>`;
    }
});