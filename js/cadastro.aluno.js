const API = 'http://localhost:3000'

const form = document.getElementById('CadastroForm')
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const nome = document.getElementById('nome').value.trim() 
  const cpf = document.getElementById('cpf').value.trim() 
  const email = document.getElementById('email').value.trim()
  const matricula = document.getElementById('matricula').value.trim()
  const curso = document.getElementById('curso').value.trim()
  const celular = document.getElementById('celular').value.trim()
  const senha = document.getElementById('senha').value.trim()
  const data_nascimento = document.getElementById('data_nascimento').value.trim()
  const perfil = document.getElementById('perfil').value.trim()

  if (!email.endsWith('@aluno.senai.br')|| !email.endsWith('@funcionario.senai.br')) {
    alert('Apenas usuarios com email @aluno.senai.br ou @funcionario.senai.br')
    return
  }

  try {
    const res = await fetch(`${API}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, cpf, email, matricula, curso, celular, senha, data_nascimento, perfil })
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.erro || data.message || 'Erro')

    alert(data.mensagem || 'Cadastro realizado com sucesso!')
    window.location.href = 'perfilAdm.html'
  } catch (err) {
    console.error(err)
    alert('Erro: ' + err.message)
  }
})