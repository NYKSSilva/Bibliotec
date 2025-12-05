const API = 'http://localhost:3000'

const form = document.getElementById('loginForm')
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = document.getElementById('email').value.trim()
  const senha = document.getElementById('senha').value.trim()

  try {
    const res = await fetch(`${API}/login`, 
      {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.erro || 'Erro ao acessar usuário')

    console.log('Sucesso:', data)
    window.location.href = 'inicio.html' 
  } catch (err) {
    console.error('Erro:', err)
    alert('Erro: ' + err.message )
  }
})