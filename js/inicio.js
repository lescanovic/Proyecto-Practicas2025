// Función para verificar la sesión y actualizar el botón de login
function actualizarBotonLogin() {
    const usuarioActual = sessionStorage.getItem('usuarioActual');
    const loginButton = document.querySelector('a[href="./iniciar-sesion.html"]');
    
    if (usuarioActual && loginButton) {
        loginButton.textContent = 'Cerrar Sesión';
        loginButton.href = '#';
        loginButton.addEventListener('click', function(e) {
            e.preventDefault();
            sessionStorage.removeItem('usuarioActual');
            window.location.reload();
        });
    }
}

// JavaScript para submenús
document.addEventListener('DOMContentLoaded', function () {
    // Verificar sesión al cargar la página
    actualizarBotonLogin();
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
let cardsToShow = 4;
let isTransitioning = false;
let totalOriginalCards = 0;

// Función para clonar tarjetas para el efecto infinito
function setupInfiniteCarousel() {
    const track = document.getElementById('carouselTrack');
    const cards = track.querySelectorAll('.worker-card:not(.cloned)');

    if (!track || cards.length === 0) return;

    totalOriginalCards = cards.length;

    // Limpiar clones existentes si los hay
    const existingClones = track.querySelectorAll('.cloned');
    existingClones.forEach(clone => clone.remove());

    // Clonar todas las tarjetas y agregarlas al final
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        clone.classList.add('cloned');
        track.appendChild(clone);
    });

    // Resetear posición
    currentIndex = 0;
    track.style.transform = 'translateX(0px)';
}

// Función para mover el carrusel
function moveCarousel(direction) {
    if (isTransitioning) return;

    const track = document.getElementById('carouselTrack');
    const allCards = track.querySelectorAll('.worker-card');

    if (!track || allCards.length === 0) return;

    isTransitioning = true;

    // Calcular dimensiones
    const cardWidth = allCards[0].offsetWidth;
    const gap = 20;
    const moveDistance = cardWidth + gap;

    // Actualizar índice
    currentIndex += direction;

    // Calcular transformación
    const translateX = -(currentIndex * moveDistance);
    track.style.transform = `translateX(${translateX}px)`;

    // Después de la transición, verificar si necesitamos resetear
    setTimeout(() => {
        // Si llegamos al final de las tarjetas originales
        if (currentIndex >= totalOriginalCards) {
            // Quitar la transición temporalmente
            track.style.transition = 'none';
            currentIndex = 0;
            track.style.transform = 'translateX(0px)';

            // Restaurar la transición después de un frame
            requestAnimationFrame(() => {
                setTimeout(() => {
                    track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    isTransitioning = false;
                }, 50);
            });
        } else if (currentIndex < 0) {
            // Si vamos hacia atrás desde el inicio
            track.style.transition = 'none';
            currentIndex = totalOriginalCards - 1;
            const translateX = -(currentIndex * moveDistance);
            track.style.transform = `translateX(${translateX}px)`;

            requestAnimationFrame(() => {
                setTimeout(() => {
                    track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    isTransitioning = false;
                }, 50);
            });
        } else {
            isTransitioning = false;
        }
    }, 500);
}

// Ajustar cantidad de tarjetas visibles según el tamaño de pantalla
function updateCarouselSettings() {
    const width = window.innerWidth;

    if (width < 480) {
        cardsToShow = 1;
    } else if (width < 768) {
        cardsToShow = 2;
    } else if (width < 1024) {
        cardsToShow = 3;
    } else if (width < 1400) {
        cardsToShow = 4;
    } else {
        cardsToShow = 5;
    }

    // Reset posición al cambiar tamaño
    currentIndex = 0;
    isTransitioning = false;
    const track = document.getElementById('carouselTrack');
    if (track) {
        track.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        track.style.transform = 'translateX(0px)';
    }

    // Reconfigurar el carrusel infinito
    setupInfiniteCarousel();
}

// Navegación con teclado
function handleKeyboardNavigation(e) {
    if (e.key === 'ArrowLeft') {
        moveCarousel(-1);
    } else if (e.key === 'ArrowRight') {
        moveCarousel(1);
    }
}

// Soporte para touch en móviles
let touchStartX = 0;
let touchEndX = 0;

function handleTouchStart(e) {
    touchStartX = e.changedTouches[0].screenX;
}

function handleTouchEnd(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            moveCarousel(1);
        } else {
            moveCarousel(-1);
        }
    }
}

// Inicialización
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(updateCarouselSettings, 250);
});

window.addEventListener('DOMContentLoaded', () => {
    updateCarouselSettings();
    document.addEventListener('keydown', handleKeyboardNavigation);

    const wrapper = document.querySelector('.carousel-wrapper');
    if (wrapper) {
        wrapper.addEventListener('touchstart', handleTouchStart, {
            passive: true
        });
        wrapper.addEventListener('touchend', handleTouchEnd, {
            passive: true
        });
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