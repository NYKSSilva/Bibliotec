document.addEventListener("DOMContentLoaded", () => {
    const usuarioRaw = localStorage.getItem("usuario");

    if (!usuarioRaw) {
        // Se não estiver logado, manda para o login
        window.location.href = "login.html";
        return;
    }

    const usuario = JSON.parse(usuarioRaw);

    // Exibir nome no header
    const divInfo = document.getElementById("user-info");
    if (divInfo) {
        divInfo.textContent = `Olá, ${usuario.nome}`;
    }
});
