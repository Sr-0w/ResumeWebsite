document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1
    });

    // Select all elements that need the animation
    const elements = document.querySelectorAll('.article-image, .text-next-to-image, p, h2');

    let delay = 0; // Start with no delay
    const delayedVisibility = (element, delay) => {
        setTimeout(() => {
            observer.observe(element);
        }, delay);
    };

    const images = document.querySelectorAll('img');
    const checkImagesLoaded = () => {
        return Array.from(images).every(img => img.complete || img.naturalHeight !== 0);
    };

    const observeElementsWithDelay = () => {
        elements.forEach(element => {
            delayedVisibility(element, delay);
            delay += 5000; // Increment delay for each element by 5000ms (5 seconds)
        });
    };

    if (checkImagesLoaded()) {
        observeElementsWithDelay();
    } else {
        // Listen for the load event on each image, then check again
        Array.from(images).forEach(img => {
            img.addEventListener('load', () => {
                if (checkImagesLoaded()) {
                    observeElementsWithDelay();
                }
            });
            img.addEventListener('error', () => {
                if (checkImagesLoaded()) {
                    observeElementsWithDelay();
                }
            });
        });
    }
});
