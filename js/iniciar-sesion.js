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