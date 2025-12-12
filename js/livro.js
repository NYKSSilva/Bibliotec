const API = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  if (!id) {
    window.location.href='catalogo.html'
    return;
  }

  try {
    const res = await fetch(`${API}/livros/${id}`);
    if (!res.ok) throw new Error('Livro não encontrado');
    const livro = await res.json();

    const form = document.getElementById('livroForm');
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

    document.getElementById('btn-voltar').addEventListener('click', () => {
      window.location.href = `${paginaAnterior}.html`;
    });
  } catch (err) {
    console.error('Erro ao carregar livro:', err);
  }
});
