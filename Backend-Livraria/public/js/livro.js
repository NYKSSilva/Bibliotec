const API = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) {
        window.location.href = 'catalogo.html';
        return;
    }


    try {
        const res = await fetch(`${API}/livros/${id}`);
        if (!res.ok) throw new Error('Livro não encontrado');
        const livro = await res.json();

        const container = document.getElementById('livroForm');
        container.innerHTML = `
      <div class="livro-detalhes">
        <img src="${livro.imagemUrl || livro.caminho_capa || '/img/placeholder.png'}" alt="${livro.titulo}" style="max-width: 200px;">
        <h2>${livro.titulo}</h2>
        <p><strong>Autor:</strong> ${livro.autor}</p>
        <p><strong>Gênero:</strong> ${livro.genero || 'N/A'}</p>
        <p><strong>Editora:</strong> ${livro.editora || 'N/A'}</p>
        <p><strong>Ano:</strong> ${livro.ano_publicacao || 'N/A'}</p>
        <p><strong>Sinopse:</strong> ${livro.sinopse || 'N/A'}</p>
        <p><strong>Formato:</strong> ${livro.formato || 'N/A'}</p>
        <p><strong>Ativo:</strong> ${livro.ativo ? 'Sim' : 'Não'}</p>
        <button id="btn-voltar" onclick="window.location.href='catalogo.html'">Voltar</button>
        <button id="btn-reservar">Reservar</button>
      </div>
    `;
    } catch (err) {
        console.error('Erro ao carregar livro:', err);
        alert('Erro ao carregar detalhes do livro');
        window.location.href = 'catalogo.html';
    }
});
