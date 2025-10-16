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

// Variables del carrusel
let currentIndex = 0;
let cardsToShow = 3;

// Función para mover el carrusel
function moveCarousel(direction) {
    const track = document.getElementById('carouselTrack');
    const cards = document.querySelectorAll('.worker-card');

    if (!track || cards.length === 0) return;

    // Obtener ancho real de la tarjeta + gap
    const cardStyle = window.getComputedStyle(cards[0]);
    const cardWidth = cards[0].offsetWidth;
    const gap = 20; // gap definido en CSS
    const moveDistance = cardWidth + gap;

    // Calcular nuevo índice
    currentIndex += direction;

    // Calcular límites
    const maxIndex = cards.length - cardsToShow;

    // Limitar el índice
    if (currentIndex < 0) {
        currentIndex = 0;
    } else if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }

    // Aplicar transformación
    const translateX = -(currentIndex * moveDistance);
    track.style.transform = `translateX(${translateX}px)`;
}

// Ajustar cantidad de tarjetas visibles según el tamaño de pantalla
function updateCarouselSettings() {
    const width = window.innerWidth;

    if (width < 768) {
        cardsToShow = 1;
    } else if (width < 1024) {
        cardsToShow = 2;
    } else {
        cardsToShow = 3;
    }

    // Reset posición al cambiar tamaño
    currentIndex = 0;
    const track = document.getElementById('carouselTrack');
    if (track) {
        track.style.transform = 'translateX(0px)';
    }
}

// Event listeners
window.addEventListener('resize', updateCarouselSettings);
window.addEventListener('DOMContentLoaded', updateCarouselSettings);