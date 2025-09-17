document.addEventListener('DOMContentLoaded', function () {
    // Selecciona todos los dropdowns que tienen submenú
    document.querySelectorAll('.dropdown-submenu .dropdown-toggle').forEach(function (element) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            let submenu = this.nextElementSibling;
            if (submenu) {
                submenu.classList.toggle('show');
            }
        });
    });

    // Cierra submenús al cerrar el dropdown principal
    document.querySelectorAll('.dropdown').forEach(function (dropdown) {
        dropdown.addEventListener('hidden.bs.dropdown', function () {
            this.querySelectorAll('.dropdown-menu.show').forEach(function (submenu) {
                submenu.classList.remove('show');
            });
        });
    });
});

function scrollLeft() {
  document.querySelector('.empleados-carousel').scrollBy({ left: -300, behavior: 'smooth' });
}

function scrollRight() {
  document.querySelector('.empleados-carousel').scrollBy({ left: 300, behavior: 'smooth' });
}