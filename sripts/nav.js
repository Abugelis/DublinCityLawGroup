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
    link.addEventListener("click", closeMenu);
});