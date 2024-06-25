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

    const elements = document.querySelectorAll('.article-image, .text-next-to-image, p, h2');

    const observeElement = (element) => {
        observer.observe(element);
    };

    let images = document.querySelectorAll('img');
    let imagesLoaded = 0;

    const imageLoaded = () => {
        imagesLoaded++;
        if (imagesLoaded === images.length) {
            elements.forEach(element => {
                if (element.tagName !== 'IMG') {
                    observeElement(element);
                }
            });
        }
    };

    images.forEach(img => {
        if (img.complete) {
            imageLoaded(); // Check if image has already loaded
        } else {
            img.addEventListener('load', () => {
                observeElement(img);
                imageLoaded();
            }, { once: true });
            img.addEventListener('error', () => {
                observeElement(img);
                imageLoaded();
            }, { once: true }); // Consider image "loaded" even if there's an error
        }
    });
});
