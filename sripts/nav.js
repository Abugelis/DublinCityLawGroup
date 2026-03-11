const toggle = document.getElementById("navToggle");
const nav = document.getElementById("navMenu");
const overlay = document.getElementById("overlay");

// MENU OPEN/CLOSE
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

overlay.addEventListener("click", closeMenu);

// LINK CLICK (top-level only, ignore parents with submenu)
const links = nav.querySelectorAll("#navMenu > ul > li > a");
links.forEach(link => {
    if (!link.parentElement.classList.contains("has-submenu")) {
        link.addEventListener("click", closeMenu);
    }
});

// ------------------------ ACTIVE LINK HIGHLIGHT ------------------------
const allLinks = document.querySelectorAll("#navMenu a");
const currentPath = window.location.pathname
    .replace(/\/$/, "")
    .replace("index.html", "");

// Only apply 'active' for desktop or when page is loaded
allLinks.forEach(link => {
    const linkPath = new URL(link.href, window.location.origin).pathname
        .replace(/\/$/, "")
        .replace("index.html", "");

    // Skip mobile submenu links temporarily
    if (window.innerWidth <= 767 && link.closest(".submenu")) {
        return;
    }

    if (currentPath === linkPath) {
        link.classList.add("active");

        // Highlight parent menu if this is a submenu
        const parentLi = link.closest(".has-submenu");
        if (parentLi) parentLi.querySelector("> a").classList.add("active");
    }
});

// MOBILE SUBMENU TOGGLE
const submenuParents = document.querySelectorAll(".has-submenu > a");

submenuParents.forEach(parent => {
    parent.addEventListener("click", (e) => {
        if (window.innerWidth <= 767) {
            e.preventDefault();   // never navigate
            e.stopPropagation();  // prevent first-tap carry-over

            const li = parent.parentElement;
            li.classList.toggle("open");
        }
    });
});