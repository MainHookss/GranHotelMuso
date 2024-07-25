////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Función para desplazamiento GALERIA
document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('contenedor-galeria');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let scrollInterval;

    // Función para desplazamiento continuo
    function startScroll(direction) {
        scrollInterval = setInterval(function() {
            gallery.scrollBy({
                left: direction * 50, // Ajusta la velocidad de desplazamiento aquí
                behavior: 'smooth'
            });
        }, 100); // Intervalo de tiempo ajustable para la velocidad
    }

    // Event listener para mousedown en el botón de siguiente
    nextBtn.addEventListener('mousedown', function() {
        startScroll(1); // Desplazamiento hacia la derecha
    });

    // Event listener para mousedown en el botón de anterior
    prevBtn.addEventListener('mousedown', function() {
        startScroll(-1); // Desplazamiento hacia la izquierda
    });

    // Event listener para mouseup en ambos botones
    document.addEventListener('mouseup', function() {
        clearInterval(scrollInterval); // Detener el desplazamiento al soltar el botón
    });

    // También detenemos el desplazamiento si el mouse sale del área del botón
    nextBtn.addEventListener('mouseleave', function() {
        clearInterval(scrollInterval);
    });

    prevBtn.addEventListener('mouseleave', function() {
        clearInterval(scrollInterval);
    });

    // Event listener para click en el botón de siguiente
    nextBtn.addEventListener('click', function() {
        gallery.scrollBy({
            left: 550, // Ajusta la cantidad de desplazamiento horizontal aquí
            behavior: 'smooth'
        });
    });

    // Event listener para click en el botón de anterior
    prevBtn.addEventListener('click', function() {
        gallery.scrollBy({
            left: -550, // Ajusta la cantidad de desplazamiento horizontal aquí
            behavior: 'smooth'
        });
    });
});
