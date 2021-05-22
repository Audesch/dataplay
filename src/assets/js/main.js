"use strict";

var ctx = document.querySelector('#myChart').getContext('2d');

var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Mustang1', 'Mustang2'],
        datasets: [{
            data: [12, 19],
            label: {
                display: false
            },
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'],
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
        indexAxis: 'y',
    }
});