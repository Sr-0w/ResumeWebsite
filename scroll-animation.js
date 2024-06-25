document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('.article-image, .text-next-to-image, p, h2');
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;
    let lastAnimationTime = 0;
    const delayBetweenAnimations = 5000; // 5000 ms or 5 seconds

    // Function to add 'visible' class with a delay based on the last animation time
    const setVisibleWithDelay = (element) => {
        const currentTime = Date.now();
        const timeSinceLastAnimation = currentTime - lastAnimationTime;
        const delay = timeSinceLastAnimation > delayBetweenAnimations ? 0 : delayBetweenAnimations - timeSinceLastAnimation;
        setTimeout(() => {
            element.classList.add('visible');
            lastAnimationTime = Date.now();
        }, delay);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setVisibleWithDelay(entry.target);
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });

    const imageLoaded = () => {
        loadedImages++;
        if (loadedImages === totalImages) {
            // Start observing elements for animation once all images are loaded
            elements.forEach(element => observer.observe(element));
        }
    };

    if (totalImages === 0) {
        // If there are no images, start observing elements immediately
        elements.forEach(element => observer.observe(element));
    } else {
        images.forEach(img => {
            if (img.complete) {
                imageLoaded(); // If some images are already loaded
            } else {
                img.addEventListener('load', imageLoaded, { once: true });
                img.addEventListener('error', imageLoaded, { once: true }); // Count errors as loaded
            }
        });
    }
});
