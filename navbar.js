document.addEventListener("DOMContentLoaded", function() {
    const nav = document.querySelector('nav');
    const pill = document.createElement('div');
    pill.className = 'nav-pill';
    nav.appendChild(pill);
    
    // Initial positioning of the pill based on the selected button
    const activeButton = document.querySelector('.nav-buttons-selected');
    let originalSelectedButton = activeButton;
    if (activeButton) {
        setPillPosition(activeButton);
    }
    
    // Handle hover events to temporarily change selected button
    const navButtons = document.querySelectorAll('.nav-buttons, .nav-buttons-selected');

    navButtons.forEach(button => {
        button.addEventListener('mouseover', function() { 
            const currentSelected = document.querySelector('.nav-buttons-selected');
            if (currentSelected && currentSelected !== button) {
                currentSelected.classList.remove('nav-buttons-selected');
                currentSelected.classList.add('nav-buttons');
                button.classList.remove('nav-buttons');
                button.classList.add('nav-buttons-selected');
            }
            setPillPosition(button);
        });

        button.addEventListener('mouseout', function() {
            const currentHovered = document.querySelector('.nav-buttons-selected');
            if (originalSelectedButton && currentHovered !== originalSelectedButton) {
                currentHovered.classList.remove('nav-buttons-selected');
                currentHovered.classList.add('nav-buttons');
                originalSelectedButton.classList.remove('nav-buttons');
                originalSelectedButton.classList.add('nav-buttons-selected');
                setPillPosition(originalSelectedButton);
            }
        });
    });

    // Optionally revert back to the selected item when not hovering over any buttons
    nav.addEventListener('mouseleave', function() {
        const currentHovered = document.querySelector('.nav-buttons-selected');
        if (originalSelectedButton && currentHovered !== originalSelectedButton) {
            currentHovered.classList.remove('nav-buttons-selected');
            currentHovered.classList.add('nav-buttons');
            originalSelectedButton.classList.remove('nav-buttons');
            originalSelectedButton.classList.add('nav-buttons-selected');
            setPillPosition(originalSelectedButton);
        }
    });

    // Set pill position and size
    function setPillPosition(el) {
        const width = el.offsetWidth;
        const left = el.offsetLeft;
        const top = el.offsetTop;
        pill.style.width = `${width}px`;
        pill.style.left = `${left}px`;
        pill.style.top = `${top}px`;
    }

    // Intersection Observer to handle scroll position
    const sections = document.querySelectorAll('div[id]');
    const observerOptions = {
        threshold: 0.5 // Adjust as necessary to trigger the change when the section is halfway in view
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                const currentActive = document.querySelector('.nav-buttons-selected');
                const newActive = document.querySelector(`a[href="#${id}"]`);
                
                if (currentActive) {
                    currentActive.classList.remove('nav-buttons-selected');
                    currentActive.classList.add('nav-buttons');
                }
                
                if (newActive) {
                    newActive.classList.add('nav-buttons-selected');
                    newActive.classList.remove('nav-buttons');
                    originalSelectedButton = newActive; // Update the original selected button
                    setPillPosition(newActive);
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});
