// Get all accordion buttons
const accordionBtns = document.querySelectorAll(".accordion");

// Add keyboard navigation and ARIA support for each accordion
accordionBtns.forEach((accordion) => {
    // Set initial ARIA states
    const content = accordion.nextElementSibling;
    content.setAttribute('aria-hidden', 'true');
    
    // Handle click events
    accordion.onclick = function() {
        toggleAccordion(this);
    };

    // Add keyboard support
    accordion.onkeydown = function(event) {
        switch (event.key) {
            case "Enter":
            case " ":
                // Activate accordion on Enter or Space
                event.preventDefault();
                toggleAccordion(this);
                break;
            
            case "ArrowDown":
                event.preventDefault();
                // Move focus to next accordion button
                const nextBtn = this.parentElement.querySelector(`button.accordion[id="${getNextId(this.id)}"]`);
                if (nextBtn) nextBtn.focus();
                break;
            
            case "ArrowUp":
                event.preventDefault();
                // Move focus to previous accordion button
                const prevBtn = this.parentElement.querySelector(`button.accordion[id="${getPrevId(this.id)}"]`);
                if (prevBtn) prevBtn.focus();
                break;
            
            case "Home":
                event.preventDefault();
                // Move focus to first accordion button
                accordionBtns[0].focus();
                break;
            
            case "End":
                event.preventDefault();
                // Move focus to last accordion button
                accordionBtns[accordionBtns.length - 1].focus();
                break;
        }
    };
});

// Helper function to toggle accordion state
function toggleAccordion(button) {
    button.classList.toggle("is-open");
    
    // Update ARIA states
    const isExpanded = button.classList.contains("is-open");
    button.setAttribute('aria-expanded', isExpanded);
    
    // Toggle content visibility
    const content = button.nextElementSibling;
    content.setAttribute('aria-hidden', !isExpanded);
    
    // Adjust content height
    if (isExpanded) {
        content.style.maxHeight = content.scrollHeight + "px";
    } else {
        content.style.maxHeight = null;
    }
}

// Helper functions for keyboard navigation
function getNextId(currentId) {
    const currentNum = parseInt(currentId.replace('accordion', ''));
    return `accordion${currentNum + 1}`;
}

function getPrevId(currentId) {
    const currentNum = parseInt(currentId.replace('accordion', ''));
    return `accordion${currentNum - 1}`;
}