(function () {
    document.addEventListener("DOMContentLoaded", () => {
        App.createParticles();

        if (App.isLoggedIn()) {
            const buttons = document.querySelectorAll("[data-logged-in-cta]");
            buttons.forEach((button) => {
                button.textContent = "Ir a mi panel";
                button.setAttribute("onclick", "window.location.href='dashboard.html'");
            });
        }
    });
})();
