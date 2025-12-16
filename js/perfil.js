const API = "http://localhost:3000";

function urlCapa(livro) {
    const campo =  livro.caminho_capa 

    if (!campo || campo.trim() === "") return "public/img/placeholder.png";

    if (campo.startsWith("https") || campo.startsWith("//")) return campo;

    if (campo.startsWith("/")) return campo;

    return `/capas/${campo}`;
}

// 
document.addEventListener("DOMContentLoaded", () => {

      const usuarioRaw = localStorage.getItem("usuario");
      if (!usuarioRaw) {
        window.location.href = "login.html";
        return;
      }

      const usuario = JSON.parse(usuarioRaw);

     
      // Preenche header
      const divInfo = document.getElementById("user-info");
      divInfo.textContent = `Olá, ${usuario.nome}`;

      // Preenche formulário
      document.getElementById("nome").value = usuario.nome;
      document.getElementById("email").value = usuario.email;
      document.getElementById("matricula").value = usuario.matricula || "Não informado";
      document.getElementById("curso").value = usuario.curso || " ";

      // Clique do botão
      document.getElementById("btn-favoritos").addEventListener("click", () => {
        carregarFavoritos(usuario.idUsuario);
      });

    });

    async function carregarFavoritos(idUsuario) {
      const lista = document.getElementById("lista-favoritos");
      lista.innerHTML = "<p>Carregando...</p>";

      try {
        const res = await fetch(`${API}/favoritos/${idUsuario}`);
        const dados = await res.json();

        if (!Array.isArray(dados) || dados.length === 0) {
          lista.innerHTML = "<p>Nenhum favorito ainda.</p>";
          return;
        }

        lista.innerHTML = dados
          .map(livro => `
          <div class="favorito-item">
            <img src="${urlCapa(livro)}" width="80">
            <p>${livro.titulo}</p>
          </div>
        `)
          .join("");

      } catch (erro) {
        lista.innerHTML = "<p>Erro ao carregar favoritos.</p>";
        console.error(erro);
      }
    }