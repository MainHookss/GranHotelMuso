import { signOut } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { auth } from './firebase.js';
import { showMessage } from "./showMessage.js";

const logout = document.querySelector('#cerrarSesion')

logout.addEventListener('click', async() =>{
    await signOut(auth)
    console.log('Sesión cerrada')
    showMessage('Sesión cerrada de forma exitosa')

    setTimeout(() => {
        window.location.href = 'index.html'
    }, 2000)
})