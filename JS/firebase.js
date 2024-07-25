import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, deleteDoc, doc, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBxvxy_ER2Po3BlKwvFj274srGUTFXXf3I",
    authDomain: "paginahotelmuso.firebaseapp.com",
    projectId: "paginahotelmuso",
    storageBucket: "paginahotelmuso.appspot.com",
    messagingSenderId: "663205488893",
    appId: "1:663205488893:web:b943687e6c4595483e3694"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const saveConsulta = async(v) => {
     await addDoc(collection(db, 'consulta_reserva'), v)
}

export const saveReserva = async(v) => {
     await addDoc(collection(db, 'reservas'), v)
}

export const getHabDisp = () => getDocs(collection(db, 'habitaciones'))

export const getReservas = () => getDocs(collection(db, 'reservas'))

export const eliminar = async(id) => {
    await deleteDoc(doc(db, 'reservas', id))
}


// document.querySelectorAll('.btn-reservar').forEach(button => {
//     button.addEventListener('click', async () => {
//         const habitacionId = button.dataset.habitacion;
//         const docRef = doc(db, 'reservas', habitacionId);
//         try {
//             const docSnap = await getDoc(docRef);
//             if (docSnap.exists()) {
//                 // Si la habitación ya está reservada
//                 alert('La habitación ya está reservada.');
//             } else {
//                 // Si la habitación está disponible, muestra el modal de reserva
//                 document.querySelector('#habitacionId').value = habitacionId;
//                 $('#reservaModal').modal('show'); // Uso de jQuery para mostrar el modal
//             }
//         } catch (error) {
//             console.error('Error al consultar la disponibilidad:', error);
//         }
//     });
// });

// document.querySelector('#reservaForm').addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const habitacionId = document.querySelector('#habitacionId').value;
//     const fechaEntrada = document.querySelector('#fechaEntrada').value;
//     const fechaSalida = document.querySelector('#fechaSalida').value;
//     const ocupacion = document.querySelector('#ocupacion').value;
//     try {
//         const docRef = doc(db, 'reservas', habitacionId);
//         const docSnap = await getDoc(docRef);
     
//         if (docSnap.exists()) {
//             // Si la habitación ya está reservada, no hace nada y muestra un mensaje
//             alert('La habitación ya está reservada. No se puede realizar una nueva reserva.');
//         } else {
//             // Si la habitación está disponible, guarda la reserva
//             await setDoc(docRef, {
//                 fechaEntrada,
//                 fechaSalida,
//                 ocupacion
//             });
//             $('#reservaModal').modal('hide'); // Uso de jQuery para ocultar el modal
//             alert('Reserva realizada con éxito');
//         }
//     } catch (error) {
//         console.error('Error al realizar la reserva:', error);
//     }
// });
    