const toggle = document.getElementById("navToggle");
const nav = document.getElementById("navMenu");
const overlay = document.getElementById("overlay");

// ------------------------ MENU OPEN/CLOSE ------------------------
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

// Hamburger click
toggle.addEventListener("click", () => {
    nav.classList.contains("active") ? closeMenu() : openMenu();
});

// Close on overlay click
overlay.addEventListener("click", closeMenu);

// ------------------------ LINK CLICK ------------------------
// Close menu when top-level links are clicked
const links = nav.querySelectorAll("#navMenu > ul > li > a"); // only top-level
links.forEach(link => {
    link.addEventListener("click", closeMenu);
});

// ------------------------ ACTIVE LINK HIGHLIGHT ------------------------
const allLinks = document.querySelectorAll("#navMenu a");
const currentPath = window.location.pathname
    .replace(/\/$/, "")
    .replace("index.html", "");

allLinks.forEach(link => {
    const linkPath = new URL(link.href, window.location.origin).pathname
        .replace(/\/$/, "")
        .replace("index.html", "");

    if (currentPath === linkPath) {
        link.classList.add("active");

        // Highlight parent menu if this is a submenu
        const parentLi = link.closest(".has-submenu");
        if (parentLi) {
            parentLi.querySelector("> a").classList.add("active");
        }
    }
});

// ------------------------ MOBILE SUBMENU TOGGLE ------------------------
const submenuParents = document.querySelectorAll(".has-submenu > a");

submenuParents.forEach(parent => {
    parent.addEventListener("click", (e) => {
        if (window.innerWidth <= 767) {
            e.preventDefault();
            e.stopPropagation(); // 🔹 Prevent first touch from activating submenu item underneath

            const li = parent.parentElement;
            li.classList.toggle("open");
        }
    });
});