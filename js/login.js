document.addEventListener('DOMContentLoaded', function() { // Esperar a que el DOM esté cargado para evitar errores
    const form = document.querySelector('form'); // Seleccionar el formulario del registrarse.html
    
    form.addEventListener('submit', function(e) { // Agregar un listener para el evento submit del formulario
        e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
        
        const usernameOrEmail = document.getElementById('username').value; // Obtengo el valor del input username
        const password = document.getElementById('password').value; // Obtengo el valor del input password
        
        // Validar que los campos no estén vacíos
        if (!usernameOrEmail || !password) { //si algún campo está vacío pide que lo complete
            alert('Por favor, complete todos los campos');
            return;
        }
        
        // Obtengo los usuarios que ya estan registrados desde localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; 
        

        //esta seccion busca en el array de usuarios si coincide el username o email y la contraseña y lo guarda todo en "usuario"
        const usuario = usuarios.find(user => 
            //tolowercase para que no importe mayusculas o minusculas
            (user.username.toLowerCase() === usernameOrEmail.toLowerCase() || 
             user.email.toLowerCase() === usernameOrEmail.toLowerCase()) && 
            btoa(password) === user.password
        );
        
        //si usuario existe
        if (usuario) {
            // Guardar la sesión del usuario
            sessionStorage.setItem('usuarioActual', JSON.stringify({
                username: usuario.username,
                email: usuario.email
            }));
            
            alert('¡Inicio de sesión exitoso!'); //muestra un mensaje de exito
            window.location.href = 'inicio.html'; // Redirigir al inicio
        } else {
            alert('Usuario o contraseña incorrectos'); //sino, muestra error
        }
    });
});
