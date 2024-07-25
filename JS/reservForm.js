import {showMessage} from './showMessage.js'
import { saveConsulta, getHabDisp, saveReserva, getReservas } from './firebase.js'
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";




// Inicializa la autenticación 
const auth = getAuth();
let currentUserEmail = null;

// Verifica si el usuario está autenticado
onAuthStateChanged(auth, (user) => {

    if (user){
        currentUserEmail = user.email;
        console.log('Usuario autenticado:'+ ' ' + currentUserEmail);
    } else {
        currentUserEmail = null;
        console.log('Usuario no autenticado');
    }

})

//! HABITACIONES
// Manejo del formulario de reserva de habitaciones
const reservForm = document.querySelector('#reserve-form');
reservForm.addEventListener('submit', async(e) => {

    e.preventDefault();

    const fecha_entrada = reservForm['fecha_entrada'].value;
    const fecha_salida = reservForm['fecha_salida'].value;
    const ocupacion = reservForm['ocupacion'].value;

    // Validaciones de usuario autenticado
    if (!currentUserEmail){
        showMessage('Por favor inicie sesión para reservar', 'error');
        return;
    }

    // Validaciones de fecha de entrada, fecha de salida y ocupación
    const fechaEntrada = new Date(fecha_entrada);
    const fechaSalida = new Date(fecha_salida);
    const hoy = new Date();

    const fechaEntrada_n = fechaEntrada.toISOString().split('T')[0];
    const fechaSalida_n = fechaSalida.toISOString().split('T')[0];
    const hoy_n = hoy.toISOString().split('T')[0];

    console.log('Fecha entrada: ', fechaEntrada_n);
    console.log('Fecha salida: ', fechaSalida_n);
    console.log('Hoy: ', hoy_n);

    console.log(fechaEntrada_n < hoy_n);

    if (fechaEntrada_n < hoy_n ){
        showMessage('La fecha de entrada no puede ser anterior a hoy', 'error');
        return;
    } else if (fechaSalida < fechaEntrada){
        showMessage('La fecha de salida no puede ser anterior a la fecha de entrada', 'error');
        return;
    } else if (ocupacion < 1){
        showMessage('La ocupación mínima es de 1 persona', 'error');
        return;
    } else if (ocupacion > 10){
        showMessage('La ocupación máxima es de 10 personas', 'error');
        return;
    } else {
        showMessage('Mostrando habitaciones disponibles');
    }

    // Guarda los datos de la reserva en cloud firestore
    await saveConsulta({
        fecha_entrada,
        fecha_salida,
        ocupacion,
        currentUserEmail
    });

    // Mostrar habitaciones 


    // Guarda los datos en la URL para mostrarlos en la página de habitaciones
    const params = new URLSearchParams({
        fecha_entrada,
        fecha_salida,
        ocupacion
    });

    // Redirige a la página de habitaciones con los parámetros de la reserva
    window.location.href = `habitaciones.html?${params.toString()}`;

});


// Mostrar los datos de la reserva en los campos del formulario principal y fixed
document.addEventListener('DOMContentLoaded', () => {
    // Obtener los parámetros de la URL
    const params = new URLSearchParams(window.location.search);
    const fechaEntradaInput = document.querySelector('#fecha_entrada');
    const fechaSalidaInput = document.querySelector('#fecha_salida');
    const ocupacionInput = document.querySelector('#ocupacion');
    const fechaEntradaInputFixed = document.querySelector('#fixed #fecha_entrada_f');
    const fechaSalidaInputFixed = document.querySelector('#fixed #fecha_salida_f');
    const ocupacionInputFixed = document.querySelector('#fixed #ocupacion_f');

    fechaEntradaInput.value = params.get('fecha_entrada') || '';
    fechaSalidaInput.value = params.get('fecha_salida') || '';
    ocupacionInput.value = params.get('ocupacion') || '';
    fechaEntradaInputFixed.value = params.get('fecha_entrada') || '';
    fechaSalidaInputFixed.value = params.get('fecha_salida') || '';
    ocupacionInputFixed.value = params.get('ocupacion') || '';
});

// Reservar habitación
document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los botones con la clase 'btn-reservar'
    const reservarBtns = document.querySelectorAll('.btn-reservar');
    
    reservarBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();

            // Obtener los parámetros de la URL
            const params = new URLSearchParams(window.location.search);
            const fecha_entrada = params.get('fecha_entrada');
            const fecha_salida = params.get('fecha_salida');
            const ocupacion = params.get('ocupacion');

            // Obtener el valor de la habitación desde el atributo 'data-habitacion'
            const habitacion = btn.getAttribute('data-habitacion');

            // Obtener el elemento <h5> asociado con el botón de reserva
            const roomItem = btn.closest('.room-item');
            const roomTitle = roomItem.querySelector('h5').textContent;

            // Mostrar el modal de reserva
            document.getElementById('modalHabitacionValue').textContent = roomTitle;
            document.getElementById('modalFechaEntrada').textContent = fecha_entrada;
            document.getElementById('modalFechaSalida').textContent = fecha_salida;
            document.getElementById('modalOcupacion').textContent = ocupacion;

            // Validar usuario autenticado
            if (!currentUserEmail){
                showMessage('Por favor inicie sesión para reservar', 'error');
                return;
            }

            // Validar si hay fechas ingresadas
            if (!fecha_entrada || !fecha_salida || !ocupacion){
                showMessage('Por favor ingrese las fechas de entrada, salida y la ocupación', 'error');
                return;
            }

            // Mostrar el modal
            const modal = new bootstrap.Modal(document.getElementById('reservaModal'));
            modal.show();

        });
    });
});

// guardar datos de la reserva en cloud firestore

const reservFinal = document.querySelector('#confirmarReserva');
reservFinal.addEventListener('click', async (e) =>{
    
    e.preventDefault();

    const params = new URLSearchParams(window.location.search);
    const fecha_entrada = params.get('fecha_entrada');
    const fecha_salida = params.get('fecha_salida');
    const ocupacion = params.get('ocupacion');

    const habitacion = document.getElementById('modalHabitacionValue').textContent;
    const currentUserEmail = auth.currentUser.email;

    await saveReserva({
        fecha_entrada,
        fecha_salida,
        ocupacion,
        habitacion,
        currentUserEmail
    });

    showMessage('Reserva guardada con éxito', 'success');

    // Cerrar el modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('reservaModal'));
    modal.hide();
});
