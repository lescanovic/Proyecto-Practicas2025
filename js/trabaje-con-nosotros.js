function showForm() {
    document.getElementById('info-section').style.display = 'none';
    document.getElementById('benefits-section').style.display = 'none';
    document.getElementById('form-section').classList.add('active');
    window.scrollTo(0, 0);
}

function showInfo() {
    document.getElementById('info-section').style.display = 'block';
    document.getElementById('benefits-section').style.display = 'block';
    document.getElementById('form-section').classList.remove('active');
    window.scrollTo(0, 0);
}

function updateFileName(input, displayId) {
    const display = document.getElementById(displayId);
    if (input.files && input.files[0]) {
        display.textContent = '📎 ' + input.files[0].name;
    } else {
        display.textContent = '';
    }
}

function handleSubmit(event) {
    event.preventDefault();

    // Aquí iría la lógica para enviar el formulario al servidor
    // Por ahora, solo mostramos un mensaje de éxito

    alert('¡Solicitud enviada con éxito! Nos pondremos en contacto contigo pronto.');

    // Reiniciar el formulario
    document.getElementById('workerForm').reset();
    document.getElementById('certificate-name').textContent = '';
    document.getElementById('cv-name').textContent = '';

    // Volver a la vista de información
    showInfo();
}

// Verificar si hay un hash en la URL al cargar la página
window.addEventListener('DOMContentLoaded', function () {
    if (window.location.hash === '#registro') {
        showForm();
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