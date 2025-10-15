// JavaScript para submenús
document.addEventListener('DOMContentLoaded', function () {
    // Manejar submenús en dispositivos táctiles
    const submenuItems = document.querySelectorAll('.dropdown-submenu');

    submenuItems.forEach(item => {
        const link = item.querySelector('.dropdown-item');
        const submenu = item.querySelector('.dropdown-menu');

        if (link && submenu) {
            link.addEventListener('click', function (e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
                }
            });
        }
    });

    // Cerrar submenús al hacer clic fuera
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.dropdown')) {
            submenuItems.forEach(item => {
                const submenu = item.querySelector('.dropdown-menu');
                if (submenu) {
                    submenu.style.display = 'none';
                }
            });
        }
    });
});

// Funcionalidad de búsqueda
function buscarServicio(query) {
    // Aquí irá la lógica de búsqueda
    console.log('Buscando:', query);
}

// Event listener para el formulario de búsqueda
document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const query = this.querySelector('input[type="search"]').value;
    if (query.trim()) {
        buscarServicio(query);
    }
});

// Carrusel Empleados
