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

function validateForm(formData) {
    const errors = [];
    
    // Validar DNI (8 dígitos)
    if (formData.get('dni').length !== 8) {
        errors.push('El DNI debe tener 8 dígitos');
    }

    // Validar edad (mayor de 18 años)
    const birthDate = new Date(formData.get('birthdate'));
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (age < 18 || (age === 18 && monthDiff < 0)) {
        errors.push('Debes ser mayor de 18 años');
    }

    // Validar teléfono (mínimo 10 dígitos)
    const phone = formData.get('phone').replace(/\D/g, '');
    if (phone.length < 10) {
        errors.push('El teléfono debe tener al menos 10 dígitos');
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.get('email'))) {
        errors.push('El correo electrónico no es válido');
    }

    // Validar que haya seleccionado una especialidad
    if (!formData.get('specialty')) {
        errors.push('Debe seleccionar una especialidad');
    }

    return errors;
}

function handleSubmit(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const errors = validateForm(formData);

    if (errors.length > 0) {
        alert('Por favor, corrige los siguientes errores:\n\n' + errors.join('\n'));
        return;
    }

    // Crear objeto con los datos del formulario
    const workerData = {
        fullname: formData.get('fullname'),
        dni: formData.get('dni'),
        birthdate: formData.get('birthdate'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        specialty: formData.get('specialty'),
        experience: formData.get('experience') || 0,
        description: formData.get('description'),
        certificate: document.getElementById('certificate-name').textContent,
        cv: document.getElementById('cv-name').textContent,
        submissionDate: new Date().toISOString()
    };

    // Obtener trabajadores existentes o inicializar array
    let workers = JSON.parse(localStorage.getItem('workers') || '[]');
    
    // Verificar si el DNI o email ya está registrado
    const isDuplicate = workers.some(worker => 
        worker.dni === workerData.dni || worker.email === workerData.email
    );

    if (isDuplicate) {
        alert('Ya existe una postulación con este DNI o correo electrónico');
        return;
    }

    // Agregar nuevo trabajador
    workers.push(workerData);
    
    // Guardar en localStorage
    localStorage.setItem('workers', JSON.stringify(workers));

    // Mostrar mensaje de éxito
    alert('¡Gracias por tu postulación! Te contactaremos pronto para continuar con el proceso.');
    
    // Reiniciar el formulario
    form.reset();
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

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, ingresa un correo electrónico válido');
        return;
    }

    // Obtener suscriptores existentes o inicializar array
    let subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');

    // Verificar si el email ya está suscrito
    if (subscribers.includes(email)) {
        alert('Este correo electrónico ya está suscrito a nuestro newsletter');
        return;
    }

    // Agregar nuevo suscriptor
    subscribers.push(email);
    localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));

    // Mostrar mensaje de éxito y limpiar input
    alert('¡Gracias por suscribirte! Te mantendremos informado sobre las últimas novedades.');
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