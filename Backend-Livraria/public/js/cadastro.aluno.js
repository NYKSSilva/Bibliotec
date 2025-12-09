const API = 'http://localhost:3000'

const form = document.getElementById('CadastroForm')
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const nome = document.getElementById('nome').value.trim() 
  const matricula = document.getElementById('matricula').value.trim()
  const email = document.getElementById('email').value.trim()
  const cpf = document.getElementById('cpf').value.trim()
  const senha = document.getElementById('senha').value.trim()
  const data_nascimento = document.getElementById('data_nascimento').value.trim()
  const celular = document.getElementById('celular').value.trim()
  const curso = document.getElementById('curso').value.trim()
  

   fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome,
            matricula,
            email,
            cpf,
            senha,
            data_nascimento,
            celular,
            curso
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);
        alert("Aluno cadastrado com sucesso!");

         window.location.href = "../inicio.html";
    })
    .catch(err => console.error("Erro:", err));
})