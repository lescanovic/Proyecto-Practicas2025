// Función para verificar la sesión y actualizar el botón de login
function actualizarBotonLogin() {
    const usuarioActual = sessionStorage.getItem('usuarioActual');
    const loginButton = document.querySelector('a[href="./iniciar-sesion.html"]');
    
    if (usuarioActual && loginButton) {
        const usuario = JSON.parse(usuarioActual);
        loginButton.textContent = 'Cerrar Sesión';
        loginButton.href = '#';
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            const usuario = JSON.parse(usuarioActual);
            alert(`¡Hasta pronto, ${usuario.username}! Has cerrado sesión correctamente.`);
            sessionStorage.removeItem('usuarioActual');
            window.location.href = 'inicio.html';
        });
    }
}

// Ejecutar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    actualizarBotonLogin();
});