function showSection(type) {
    // Ocultar todas las secciones
    const clienteSection = document.getElementById('cliente-section');
    const trabajadorSection = document.getElementById('trabajador-section');

    // Remover clase active de todos los botones
    const buttons = document.querySelectorAll('.btn-switch');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Mostrar la sección correspondiente
    if (type === 'cliente') {
        clienteSection.classList.add('active');
        trabajadorSection.classList.remove('active');
        buttons[0].classList.add('active');
    } else {
        clienteSection.classList.remove('active');
        trabajadorSection.classList.add('active');
        buttons[1].classList.add('active');
    }
}

// Verificar si hay un hash en la URL al cargar la página
window.addEventListener('DOMContentLoaded', function () {
    const hash = window.location.hash;

    if (hash === '#trabajador') {
        showSection('trabajador');
    } else {
        // Por defecto mostrar cliente
        showSection('cliente');
    }
});

// FOOTER
function handleNewsletter(e) {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const email = input.value;

    alert(`¡Gracias por suscribirte! Te mantendremos informado sobre los mejores profesionales en ${email}`);
    input.value = '';
}

// Smooth animations for links
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Add your routing logic here
    });
});

// Social icons rotation animation
document.querySelectorAll('.social-icons a').forEach(icon => {
    icon.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px) rotate(360deg)';
    });

    icon.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});