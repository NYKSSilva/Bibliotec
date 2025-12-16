const API = "http://localhost:3000";

/* ========== GERAR URL DA CAPA ========= */
function urlCapa(livro) {
    if (!livro.caminho_capa || livro.caminho_capa.trim() === "") {
        return "/img/placeholder.png";
    }

    if (
        livro.caminho_capa.startsWith("http") ||
        livro.caminho_capa.startsWith("/")
    ) {
        return livro.caminho_capa;
    }

    return `/capas/${livro.caminho_capa}`;
}

/* ========== ABRIR LIVRO ========= */
function abrirLivro(idLivro) {
    window.location.href = `livro.html?id=${idLivro}`;
}

/* ========== AO CARREGAR A PÁGINA ========= */
document.addEventListener("DOMContentLoaded", () => {
    const usuarioRaw = localStorage.getItem("usuario");

    if (!usuarioRaw) {
        window.location.href = "login.html";
        return;
    }

    const usuario = JSON.parse(usuarioRaw);
    const userId = usuario.id || usuario.idUsuario;

    if (!userId) {
        console.error("ID do usuário não encontrado no localStorage!");
        return;
    }

    /* ===== Preencher dados do usuário ===== */
    document.getElementById("user-info").textContent = `Olá, ${usuario.nome}`;
    document.getElementById("nome").value = usuario.nome;
    document.getElementById("email").value = usuario.email;
    document.getElementById("matricula").value =
        usuario.matricula || "Não informado";
    document.getElementById("curso").value =
        usuario.curso || "Não informado";

    /* ===== Botão Favoritos ===== */
    document
        .getElementById("btn-favoritos")
        .addEventListener("click", () => {
            carregarFavoritos(userId);
        });

    /* ===== Carregar dados ao abrir ===== */
    carregarFavoritos(userId);
    carregarReservas(userId);
});

/* ========== CARREGAR FAVORITOS ========= */
async function carregarFavoritos(idUsuario) {
    const lista = document.getElementById("lista-favoritos");
    lista.innerHTML = "<p>Carregando favoritos...</p>";

    try {
        const res = await fetch(`${API}/favoritos/${idUsuario}`);
        const dados = await res.json();

        if (!Array.isArray(dados) || dados.length === 0) {
            lista.innerHTML = "<p>Nenhum favorito ainda.</p>";
            return;
        }

        // Remove duplicatas
        const livrosUnicos = [];
        const ids = new Set();

        dados.forEach(livro => {
            if (!ids.has(livro.idLivro)) {
                ids.add(livro.idLivro);
                livrosUnicos.push(livro);
            }
        });

        lista.innerHTML = livrosUnicos
            .map(livro => `
                <div class="favorito-item">
                    <img 
                        src="${urlCapa(livro)}"
                        alt="${livro.titulo}"
                        onerror="this.src='/img/placeholder.png'"
                        onclick="abrirLivro(${livro.idLivro})"
                    >
                    <p>${livro.titulo}</p>
                    <button class="btn-coracao" data-id="${livro.idFavorito}">
                        ❤️
                    </button>
                </div>
            `)
            .join("");

        // Desfavoritar
        document.querySelectorAll(".btn-coracao").forEach(btn => {
            btn.addEventListener("click", async (e) => {
                e.stopPropagation();
                const idFavorito = e.currentTarget.dataset.id;
                await desfavoritar(idFavorito);
                carregarFavoritos(idUsuario);
            });
        });

    } catch (erro) {
        lista.innerHTML = "<p>Erro ao carregar favoritos.</p>";
        console.error("Erro na rota favoritos:", erro);
    }
}

/* ========== DESFAVORITAR ========= */
async function desfavoritar(idFavorito) {
    try {
        const res = await fetch(`${API}/favoritos/${idFavorito}`, {
            method: "DELETE"
        });

        const dados = await res.json();

        if (!res.ok) {
            console.error(dados.erro || "Erro ao desfavoritar");
        }
    } catch (erro) {
        console.error("Erro ao desfavoritar:", erro);
    }
}

/* ========== CARREGAR RESERVAS ========= */
async function carregarReservas(idUsuario) {
    const lista = document.getElementById("lista-reservas");
    lista.innerHTML = "<p>Carregando reservas...</p>";

    try {
        const res = await fetch(`${API}/reservas/usuario/${idUsuario}`);
        const dados = await res.json();

        if (!Array.isArray(dados) || dados.length === 0) {
            lista.innerHTML = "<p>Nenhum livro reservado ainda.</p>";
            return;
        }

        // Renderiza cada reserva com capa e título
        lista.innerHTML = dados.map(reserva => `
            <div class="reserva-item">
                <img src="${reserva.caminho_capa || '/img/placeholder.png'}"
                     alt="${reserva.titulo}"
                     onerror="this.src='/img/placeholder.png'"
                     onclick="abrirLivro(${reserva.idLivro})">
                <p>${reserva.titulo}</p>
            </div>
        `).join('');

    } catch (erro) {
        lista.innerHTML = "<p>Erro ao carregar livros reservados.</p>";
        console.error("Erro na rota reservas:", erro);
    }
}
