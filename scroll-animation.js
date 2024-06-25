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

    const observeElement = (element, delay) => {
        setTimeout(() => observer.observe(element), delay);
    };

    // Array to hold all the image elements
    const images = Array.from(document.querySelectorAll('img'));
    let imagesToLoad = images.length;

    const imageLoadHandler = () => {
        imagesToLoad--;
        if (imagesToLoad === 0) {
            // Start observing all elements once all images have loaded, with a delay between observations
            elements.forEach((element, index) => {
                observeElement(element, index * 1000); // Delay increased by 200ms for each element
            });
        }
    };

    images.forEach(img => {
        if (img.complete) {
            imageLoadHandler(); // Check if the image is already loaded
        } else {
            img.addEventListener('load', imageLoadHandler, { once: true });
            img.addEventListener('error', imageLoadHandler, { once: true }); // Also consider it "loaded" on error
        }
    });

    // If there are no images, just observe all elements immediately with a delay
    if (images.length === 0) {
        elements.forEach((element, index) => {
            observeElement(element, index * 1000); // Delay increased by 200ms for each element
        });
    }
});
