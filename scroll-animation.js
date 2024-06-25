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

    // Function to observe element with a delay
    const observeElement = (element, delay) => {
        setTimeout(() => observer.observe(element), delay);
    };

    const images = Array.from(document.querySelectorAll('img'));
    let imagesToLoad = images.length;

    const imageLoadHandler = () => {
        imagesToLoad--;
        if (imagesToLoad === 0) {
            // Apply a staggered delay for each element's observation
            let delay = 0;
            elements.forEach((element) => {
                observeElement(element, delay);
                delay += 200; // Increment the delay for the next element
            });
        }
    };

    images.forEach(img => {
        if (img.complete) {
            imageLoadHandler(); // If image is already loaded
        } else {
            img.addEventListener('load', imageLoadHandler, { once: true });
            img.addEventListener('error', imageLoadHandler, { once: true }); // Handle load error
        }
    });

    // If there are no images, observe all elements immediately but with a staggered delay
    if (images.length === 0) {
        let delay = 0;
        elements.forEach((element) => {
            observeElement(element, delay);
            delay += 200; // Increment the delay for each element
        });
    }
});
