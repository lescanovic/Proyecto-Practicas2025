// Función para verificar si el usuario está logueado
function verificarSesion() {
    const usuarioActual = sessionStorage.getItem('usuarioActual');
    if (usuarioActual) {
        window.location.href = 'inicio.html'; // Si ya está logueado, redirigir a inicio
    }
}

// Función principal de inicio de sesión
document.addEventListener('DOMContentLoaded', function() { //esta atento a que el DOM esté cargado
    // Verificar si ya hay una sesión activa
    verificarSesion();
    
    const form = document.querySelector('form'); //busca el formulario en iniciar-sesion.html
    
    form.addEventListener('submit', function(e) { //cuando se envie el formulario va ejecutar la funcion
        e.preventDefault(); //prevenir el comportamiento por defecto
        
        const usernameOrEmail = document.getElementById('username').value; //obtengo el valor del input username
        const password = document.getElementById('password').value; //obtengo el valor del input password
        
        // Validar que los campos no estén vacíos
        if (!usernameOrEmail || !password) { 
            alert('Por favor, complete todos los campos');
            return;
        }
        
        // Obtener usuarios registrados desde locarlStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; 
        
        // Buscar el usuario
        const usuario = usuarios.find(user => 
            (user.username.toLowerCase() === usernameOrEmail.toLowerCase() || 
             user.email.toLowerCase() === usernameOrEmail.toLowerCase()) && 
            btoa(password) === user.password
        );
        
        if (usuario) {
            // Guardar la sesión del usuario
            sessionStorage.setItem('usuarioActual', JSON.stringify({ //guarda en sessionStorage el usuario actual (sessionStorage se borra al cerrar el navegador)
                username: usuario.username,
                email: usuario.email
            }));
            
            alert('¡Inicio de sesión exitoso!'); //muestra un mensaje de exito
            window.location.href = 'inicio.html'; // Redirigir al inicio
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });
});

// Seccion para poner mi email y suscribirme al newsletter
function handleNewsletter(e) { // Función para manejar la suscripción al newsletter
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const input = e.target.querySelector('input'); // Obtener el input de correo electrónico
    const email = input.value; // Obtener el valor del input y lo guarda en la variable email

    alert(`¡Gracias por suscribirte! Te mantendremos informado sobre los mejores profesionales en ${email}`); // Mostrar una alerta de agradecimiento
    input.value = ''; // Limpiar el campo de entrada
}

// busca el formulario de newsletter y le agrega un listener para el evento submit
document.querySelectorAll('.footer-links a').forEach(link => { // Selecciona todos los enlaces en el pie de página
    link.addEventListener('click', (e) => { // Agrega un evento de clic a cada enlace
        e.preventDefault(); // Prevenir el comportamiento por defecto
    });
});


document.querySelectorAll('.social-icons a').forEach(icon => { // Selecciona todos los iconos sociales
    icon.addEventListener('mouseenter', function () { // Al pasar el ratón por encima 
        this.style.transform = 'translateY(-5px) rotate(360deg)'; // Aplica una transformación CSS
    });

    icon.addEventListener('mouseleave', function () { // Al quitar el ratón
        this.style.transform = 'translateY(0) rotate(0deg)';// Vuelve a la posición original
    });
});