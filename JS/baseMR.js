//Se quita la funcion del fixed header

// CONTENEDOR DEL LOGIN/REGISTER
document.addEventListener("DOMContentLoaded", function() {
    // Ocultar el contenedor al cargar la página
    var container = document.getElementById("login-register-container");
    container.style.display = "none";

    // Mostrar el contenedor al hacer clic en "Inicio de sesión"
    document.getElementById("login-button").addEventListener("click", function(event) {
        event.preventDefault();
        if (container.style.display === "none" || container.style.display === "") {
            container.style.display = "block";
            showLoginTab();
        } else {
            container.style.display = "none";
        }

    });

    // Cambiar entre los tabs de login y registro al hacer clic en los respectivos botones
    document.getElementById("login-tab").addEventListener("click", function(event) {
        event.preventDefault();
        activateTab("login");
    });

    document.getElementById("register-tab").addEventListener("click", function(event) {
        event.preventDefault();
        activateTab("register");
    });

    // Para cerrar el contenedor al hacer clic fuera de él
    document.addEventListener("click", function(event) {
        if (!container.contains(event.target) && !document.getElementById("login-button").contains(event.target)) {
            container.style.display = "none";
        }
    });

    // Evitar que el contenedor se cierre al hacer clic dentro de él
    container.addEventListener("click", function(event) {
        event.stopPropagation();
    });

    function activateTab(tabName) {
        var loginTab = document.getElementById("login-tab");
        var registerTab = document.getElementById("register-tab");
        var login = document.getElementById("login");
        var register = document.getElementById("register");

        if (tabName === "login") {
            loginTab.classList.add("active");
            registerTab.classList.remove("active");
            login.classList.add("show", "active");
            register.classList.remove("show", "active");
        } else if (tabName === "register") {
            loginTab.classList.remove("active");
            registerTab.classList.add("active");
            login.classList.remove("show", "active");
            register.classList.add("show", "active");
        }
    }

    function showLoginTab() {
        activateTab("login");
    }
});




