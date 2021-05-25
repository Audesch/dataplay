"use strict";

// DARK MODE + LOCAL STORAGE
// var lien = document.querySelectorAll(".link--menu");


// LEXIQUE

let currentPage = document.querySelector(".cta--lexique");
let intro = document.querySelector(".cta--intro");
intro.addEventListener("click", introDisplayNone);


if (currentPage != null) {
    let navButton = document.querySelector(".cta--lexique");
    navButton.addEventListener("click", toggleNavigation);

    function toggleNavigation() {
        if (document.body.hasAttribute("data-lexique")) {
            document.body.removeAttribute("data-lexique");
        } else {
            document.body.setAttribute("data-lexique", true);
        }
    }

    /* for (let i = 0; i < lien.length; i++) {

        lien[i].addEventListener("click", closeMenu);
        function closeMenu() {
            document.body.removeAttribute("data-menu");
        };
    } */

}

function introDisplayNone() {
    document.body.setAttribute("data-intro", true);
}