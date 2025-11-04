
// Función para verificar si un usuario ya existe
function usuarioExiste(username, email) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuarios.some(user => 
        user.username.toLowerCase() === username.toLowerCase() || 
        user.email.toLowerCase() === email.toLowerCase()
    );
}

// Función para validar el formato del email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Función para validar la contraseña
function validarPassword(password) {
    // Al menos 8 caracteres, una mayúscula, una minúscula y un número
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
}

// Función principal de registro
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Validaciones
        if (!username || !email || !password) {
            alert('Por favor, complete todos los campos');
            return;
        }
        
        if (!validarEmail(email)) {
            alert('Por favor, ingrese un email válido');
            return;
        }
        
        if (!validarPassword(password)) {
            alert('La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número');
            return;
        }
        
        if (usuarioExiste(username, email)) {
            alert('El nombre de usuario o email ya está registrado');
            return;
        }
        
        // Si pasa todas las validaciones, guardar el usuario
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const nuevoUsuario = {
            username,
            email,
            password: btoa(password) // Codificación básica de la contraseña
        };
        
        usuarios.push(nuevoUsuario);
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        alert('¡Registro exitoso!');
        window.location.href = 'iniciar-sesion.html'; // Redirigir a inicio de sesión
    });
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
