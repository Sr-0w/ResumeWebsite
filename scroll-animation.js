document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });

    // Select all elements that need the animation
    const elements = document.querySelectorAll('.article-image, .text-next-to-image, p, h2');
    
    // Function to observe element
    const observeElement = (element) => {
        observer.observe(element);
    };

    elements.forEach(element => {
        if (element.tagName === 'IMG') {
            if (element.complete) {
                observeElement(element); // If image is already loaded
            } else {
                element.addEventListener('load', () => observeElement(element), { once: true });
                element.addEventListener('error', () => observeElement(element), { once: true }); // In case the image fails to load
            }
        } else {
            observeElement(element);
        }
    });
});
