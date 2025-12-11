const API = "http://localhost:3000";

function urlCapa(livro) {
    const campo = livro.imagemUrl || livro.caminho_capa || livro.imagem || livro.capa || livro.arquivo;

    if (!campo || campo.trim() === "") return "/img/placeholder.png";

    if (campo.startsWith("http") || campo.startsWith("//")) return campo;

    if (campo.startsWith("/")) return campo;

    return `/capas/${campo}`;
}

document.addEventListener("DOMContentLoaded", async () => {
    const usuarioRaw = localStorage.getItem("usuario");

    if (!usuarioRaw) {
        window.location.href = "login.html";
        return;
    }

    const usuario = JSON.parse(usuarioRaw);

    // Exibir nome no header
    const divInfo = document.getElementById("user-info");
    if (divInfo) {
        divInfo.textContent = `Olá, ${usuario.nome}`;
    }

    // Preenche dados do perfil
    document.getElementById("nome").value = usuario.nome;
    document.getElementById("email").value = usuario.email;
    document.getElementById("matricula").value = usuario.matricula || "Não informado";
    document.getElementById("curso").value = usuario.curso || "Não informado";

    // Carregar favoritos
    carregarFavoritos(usuario.idUsuario);
});

async function carregarFavoritos(idUsuario) {
    try {
        const res = await fetch(`${API}/favoritos/${idUsuario}`);
        const favoritos = await res.json();

        const container = document.getElementById("lista-favoritos");

        if (favoritos.length === 0) {
            container.innerHTML = `<p style="text-align:center; color:#555;">Nenhum favorito ainda.</p>`;
            return;
        }

        container.innerHTML = favoritos.map(fav => `
            <div class="favorito-card">
                <img src="${urlCapa(fav)}" alt="${fav.titulo}">
                <h3>${fav.titulo}</h3>
                <p class="autor">${fav.autor || "Autor desconhecido"}</p>
                <button class="btn-remover" data-id="${fav.idFavorito}">
                    Remover Favorito
                </button>
            </div>
        `).join("");

        // EVENTO DE REMOVER
        container.addEventListener("click", async (e) => {
            if (e.target.classList.contains("btn-remover")) {
                const idFavorito = e.target.dataset.id;

                await fetch(`${API}/favoritos/${idFavorito}`, {
                    method: "DELETE"
                });

                carregarFavoritos(idUsuario);
            }
        });

    } catch (err) {
        console.error("Erro ao carregar favoritos:", err);
    }
}
