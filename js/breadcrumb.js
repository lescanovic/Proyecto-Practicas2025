// breadcrumb.js - Actualiza automáticamente el enlace activo
document.addEventListener('DOMContentLoaded', function () {
    // Obtener la página actual
    const currentPage = window.location.pathname.split('/').pop() || 'inicio.html';

    // Seleccionar todos los enlaces del breadcrumb
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb-custom a');

    // Remover clase active de todos y agregar al actual
    breadcrumbLinks.forEach(link => {
        link.classList.remove('active');

        // Comparar el href del enlace con la página actual
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage ||
            (currentPage === '' && linkPage === 'inicio.html') ||
            (currentPage === 'index.html' && linkPage === 'inicio.html')) {
            link.classList.add('active');
        }
    });
});