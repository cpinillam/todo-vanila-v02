const formulario = document.getElementById('formulario')
const listaTareas = document.getElementById('lista-tareas')
let tareas = [
    {
        id: 1,
        texto: 'texto',
        estado: true
    },
    {
        id: 2,
        texto: 'texto',
        estado: false
    }
  
]

document.addEventListener('DOMContentLoaded', () => {
    pintarTareas()
})

listaTareas.addEventListener('click', (e) => {btnAccion(e)})

formulario.addEventListener('submit', e => {
    e.preventDefault()
    setTarea(e)
})

const setTarea = e => {
    const texto = e.target.querySelector('input').value
    
    if (texto.trim() === '') {
        console.log('está vacio')
        return
    }
    const tarea = {
        id: Date.now(),
        texto: texto,
        estado: false
    }
    
    tareas[tarea.id] = tarea
    pintarTareas()

    formulario.reset()
    e.target.querySelector('input').focus()
}

const pintarTareas = () => {
    

  if (tareas.length === 0) {
        listaTareas.innerHTML = `
        <div class="alert alert-dark text-center">
        Sin tareas pendientes 😍
        </div>
         `
        return
    } 
    
    listaTareas.innerHTML = ''
    tareas.forEach((tarea)=>{

        listaTareas.innerHTML += `
        <div class="alert ${tarea.estado ? 'alert-primary': 'alert-warning'} d-flex justify-content-between align-items-center">
        <p class="m-0">${tarea.texto}</p>
        <h3 class="m-0">
            <i class="fas ${tarea.estado ? 'fa-undo-alt': 'fa-check-circle text-success'} " role="button"></i>
            <i class="fas fa-minus-circle text-danger"  role="button"></i>
        </h3>
    </div>
    `
    })

}



const btnAccion = e => {
    // console.log(e.target.classList.contains('fa-check-circle'))
    if (e.target.classList.contains('fa-check-circle')) {
        tareas[e.target.dataset.id].estado = true
        pintarTareas()
    }

    if (e.target.classList.contains('fa-minus-circle')) {
        // console.log(e.target.dataset.id)
        delete tareas[e.target.dataset.id]
        pintarTareas()
    }

    if (e.target.classList.contains('fa-undo-alt')) {
        tareas[e.target.dataset.id].estado = false
        pintarTareas()
    }

    e.stopPropagation()
}