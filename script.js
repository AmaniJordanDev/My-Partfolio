
// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const navLinks = document.getElementById("navLinks");


// OPEN MENU
menuBtn.addEventListener("click", () => {

    navLinks.classList.add("open");

    menuBtn.setAttribute("aria-expanded", "true");

});


// CLOSE MENU
closeBtn.addEventListener("click", () => {

    navLinks.classList.remove("open");

    menuBtn.setAttribute("aria-expanded", "false");

});


// CLOSE MENU WHEN A LINK IS CLICKED
const links = navLinks.querySelectorAll("a");

links.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuBtn.setAttribute("aria-expanded", "false");

    });

});

// ================= ACTIVE NAVIGATION =================

const sections = document.querySelectorAll("section[id]");

const navItems = document.querySelectorAll(".nav-links a");


window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navItems.forEach(link => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});