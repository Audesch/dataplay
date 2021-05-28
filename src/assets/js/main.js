"use strict";

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inner-declarations */

// LEXIQUE
let id1 = null;
let id2 = null;
let maxNumb = 0;
let newChart = null

let currentPage = document.querySelector(".cta--lexique");
let openSelect = document.querySelector(".cta--changer");
let intro = document.querySelector(".cta--intro");
let openCompare = document.querySelector(".cta--comparer");

if (currentPage != null) {
    intro.addEventListener("click", introDisplayNone);
    let lexique = document.querySelector(".cta--lexique");
    lexique.addEventListener("click", toggleLexique);

    // //OPEN LEXIQUE

    function toggleLexique() {
        if (document.body.hasAttribute("data-lexique")) {
            document.body.removeAttribute("data-lexique");
        } else {
            document.body.setAttribute("data-lexique", true);
        }
    }
}

if (openSelect != null) {
    let open = document.querySelector(".cta--changer");
    open.addEventListener("click", toggleSelect);

    //OPEN SELECT
    function toggleSelect() {
        if (document.body.hasAttribute("data-select")) {
            document.body.removeAttribute("data-select");
            openSelect.innerHTML = "Changer";
        } else {
            document.body.setAttribute("data-select", true);
            openSelect.innerHTML = "Confirmer";
            openSelect.setAttribute('disabled', true)
            id1 = null;
            id2 = null;
            maxNumb = 0;

            document.querySelectorAll('.selected').forEach((box) => {
                box.classList.remove('selected')
            })
        }
    }
}

if (openCompare != null) {
    let open = document.querySelector(".cta--comparer");
    let close = document.querySelector(".cta--close");

    close.addEventListener("click", () => {
        document.location.reload(true);
    })

    open.addEventListener("click", toggleCompare);


    //OPEN COMPARE
    function toggleCompare() {
        if (document.body.hasAttribute("data-compare")) {
            document.body.removeAttribute("data-compare");
            openCompare.innerHTML = "Comparer";


        } else {
            document.body.setAttribute("data-compare", true);

        }
    }
}



function introDisplayNone() {
    document.body.setAttribute("data-intro", true);
}


// JSON

var listcar = document.querySelector(".listcar");


fetch(('assets/data/data.json'))
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        var tab = data;

        //Boucle affichage voitures

        for (var i = 0; i < data.length; i++) {
            var listimg = document.createElement("img");
            listcar.appendChild(listimg);
            listimg.setAttribute("class", "choix");
            listimg.setAttribute("id", + (i + 1));
            listimg.setAttribute("src", "assets/images/car" + (i + 1) + ".jpg");
        }

        // DOUBLE SELECTION

        var choix = document.querySelectorAll(".choix");
        for (let i = 0; i < choix.length; i++) {
            choix[i].classList.add(i + 1)
            choix[i].addEventListener("click", (e) => {
                if (maxNumb < 2) {

                    if (id1 !== null) {
                        id2 = e.currentTarget.id
                    } else {
                        id1 = e.currentTarget.id
                    }
                    e.currentTarget.classList.add("selected")

                    if (id1 !== null && id2 !== null) {
                        openSelect.removeAttribute('disabled')
                        var leftcar = document.querySelector(".mustang-left");
                        var rightcar = document.querySelector(".mustang-right");

                        leftcar.setAttribute("src", "assets/images/car" + id1 + ".jpg")
                        leftcar.setAttribute("srcset", "assets/images/car" + id1 + "@2x.jpg 2x")
                        rightcar.setAttribute("src", "assets/images/car" + id2 + ".jpg")
                        rightcar.setAttribute("srcset", "assets/images/car" + id2 + "@2x.jpg 2x")
                        document.getElementById('name-left').textContent = tab[id1 - 1].name;
                        document.getElementById('year-left').textContent = tab[id1].year;
                        document.getElementById('name-right').textContent = tab[id2].name;
                        document.getElementById('year-right').textContent = tab[id2].year;

                        GraphGenerator();
                    }
                    maxNumb += 1;
                }
            })
        }

        // GRAPHS GENERATOR
        function GraphGenerator() {
            let graphArray = document.querySelectorAll('.canvas')

            for (let i = 0; i < graphArray.length; i++) {

                const Graph = document.querySelector('#myChart' + [i + 1])
                window.newChart = new Chart(Graph, {
                    type: 'bar',
                    data: {
                        labels: [1, 2],
                        datasets: [{
                            data: [Object.values(tab[id1])[i], Object.values(tab[id2])[i]],
                            label: {
                                display: false
                            },
                            backgroundColor: [
                                'rgba(219, 106, 68, 1)',
                                'rgba(50 , 50, 50, 1)'],
                            maxBarThickness: 20,
                        }],
                    },
                    options: {
                        plugins: {
                            legend: false,
                        },
                        scales: {
                            x: {
                                display: false,
                                grid: {
                                    offset: false
                                }
                            },
                            y: {
                                display: false,
                            }
                        },
                    }
                })

            }

        }
    })


//landing anim voiture
gsap.registerPlugin(ScrollTrigger);

gsap.to(".img--header__gauche", {
    scrollTrigger: {
        trigger: ".header--landing",
        start: "top 30%",
        end: "bottom 20%",
        scrub: 1,
    },

    x: -200,
})

gsap.to(".img--header__droite", {
    scrollTrigger: {
        trigger: ".header--landing",
        start: "top 30%",
        end: "bottom 20%",
        scrub: 1,
    },

    x: 200,
})