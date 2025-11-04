const hoje = new Date()
const eventos = document.querySelectorAll('#Eventos li')

eventos.forEach(evento => {
    const dataEvento = new Date(evento.getAttribute('date-date'))
    if (dataEvento > hoje){
        evento.classList.add('proximo-evento')
    }
})

