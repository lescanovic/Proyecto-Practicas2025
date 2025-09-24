document.addEventListener('DOMContentLoaded', function () {
    // Selecciona todos los dropdowns que tienen submenú
    document.querySelectorAll('.dropdown-submenu .dropdown-toggle').forEach(function (element) {
        element.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            let submenu = this.nextElementSibling;

            if (submenu) {
                // 1. Cierra todos los submenús hermanos
                let parentMenu = this.closest('.dropdown-menu');
                parentMenu.querySelectorAll('.dropdown-menu.show').forEach(function (openSubmenu) {
                    if (openSubmenu !== submenu) {
                        openSubmenu.classList.remove('show');
                    }
                });

                // 2. Alterna el submenú clickeado
                submenu.classList.toggle('show');
            }
        });
    });

    // Cierra todos los submenús al cerrar el dropdown principal
    document.querySelectorAll('.dropdown').forEach(function (dropdown) {
        dropdown.addEventListener('hidden.bs.dropdown', function () {
            this.querySelectorAll('.dropdown-menu.show').forEach(function (submenu) {
                submenu.classList.remove('show');
            });
        });
    });
});
