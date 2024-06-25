document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adding visible class with a delay after the element is intersecting
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 5000); // 5-second delay before making each element visible
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });

    // Select all elements that need the animation
    const elements = document.querySelectorAll('.article-image, .text-next-to-image, p, h2');

    const images = Array.from(document.querySelectorAll('img'));
    let imagesToLoad = images.length;

    const imageLoadHandler = () => {
        imagesToLoad--;
        if (imagesToLoad === 0) {
            // Start observing all elements after all images have loaded
            elements.forEach(element => {
                observer.observe(element);
            });
        }
    };

    images.forEach(img => {
        if (img.complete) {
            imageLoadHandler(); // If image is already loaded
        } else {
            img.addEventListener('load', imageLoadHandler, { once: true });
            img.addEventListener('error', imageLoadHandler, { once: true }); // Also consider it "loaded" on error
        }
    });

    // If there are no images, just observe all elements immediately
    if (images.length === 0) {
        elements.forEach(element => {
            observer.observe(element);
        });
    }
});
