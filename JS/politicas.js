
document.addEventListener('DOMContentLoaded', () => {

    // Mostrar modal de politicas de privacidad

    document.getElementById('politicasLink').addEventListener('click', (e) => {
        e.preventDefault();

        const modal = new bootstrap.Modal(document.getElementById('politicasModal'));
        modal.show();
        
    });

    

});