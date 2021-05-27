/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inner-declarations */
"use strict";


// LEXIQUE
let id1 = null;
let id2 = null;
let maxNumb = 0;
let currentPage = document.querySelector(".cta--lexique");
let openSelect = document.querySelector(".cta--changer");
let intro = document.querySelector(".cta--intro");
// let select = document.querySelector(".cta--changer");
// let compare = document.querySelector(".cta--comparer");
let openCompare = document.querySelector(".cta--comparer");

if (currentPage != null) {
    intro.addEventListener("click", introDisplayNone);
    let lexique = document.querySelector(".cta--lexique");
    lexique.addEventListener("click", toggleLexique);

    // //OPEN LEXIQUE
    // toggleLexique();
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
            openSelect.innerHTML = "Fermer";
            openSelect.setAttribute('disabled', true)
            id1 = null;
            id2 = null;
            maxNumb = 0;

            document.querySelectorAll('.selected').forEach((box) => {
                console.log('bing')
                box.classList.remove('selected')
            })
        }
    }
}

if (openCompare != null) {
    let open = document.querySelector(".cta--comparer");
    open.addEventListener("click", toggleCompare);

    //OPEN COMPARE
    function toggleCompare() {
        if (document.body.hasAttribute("data-compare")) {
            document.body.removeAttribute("data-compare");
            openCompare.innerHTML = "Comparer";
        } else {
            document.body.setAttribute("data-compare", true);
            openCompare.innerHTML = "Fermer";
        }
    }
}



function introDisplayNone() {
    document.body.setAttribute("data-intro", true);
}


// JSON

// var car1 = document.querySelector(".car1");
var listcar = document.querySelector(".listcar");


fetch(('assets/data/data.json'))
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        var tab = data;
        console.log(tab)

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
                    console.log(maxNumb)

                    if (id1 !== null) {
                        id2 = e.currentTarget.id
                    } else {
                        id1 = e.currentTarget.id
                    }

                    e.currentTarget.classList.add("selected")

                    if (id1 !== null && id2 !== null) {
                        openSelect.removeAttribute('disabled')
                        console.log("_____id1_id2_sont_prêtes_____")
                        var leftcar = document.querySelector(".mustang-left");
                        var rightcar = document.querySelector(".mustang-right");

                        leftcar.setAttribute("src", "assets/images/car" + id1 + ".jpg")
                        leftcar.setAttribute("srcset", "assets/images/car" + id1 + "@2x.jpg 2x")
                        rightcar.setAttribute("src", "assets/images/car" + id2 + ".jpg")
                        rightcar.setAttribute("srcset", "assets/images/car" + id2 + "@2x.jpg 2x")
                        document.getElementById('name-left').textContent = tab[id1].name;
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
            console.log('bienvenue dans la fonction')

            let graphArray = document.querySelectorAll('.canvas')
            console.log(graphArray)
            console.log(graphArray[1])

            // let ctx1 = document.querySelector("#myChart1");

            // let tabVehicles = {
            //     vehicle1: {
            //         "pourcentage": tab[id1 - 1].pourcentage,
            //         "year": tab[id1 - 1].year,
            //         "id": tab[id1 - 1].id,
            //     },
            //     vehicle2: {
            //         "pourcentage": tab[id2 - 1].pourcentage,
            //         "year": tab[id2 - 1].year,
            //         "id": tab[id2 - 1].id,
            //     }
            // }

            // console.log(tabVehicles.vehicle1)
            // console.log(tabVehicles.vehicle2)

            // var comparatorbtn = document.querySelector(".comparator");
            // comparatorbtn.addEventListener("click", () => {
            //     let valueVehicle1 = Object.values(tabVehicles.vehicle1);
            //     let valueVehicle2 = Object.values(tabVehicles.vehicle2);

            //     console.log(valueVehicle1);
            //     console.log(valueVehicle2);


            //     //Création Chart

            //     let graph1 = new Chart(ctx1, {
            //         type: 'bar',
            //         data: {
            //             labels: [1, 2],
            //             datasets: [{
            //                 data: [valueVehicle1[0], valueVehicle2[0]],
            //                 label: {
            //                     display: false
            //                 },
            //                 backgroundColor: [
            //                     'rgba(255, 99, 132, 1)',
            //                     'rgba(54, 162, 235, 1)'],
            //                 maxBarThickness: 20,
            //             }],
            //         },
            //         options: {
            //             plugins: {
            //                 legend: false,
            //             },
            //             scales: {
            //                 x: {
            //                     display: false,
            //                     grid: {
            //                         offset: false
            //                     }
            //                 },
            //                 y: {
            //                     display: false,
            //                 }
            //             },
            //             indexAxis: 'y',
            //         }
            //     })
            // })
        }


        // Attention ici : pour pouvoir itérer sur chacun des graphiques, il va falloir passer par un QuerySelectorAll, qui renvoie un tableau plutôt qu'une valeur, et cela sous-entend une itération pour appliquer chaque tableau
        //  → s'assurer que le code fonctionne bien pour la première, puis passer directement à l'itération dans le tableau issu par QuerySelectorAll afin d'éviter de perdre du temps.




    })