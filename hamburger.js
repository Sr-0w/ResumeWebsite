document.addEventListener("DOMContentLoaded", function() {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const mobileNav = document.querySelector('.mobile-nav');

    hamburgerIcon.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileNav.classList.toggle('visible');
    });
});
