async function carregarLivros(termo = '') {
    const url = termo ? `${API}/livros/buscar?busca=${encodeURIComponent(termo)}` : `${API}/livros`;
    try {
        const resposta = await fetch(url);
        const livros = await resposta.json();
        const container = document.querySelector('.livros');
        if (!container) return;

        container.innerHTML = '';

        if (!livros || livros.length === 0) {
            container.innerHTML = '<p style="text-align:center; color:#666;">Nenhum livro encontrado.</p>';
            return;
        }

        livros.forEach(livro => {
            const div = document.createElement('div');
            div.className = 'livro-item';
            div.innerHTML = `
                <img src="${urlCapa(livro)}" alt="${livro.titulo || 'Capa'}">
                <h3 class="titulo">${livro.titulo || 'Sem título'}</h3>
                <p class="autor">${livro.autor || 'Desconhecido'}</p>
            `;
            container.appendChild(div);
        });
    } catch (err) {
        console.error('Erro ao carregar livros:', err);
    }
}
