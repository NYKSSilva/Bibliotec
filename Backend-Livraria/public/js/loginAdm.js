const API = 'http://localhost:3000'

const form = document.getElementById('loginForm')
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.getElementById('email').value.trim()
  const senha = document.getElementById('senha').value.trim()

  if (!email.endsWith('@funcionario.senai.br')) {
    alert('Apenas administradores com email @funcionario.senai.br podem acessar')
    return
  }

  try {
    const res = await fetch(`${API}/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    })

    let data
    const contentType = res.headers.get('content-type')
    
    if (contentType && contentType.includes('application/json')) {
      data = await res.json()
    } else {
      const texto = await res.text()
      throw new Error(`Resposta inesperada do servidor: ${texto}`)
    }

    if (!res.ok) throw new Error(data.erro || 'Erro ao logar')

    // 👉 PEGAR USUÁRIO DO BACKEND
    const usuario = data.usuario

    // ❗ SALVAR NO LOCALSTORAGE
    localStorage.setItem('usuario', JSON.stringify(usuario))

    console.log('Admin logado:', usuario)

    // 👉 REDIRECIONAR
    window.location.href = 'inicio.html'

  } catch (err) {
    console.error('Erro:', err)
    alert('Erro: ' + err.message)
  }
})
