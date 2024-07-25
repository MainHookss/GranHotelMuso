import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { auth } from './firebase.js';
import { showMessage } from './showMessage.js';


const signupForm = document.querySelector('#signup-form')

signupForm.addEventListener('submit', async(e) => {

    e.preventDefault()

    const nombre = signupForm['registerNombre'].value
    const apellidos = signupForm['registerApellidos'].value
    const email = signupForm['registerEmail'].value
    const telefono = signupForm['registerTelefono'].value
    const contrasena = signupForm['registerPassword'].value

    // Manejo de errores
    try {
        const usuario = await createUserWithEmailAndPassword(auth, email, contrasena)
        console.log(usuario)
        console.log(usuario.user.email)

        // Cierra la ventana de registro
        const contenedor = document.getElementById('login-register-container')
        contenedor.style.display = 'none'
        
        showMessage('Bienvenido' + ' ' + nombre + ' ' + apellidos)


    } catch (error) {

        if (error.code === 'auth/invalid-email'){
            showMessage('El correo electrónico no es válido', 'error')
        } else if (error.code === 'auth/weak-password'){
            showMessage('La contraseña debe tener al menos 6 caracteres', 'error')
        } else if (error.code === 'auth/email-already-in-use'){
            showMessage('El correo electrónico ya está en uso', 'error')
        } else if (error.code){
            showMessage('Error al registrar el usuario', 'error')
        }
    }
})
