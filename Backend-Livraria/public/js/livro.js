 const API = 'http://localhost:3000';

function urlCapa(livro) {
  if (!livro.caminho_capa || livro.caminho_capa.trim() === "") return "/img/placeholder.png";
  if (livro.caminho_capa.startsWith("http") || livro.caminho_capa.startsWith("/")) return livro.caminho_capa;
  return `/capas/${livro.caminho_capa}`;
}

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
  <div class="livro-card">

    <img src="${urlCapa(livro)}" alt="${livro.titulo}" class="capa-livro">

    <div class="info-livro">
      <h2>${livro.titulo}</h2>

      <div class="sinopse">
        ${livro.sinopse || "Sem sinopse disponível."}
      </div>

      <div class="info-grid">
        <p><strong>Autor:</strong> ${livro.autor}</p>
        <p><strong>Gênero:</strong> ${livro.genero || "N/A"}</p>
        <p><strong>Editora:</strong> ${livro.editora || "N/A"}</p>
        <p><strong>Ano:</strong> ${livro.ano_publicacao || "N/A"}</p>
        <p><strong>Formato:</strong> ${livro.formato || "N/A"}</p>
        <p><strong>Status:</strong> ${livro.ativo ? "Disponível" : "Indisponível"}</p>
      </div>

      <div class="acoes">
        <button id="btn-voltar" type="button">Voltar</button>
        <button id="btn-reservar" type="button">Reservar</button>
        <button id="btn-favoritar" type="button">Favoritar ⭐</button>
      </div>

      <div id="mensagem-reserva"></div>
    </div>
  </div>

  <section class="avaliacoes-section">
    <h3>Avaliações</h3>
    <div id="avaliacoes"></div>

    <h4>Adicionar Avaliação</h4>
    <textarea id="comentario" placeholder="Escreva seu comentário"></textarea>

    <div class="avaliar-acoes">
      <select id="nota">
        <option value="1">1 ⭐</option>
        <option value="2">2 ⭐</option>
        <option value="3">3 ⭐</option>
        <option value="4">4 ⭐</option>
        <option value="5">5 ⭐</option>
      </select>

      <button id="btn-avaliar" type="button">Enviar Avaliação</button>
    </div>
  </section>
`;

    document.getElementById("btn-voltar").addEventListener("click", () => {
      window.location.href = "catalogo.html";
    });

    carregarAvaliacoes(id);

    // RESERVAR
    document.getElementById("btn-reservar").addEventListener("click", async (event) => {
      event.preventDefault(); // evita reload da página
      const msg = document.getElementById("mensagem-reserva");
      msg.className = "";
      msg.innerHTML = "";
      const usuarioRaw = localStorage.getItem("usuario");
      if (!usuarioRaw) {
        msg.className = "mensagem-erro";
        msg.textContent = "❌ Você precisa estar logado para reservar.";
        setTimeout(() => window.location.href = "login.html", 1500);
        return;
      }

      const usuario = JSON.parse(usuarioRaw);

      try {
        const resReserva = await fetch(`${API}/reservas`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idUsuario: usuario.idUsuario,
            idLivro: livro.idLivro
          })
        });

        if(livro.ativo == 0 ){
        msg.className = "mensagem-erro";
        msg.textContent = "❌ Erro ao reservar, Livro Indisponível: " + err.message;
        }

        const data = await resReserva.json();
        if (!resReserva.ok) throw new Error(data.erro || "Erro ao reservar livro");

        msg.className = "mensagem-sucesso";
        msg.innerHTML = `
          <strong>📚 Livro reservado com sucesso!</strong><br>
          📅 Retirada: ${new Date(data.dataRetirada).toLocaleDateString()}<br>
          ⏳ Devolução: ${new Date(data.dataDevolucao).toLocaleDateString()}
        `;

        document.getElementById("btn-reservar").disabled = true;

      } catch (err) {
        console.error(err);
        msg.className = "mensagem-erro";
        msg.textContent = "❌ Erro ao reservar: " + err.message;
      }
    });

    // FAVORITAR
    document.getElementById("btn-favoritar").addEventListener("click", async (event) => {
      event.preventDefault();
      const usuarioRaw = localStorage.getItem("usuario");
      if (!usuarioRaw) {
        alert("Você precisa estar logado para favoritar!");
        window.location.href = "login.html";
        return;
      }
      const usuario = JSON.parse(usuarioRaw);

      try {
        const resFav = await fetch(`${API}/favoritos`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idUsuario: usuario.idUsuario,
            idLivro: livro.idLivro
          })
        });
        const data = await resFav.json();
        if (!resFav.ok) throw new Error(data.erro || "Erro ao favoritar");

        alert("⭐ Livro adicionado aos favoritos!");
        window.location.href = "perfil.html";
      } catch (err) {
        console.error("Erro ao favoritar:", err);
        alert("Erro ao favoritar: " + err.message);
      }
    });

    // AVALIAR
    document.getElementById("btn-avaliar").addEventListener("click", async (event) => {
      event.preventDefault();
      const usuarioRaw = localStorage.getItem("usuario");
      if (!usuarioRaw) {
        alert("Você precisa estar logado para avaliar!");
        window.location.href = "login.html";
        return;
      }
      const usuario = JSON.parse(usuarioRaw);
      const nota = document.getElementById("nota").value;
      const comentario = document.getElementById("comentario").value.trim();

      if (!comentario) {
        alert("Digite um comentário antes de enviar!");
        return;
      }

      try {
        const resAval = await fetch(`${API}/avaliacoes`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idUsuario: usuario.idUsuario,
            idLivro: livro.idLivro,
            nota,
            comentario
          })
        });
        const data = await resAval.json();
        if (!resAval.ok) throw new Error(data.erro || "Erro ao enviar avaliação");

        alert("Avaliação enviada com sucesso!");
        document.getElementById("comentario").value = "";
        carregarAvaliacoes(id);
      } catch (err) {
        console.error("Erro ao avaliar:", err);
        alert("Erro ao enviar avaliação: " + err.message);
      }
    });

  } catch (err) {
    console.error("Erro ao carregar livro:", err);
    alert("Erro ao carregar detalhes do livro");
    window.location.href = "catalogo.html";
  }
});

async function carregarAvaliacoes(idLivro) {
  const container = document.getElementById("avaliacoes");
  container.innerHTML = "<p>Carregando avaliações...</p>";

  try {
    const res = await fetch(`${API}/avaliacoes/livro/${idLivro}`);
    if (!res.ok) throw new Error("Não foi possível carregar avaliações");
    const avaliacoes = await res.json();

    if (!avaliacoes.length) {
      container.innerHTML = "<p>Este livro ainda não possui avaliações.</p>";
      return;
    }

    const total = avaliacoes.length;
    const soma = avaliacoes.reduce((acc, a) => acc + Number(a.nota), 0);
    const media = (soma / total).toFixed(1);
    const estrelasMedia = "⭐".repeat(Math.round(media));

    container.innerHTML = `
      <div class="media-avaliacoes">
        <strong>${media}</strong>
        <span>${estrelasMedia}</span>
        <small>(${total} avaliações)</small>
      </div>

      ${avaliacoes.map(a => `
        <div class="avaliacao-item">
          <strong>${a.usuario || "Usuário"}</strong>
          <span>${"⭐".repeat(a.nota)}</span>
          <p>${a.comentario}</p>
        </div>
      `).join("")}
    `;
  } catch (err) {
    console.error("Erro ao carregar avaliações:", err);
    container.innerHTML = "<p>Erro ao carregar avaliações.</p>";
  }
} 