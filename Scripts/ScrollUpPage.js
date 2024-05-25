document.addEventListener("DOMContentLoaded", function() {
    const scrollTopBtn = document.getElementById("ScrollUpButton");

    // Function to check scroll position and toggle button visibility
    function checkScrollPosition() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.remove("hidden-opacity");
        } else {
            scrollTopBtn.classList.add("hidden-opacity");
        }
    }

    // Scroll to top function
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }

    // Event listener for scroll event
    window.addEventListener("scroll", checkScrollPosition);

    // Event listener for button click
    scrollTopBtn.addEventListener("click", scrollToTop);

    // Initial check in case the user is already scrolled down
    checkScrollPosition();
});
