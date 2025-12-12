const API = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  if (!id) {
    alert('ID do livro não fornecido');
    return;
  }

  try {
    const res = await fetch(`${API}/livros/${id}`);
    if (!res.ok) throw new Error('Livro não encontrado');
    const livro = await res.json();

    // Preencher a página com os dados do livro
    const form = document.getElementById('livroForm');
    form.innerHTML = `
      <div class="livro-detalhes">
        <img src="${livro.imagemUrl || 'public/img/placeholder.png'}" alt="${livro.titulo}" style="max-width: 200px;">
        <h2>${livro.titulo}</h2>
        <p><strong>Autor:</strong> ${livro.autor}</p>
        <p><strong>Gênero:</strong> ${livro.genero || 'N/A'}</p>
        <p><strong>Editora:</strong> ${livro.editora || 'N/A'}</p>
        <p><strong>Ano:</strong> ${livro.ano_publicacao || 'N/A'}</p>
        <p><strong>Sinopse:</strong> ${livro.sinopse || 'N/A'}</p>
        <p><strong>Formato:</strong> ${livro.formato || 'N/A'}</p>
        <p><strong>Ativo:</strong> ${livro.ativo ? 'Sim' : 'Não'}</p>
      </div>
    `;
  } catch (err) {
    console.error('Erro ao carregar livro:', err);
    // alert('Erro ao carregar detalhes do livro');
  }
});
