document.addEventListener("DOMContentLoaded", () => {

    const logoBox = document.querySelector(".logo-box");
    const exploreBtn = document.querySelector(".explore-btn");

    if (logoBox) {

        logoBox.setAttribute("tabindex", "0");

        const activateLogo = () => {
            logoBox.classList.add("clicked");

            setTimeout(() => {
                logoBox.classList.remove("clicked");
            }, 500);
        };

        logoBox.addEventListener("click", activateLogo);

        logoBox.addEventListener("keydown", (e) => {

            if (e.key === "Enter" || e.key === " ") {

                e.preventDefault();
                activateLogo();

            }

        });

        document.addEventListener("mousemove", (e) => {

            const x = (e.clientX / window.innerWidth - 0.5) * 8;
            const y = (e.clientY / window.innerHeight - 0.5) * 8;

            logoBox.style.transform = `translate(${x}px, ${y}px)`;

        });

        document.addEventListener("mouseleave", () => {

            logoBox.style.transform = "translate(0,0)";

        });

    }

    if (exploreBtn) {

        exploreBtn.addEventListener("click", (e) => {

            e.preventDefault();

            const oldText = exploreBtn.textContent;

            exploreBtn.textContent = "Loading...";

            exploreBtn.style.pointerEvents = "none";

            setTimeout(() => {

                window.location.href = exploreBtn.getAttribute("href");

            }, 700);

        });

    }

});