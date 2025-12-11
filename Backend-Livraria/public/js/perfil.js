
const API = 'http://localhost:3000'

async function carregarPerfil() {
  const raw = localStorage.getItem('usuario')
  let usuario = raw ? JSON.parse(raw) : null

  if (!usuario) {
    alert('Usuário não autenticado.')
    window.location.href = 'login.html'
    return
  }

  // tenta sincronizar com backend (prioridade)
  try {
    const res = await fetch(`${API}/usuario/${usuario.idUsuario}`)
    if (res.ok) usuario = await res.json()
  } catch (err) {
    console.warn('Sem conexão, usando cache')
  }

  // preenche inputs com dados (seja do backend ou cache)
  document.getElementById('nome').value = usuario.nome || ''
  document.getElementById('email').value = usuario.email || ''
  document.getElementById('matricula').value = usuario.matricula || ''
  document.getElementById('curso').value = usuario.curso || ''
}

document.addEventListener('DOMContentLoaded', carregarPerfil)

{/* <img class="user-avatar" src="${usuario.avatar || 'public/img/placeholder.png'}" alt="Avatar"></img> */}

document.addEventListener('DOMContentLoaded', carregarPerfil)
