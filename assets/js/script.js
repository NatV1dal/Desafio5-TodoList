// Arreglo tareas
let tareas = [
    { id: Date.now(), descripcion: 'Ir de compras', completado: false },
    { id: Date.now() + 1, descripcion: 'Estudiar para la prueba', completado: false },
    { id: Date.now() + 2, descripcion: 'Sacar a pasear a Danna', completado: false }
];

const btnAgregar = document.getElementById("btnAgregar");
const inputTarea = document.getElementById("total-input");
const listaDeTareas = document.getElementById("listaDeTareas");

const totalTareasSpan = document.getElementById("total-tareas"); 
const realizadasTareasSpan = document.getElementById("realizadas-tareas"); 

// actulizar contadores
function actualizarContadores() {
    const totalTareas = tareas.length; 
    const tareasCompletadas = tareas.filter(tarea => tarea.completado).length; 
    //html
    totalTareasSpan.textContent = totalTareas; 
    realizadasTareasSpan.textContent = tareasCompletadas; 
}

// mostrar lista de tareas
function actualizarListaTareas() {
    let html = ""; 

    // encabezados
    html += `
    <div class="tarea-header">
        <div class="tarea-id">ID</div>
        <div class="tarea-desc">Tarea</div>
    </div>
    `;

    for (let tarea of tareas) {
        html += `
        <li class="tarea-item">
            <div class="tarea-id">${tarea.id}</div>
            <div class="tarea-desc ${tarea.completado ? 'realizada' : ''}">${tarea.descripcion}</div>
            <input type="checkbox" class="checkbox-completado" ${tarea.completado ? 'checked' : ''} onclick="completarTarea(${tarea.id})">
            <button class="btn-eliminar" onclick="eliminarTarea(${tarea.id})">&times;</button>
        </li>`;
    }
    
    listaDeTareas.innerHTML = html;

    actualizarContadores(); 
}


// agregar nueva tarea
btnAgregar.addEventListener("click", () => {
    const descripcionTarea = inputTarea.value.trim();

    // Verificar input
    if (descripcionTarea) {
        const nuevaTarea = {
            id: Date.now(),
            descripcion: descripcionTarea,
            completado: false
        };

        // Agregar tarea
        tareas.push(nuevaTarea);

        // Limpiar input
        inputTarea.value = '';

        actualizarListaTareas();
    } else {
        alert('Ingresa una tarea ;)');
    }
});

// eliminar tarea por ID
function eliminarTarea(id) {
    tareas = tareas.filter(tarea => tarea.id !== id);
    actualizarListaTareas(); 
}

// Marcar checkbox
function completarTarea(id) {
    const tarea = tareas.find(t => t.id === id); 
    if (tarea) {
        tarea.completado = !tarea.completado; 
        actualizarListaTareas(); 
    }
}

// Mostrar lista inicial
document.addEventListener('DOMContentLoaded', actualizarListaTareas);
