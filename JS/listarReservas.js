import { getReservas, eliminar } from './firebase.js'
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { showMessage } from './showMessage.js';

const auth = getAuth();
let currentUserEmail = null;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        currentUserEmail = user.email;

        // Ahora que tenemos el currentUserEmail, obtenemos las reservas
        const querySnapshot = await getReservas();
        const tbody = document.querySelector('.mis-reservas-tabla tbody');
        
        querySnapshot.forEach(doc => {
            const reserva = doc.data();
            
            // Filtramos solo las reservas que pertenecen al currentUserEmail
            if (reserva.currentUserEmail === currentUserEmail) {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${reserva.currentUserEmail}</td>
                    <td>${reserva.habitacion}</td>
                    <td>${reserva.fecha_entrada}</td>
                    <td>${reserva.fecha_salida}</td>
                    <td>${reserva.ocupacion}</td>
                    <td><button class="cancelar-reserva" data-id="${doc.id}" data-bs-toggle="modal" data-bs-target="#reservaModal">Eliminar</button></td>
                `;

                tbody.appendChild(row);

                // Añadir event listener al botón de cancelar
                const cancelBtn = row.querySelector('.cancelar-reserva');
                cancelBtn.addEventListener('click', () => {
                    const reservaId = cancelBtn.getAttribute('data-id');
                    document.getElementById('reservaId').value = reservaId;
                });
            }
        });
    } else {
        console.log('No user is signed in.');
    }
});

// Confirmar eliminación de reserva
document.getElementById('confirmarReserva').addEventListener('click', async () => {
    const reservaId = document.getElementById('reservaId').value;
    if (reservaId) {
        await eliminar(reservaId);
        document.querySelector(`button[data-id="${reservaId}"]`).closest('tr').remove(); // Eliminar la fila de la tabla
        console.log(`Reserva con ID ${reservaId} eliminada`);
        // Cerrar el modal
        const modal = bootstrap.Modal.getInstance(document.getElementById('reservaModal'));
        modal.hide();
        showMessage('Reserva eliminada con éxito');
    }
});
