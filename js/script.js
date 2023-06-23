let totalSueldos = 0;
const totalSueldosDOM = document.getElementById('totalSueldos');

const form = document.getElementById('form');
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const nombre = event.target.nombreEmpleado.value;
    const valorHora = event.target.valorHora.value;
    const feriados = event.target.feriados.value;
    
    // Calculo sueldo y agrego empleado al DOM
    const sueldo = calcularSueldo(valorHora, feriados);
    agregarEmpleado(nombre, sueldo);

    // Actualizando el valor del total de los sueldos
    totalSueldos = totalSueldos + sueldo;
    totalSueldosDOM.innerText = "Total de sueldos a pagar: $" + totalSueldos;

    // Agrego empleado al registro de empleados
    agregarRegistro(nombre, sueldo)

});

const registro = [];
function agregarRegistro(nombreDelEmpleado, sueldoDelEmpleado){
    registro.push({nombreDelEmpleado, sueldoDelEmpleado});
    localStorage.setItem("Registro", JSON.stringify(registro));
}

/* Cajita donde se van acumulando los empleados */
const empleadosDOM = document.getElementById('empleados');

/* Función que recibe nombre y sueldo de un empleado y lo agrega al DOM (A la 'cajita' con el id 'empleados') */
function agregarEmpleado(nombre, sueldo){
    const empleadoNodo = document.createElement('li');
    empleadoNodo.innerText = `${nombre} - $${sueldo}`; 

    empleadosDOM.appendChild(empleadoNodo);
}  

/* Función que calcula un sueldo, recibe el valorHora y los feriados trabajados. Devuelve el valor del sueldo de una persona */
function calcularSueldo (valorHora, feriados) {
    let totalSueldoMensual = valorHora * 200;
    let feriadoCobraDoble = (valorHora * 8) * feriados;
    let totalSueldo = totalSueldoMensual + feriadoCobraDoble;

    if (feriados == 0) {
        let bono = 5000;
        totalSueldo = totalSueldo + bono;
    } 

    return totalSueldo;
}

const botonLimpiar = document.getElementById("botonLimpiar");
botonLimpiar.addEventListener("click", () => {
    const cajaEmpleados = document.getElementById("empleados")
    cajaEmpleados.innerHTML = '';
    totalSueldosDOM.innerHTML = '';
})

