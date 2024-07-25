import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { auth } from './JS/firebase.js'
import './JS/signupForm.js'
import './JS/signinForm.js'
import './JS/reservForm.js'
import './JS/logout.js'
import './JS/politicas.js'
import {loginCheck} from './JS/loginCheck.js'

onAuthStateChanged(auth, async (user) => {
    loginCheck(user)
    // if (user){
    //     loginCheck(user)
    // } else{
    //     loginCheck(user)
    // }
})