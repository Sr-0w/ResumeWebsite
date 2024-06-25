document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll('.article-image, .text-next-to-image, p, h2');
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    const totalImages = images.length;

    // Animation queue to manage delay between animations
    let animationQueue = [];
    let lastAnimationTime = 0;
    const delayBetweenAnimations = 5000; // Delay of 5 seconds

    // Function to process the animation queue
    const processAnimationQueue = () => {
        if (animationQueue.length === 0) return;

        const currentTime = Date.now();
        const timeSinceLastAnimation = currentTime - lastAnimationTime;

        if (timeSinceLastAnimation >= delayBetweenAnimations) {
            const element = animationQueue.shift();
            element.classList.add('visible');
            lastAnimationTime = Date.now();
            setTimeout(processAnimationQueue, delayBetweenAnimations); // Schedule next animation
        } else {
            setTimeout(processAnimationQueue, delayBetweenAnimations - timeSinceLastAnimation); // Wait the remaining time
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target); // Stop observing the element
                animationQueue.push(entry.target); // Add element to the queue
                processAnimationQueue(); // Try processing the queue
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
