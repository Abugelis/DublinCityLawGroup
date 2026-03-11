const toggle = document.getElementById("navToggle");
const nav = document.getElementById("navMenu");
const overlay = document.getElementById("overlay");
const links = nav.querySelectorAll("a");

function openMenu() {
    nav.classList.add("active");
    toggle.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("no-scroll");
}

function closeMenu() {
    nav.classList.remove("active");
    toggle.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
}

toggle.addEventListener("click", () => {
    nav.classList.contains("active") ? closeMenu() : openMenu();
});

/* Close on overlay click */
overlay.addEventListener("click", closeMenu);

/* Close on link click */
links.forEach(link => {
    if (!link.parentElement.classList.contains("has-submenu")) {
        link.addEventListener("click", closeMenu);
    }
});


const navLinks = document.querySelectorAll('#navMenu a');

const currentPath = window.location.pathname.replace(/\/$/, "");

navLinks.forEach(link => {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, "");

    if (currentPath === linkPath) {
        link.classList.add("active");
    }
});


/* MOBILE SUBMENU TOGGLE */

const submenuParents = document.querySelectorAll(".has-submenu > a");

submenuParents.forEach(parent => {
    parent.addEventListener("click", (e) => {

        if (window.innerWidth <= 767) {
            e.preventDefault();

            const li = parent.parentElement;
            li.classList.toggle("open");
        }

    });
});