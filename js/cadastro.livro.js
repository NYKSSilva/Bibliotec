const API = 'http://localhost:3000'

const form = document.getElementById('CadastroForm')
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const titulo = document.getElementById('titulo').value.trim() 
  const autor = document.getElementById('autor').value.trim() 
  const genero = document.getElementById('genero').value.trim()
  const editora = document.getElementById('editora').value.trim()
  const isbn_10 = document.getElementById('isbn_10').value.trim()
  const isbn_13 = document.getElementById('isbn_13').value.trim()
  const idioma = document.getElementById('idioma').value.trim()
  const formato = document.getElementById('formato').value.trim()
  const caminho_capa = document.getElementById('caminho_capa').value.trim()
  const sinopse = document.getElementById('sinopse').value.trim()
  const ativo = document.getElementById('ativo').value.trim()
  const ano_publicacao = document.getElementById('ano_publicacao').value.trim()

  try {
    const res = await fetch(`${API}/livros`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, autor, genero, editora, ano_publicacao, isbn_10, isbn_13, idioma, formato, caminho_capa, sinopse, ativo })
    })

    const data = await res.json()
    if (!res.ok) throw new Error(data.erro || data.message || 'Erro')

    alert(data.mensagem || 'Novo livro cadastrado com sucesso!')
    window.location.href = 'catalogoAdm.html'
  } catch (err) {
    console.error(err)
    alert('Erro: ' + err.message)
  }
})