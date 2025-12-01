// EVENTOS FUTUROS
const hoje = new Date();
document.querySelectorAll("#Eventos li").forEach(li => {
    const data = new Date(li.dataset.date);
    if (data > hoje) li.classList.add("proximo-evento");
});

// MOSTRAR DETALHES DO LIVRO
async function obterLivro(idLivro) {
    try {
        const resposta = await fetch(`/livros/${idLivro}`);
        const livro = await resposta.json();

        document.getElementById("livro-detalhe").innerHTML = `
            <div class="detalhe-card">
                <h2>${livro.titulo}</h2>
                <p><strong>Autor:</strong> ${livro.autor}</p>
                <p>${livro.descricao}</p>
            </div>
        `;
    } catch (err) {
        console.error("Erro ao obter livro:", err);
    }
}

// CARREGAR LISTA DE LIVROS
async function carregarLivros() {
    try {
        const resposta = await fetch("/livros");
        const livros = await resposta.json();

        const container = document.getElementById("livros-container");
        container.innerHTML = "";

        livros.forEach(livro => {
            container.innerHTML += `
                <div class="livro">
                    <img src="${livro.capa}" onclick="obterLivro(${livro.idLivro})">
                </div>
            `;
        });

    } catch (err) {
        console.error("Erro ao carregar livros:", err);
    }
}

document.addEventListener("DOMContentLoaded", carregarLivros);
