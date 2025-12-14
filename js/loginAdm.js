const API = 'http://localhost:3000'

const form = document.getElementById('loginForm')
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.getElementById('email').value.trim()
  const senha = document.getElementById('senha').value.trim()

   if (!email.endsWith('@funcionario.senai.br')) {
    alert('Apenas alunos com email @funcionario.senai.br')
    return
  }

  try {
    const res = await fetch(`${API}/login`, 
      {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.erro || 'Erro ao acessar usuário')

      const usuario = data.usuario || data.user || data.usuarioLogado || null
    if (usuario) localStorage.setItem('usuario', JSON.stringify(usuario))
    if (data.token) localStorage.setItem('token', data.token)
      
    console.log('Sucesso:', data)
    window.location.href = 'inicioAdm.html' 
  } catch (err) {
    console.error('Erro:', err)
    alert('Erro: ' + err.message )
  }
})