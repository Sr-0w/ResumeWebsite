document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('.article-image, .text-next-to-image, p, h2');
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;
    let lastAnimationTime = Date.now(); // Initialize last animation time

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const currentTime = Date.now();
                const timeSinceLastAnimation = currentTime - lastAnimationTime;
                const delay = Math.max(5000 - timeSinceLastAnimation, 0); // Ensure minimum delay of 5 seconds

                setTimeout(() => {
                    entry.target.classList.add('visible');
                    lastAnimationTime = Date.now(); // Update the time of the last animation
                }, delay);

                observer.unobserve(entry.target); // Unobserve after setting the timeout to make visible
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });

    const imageLoaded = () => {
        loadedImages++;
        if (loadedImages === totalImages) {
            elements.forEach(element => observer.observe(element)); // Start observing elements after all images are loaded
        }
    };

    if (totalImages === 0) {
        elements.forEach(element => observer.observe(element)); // If no images, observe elements immediately
    } else {
        images.forEach(img => {
            if (img.complete) {
                imageLoaded(); // If image is already loaded
            } else {
                img.addEventListener('load', imageLoaded, { once: true });
                img.addEventListener('error', imageLoaded, { once: true }); // Also count errors as "loaded"
            }
        });
    }
});
