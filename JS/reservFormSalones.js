import {showMessage} from './showMessage.js'
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { saveConsulta, saveReserva } from './firebase.js'

// Inicializa la autenticación 
const auth = getAuth();
let currentUserEmail = null;

// Verifica si el usuario está autenticado
onAuthStateChanged(auth, (user) => {

    if (user){
        currentUserEmail = user.email;
    } else {
        currentUserEmail = null;
    }

})


//! SALONES
// Manejo del formulario de reserva de salones
const reservFormSalones = document.querySelector('#reserve-form-salones');
reservFormSalones.addEventListener('submit', async(e) => {

    e.preventDefault();

    const fecha_entrada = reservFormSalones['fecha_entrada'].value;
    const fecha_salida = reservFormSalones['fecha_salida'].value;
    const ocupacion = reservFormSalones['ocupacion'].value;

    // Validaciones de usuario autenticado
    if (!currentUserEmail){
        showMessage('Por favor inicie sesión para reservar', 'error');
        return;
    }

    // Validaciones de fecha de entrada, fecha de salida y ocupación
    const fechaEntrada = new Date(fecha_entrada);
    const fechaSalida = new Date(fecha_salida);
    const hoy = new Date();

    if (fechaEntrada < hoy){
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
        showMessage('Mostrando salones disponibles');
    }

    // Guarda los datos de la reserva en cloud firestore
    await saveConsulta({
        fecha_entrada,
        fecha_salida,
        ocupacion,
        currentUserEmail
    });

    // Mostrar salones
    

    // Guarda los datos en la URL para mostrarlos en la página de salones
    const params = new URLSearchParams({
        fecha_entrada,
        fecha_salida,
        ocupacion
    });

    // Redirige a la página de salones con los parámetros de la reserva

    window.location.href = `salones.html?${params.toString()}`;

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

