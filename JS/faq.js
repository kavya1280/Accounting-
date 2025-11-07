document.addEventListener('DOMContentLoaded', function() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            // Toggle the active class on the clicked header
            this.classList.toggle('active');

            // Select the next sibling, which is the accordion body
            const accordionBody = this.nextElementSibling;

            // Toggle the 'show' class to expand/collapse the body
            if (accordionBody.classList.contains('show')) {
                accordionBody.classList.remove('show');
                accordionBody.style.maxHeight = null; // Reset max-height
            } else {
                accordionBody.classList.add('show');
                // Set max-height to scrollHeight to allow smooth transition
                accordionBody.style.maxHeight = accordionBody.scrollHeight + "px";
            }

            // Close other open accordion items
            accordionHeaders.forEach(otherHeader => {
                if (otherHeader !== this && otherHeader.classList.contains('active')) {
                    otherHeader.classList.remove('active');
                    const otherAccordionBody = otherHeader.nextElementSibling;
                    otherAccordionBody.classList.remove('show');
                    otherAccordionBody.style.maxHeight = null;
                }
            });
        });
    });
});