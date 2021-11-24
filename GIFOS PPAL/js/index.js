'use strict';
//VARIABLES
const changeColor = document.querySelector('#change-color');
const modoColor = document.querySelector('#modo-clase');
const burger = document.querySelector('.burger');
const xBurger = document.querySelector('.first-burger');
const enlaces = document.querySelector('.enlaces');
const agregar = document.querySelector('.agregar');
const imgMax = document.querySelector('#img-max');
const logo = document.querySelector('.logo a img');
let contador = 0;

//modo nocturno
modoColor.addEventListener('click', (e) => {
    if (changeColor.classList.contains("dark")) {
        changeColor.classList.remove("dark");
        e.target.classList.remove("dark");
        modoColor.innerHTML = "modo nocturno";

        imgMax.classList.remove('modo-noc-crear-gifo');
        logo.classList.remove('modo-noc-logo');

    } else {
        changeColor.classList.add("dark");
        e.target.classList.add("dark");
        modoColor.innerHTML = "modo diurno";
        imgMax.classList.add('modo-noc-crear-gifo');
        logo.classList.add('modo-noc-logo');
    };
});

//menu hamburguesa
burger.addEventListener('click', () => {
    burger.style.display = "none";
    xBurger.style.display = "block";

    if (contador == 0) {
        enlaces.style.display = "flex";
        enlaces.setAttribute('id', 'enlacenav');
        contador = 1;
    }
});

xBurger.addEventListener('click', () => {
    if (contador == 1) {
        enlaces.style.display = "none";
        contador = 0;
    }
    burger.style.display = "block";
    xBurger.style.display = "none";
});

//scroll header
window.addEventListener('rezise', () => {
    var seguir = window.pageYOffset;
    const headerScorll = document.querySelector('.first-header');

    agregar.style.display = "none";
    headerScorll.style.boxShadow = '0 1px 6px 0 rgba(32, 33, 36, 0.28)'; //colocamos sombra
    headerScorll.style.padding = '20px 40px';

    if (seguir === 0) {
        agregar.style.display = "flex";
        headerScorll.style.boxShadow = 'none'; //quitamos sombra
        headerScorll.style.padding = '20px 40px'; //normalizamos como estaba antes el header
    };
});