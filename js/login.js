const API = 'http://localhost:3000'

const form = document.getElementById('loginForm')
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const nome = document.getElementById('nome').value.trim() 
  const email = document.getElementById('email').value.trim()
  const senha = document.getElementById('senha').value.trim()

  try {
    const res = await fetch(`${API}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, senha })
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.erro || data.message || 'Erro')

    window.location.href = 'inicio.html'
  } catch (err) {
    console.error(err)
    alert('Erro: ' + err.message)
  }
})