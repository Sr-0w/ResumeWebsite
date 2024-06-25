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

    const observeElement = (element) => {
        observer.observe(element);
    };

    // Array to hold all the image elements
    const images = Array.from(document.querySelectorAll('img'));
    let imagesToLoad = images.length;

    const imageLoadHandler = () => {
        imagesToLoad--;
        if (imagesToLoad === 0) {
            // Start observing all elements once all images have loaded
            elements.forEach(observeElement);
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

    // If there are no images, just observe all elements immediately
    if (images.length === 0) {
        elements.forEach(observeElement);
    }
});
