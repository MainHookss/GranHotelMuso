import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { auth } from './firebase.js';
import { showMessage } from './showMessage.js'


const signInForm = document.querySelector('#signin-form');

signInForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const email = signInForm['loginEmail'].value;
    const password = signInForm['loginPassword'].value;

    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password)
        console.log(credentials);

        // Cierra la ventana de login
        const contenedor = document.getElementById('login-register-container')
        contenedor.style.display = 'none'


        showMessage('Bienvenido' + ' ' + credentials.user.email)

    } catch (error) {
        if (error.code === 'auth/invalid-login-credentials') {
            showMessage('Email o contraseña incorrectos', 'error')
        } else if(error.code === 'auth/too-many-requests'){
            showMessage('Demasiados intentos fallidos, intente más tarde', 'error')
        } else{
            showMessage(error.message, 'error')
        }
        console.log(error);

    }
});


