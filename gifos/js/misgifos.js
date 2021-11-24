'use strict';
//VARIABLES
let uploadGifLocal = JSON.parse(localStorage.getItem('upload')) || [];
const searchGifUpload = document.getElementById('search-gifs-fav');
const downloadGifA = document.getElementById('download-gif');
const maxGifA = document.getElementById('max-gif');
const eliminarGifBtn = document.getElementById('save-gif');
const sinContenido = document.querySelector('.sin-contenido');
const hoverA = document.querySelector('.hover');
const verMas = document.querySelector('.ver-mas');
let num = 0;


//EVENTOS
/**
 * evento DOMContentLoaded carga contenido html primero 
 * evento para cada icono:
 * -elimiarGifBtn: evento click elimina gif tanto del local storage como de la pag.
 * -downloadGif: evento mauseover accede a descarga directa del gif.
 *- maxGif: evento click trae pagina de gifAmpliado cargar solo gif que se escoge.
 * -verMas si tenemos mas de 12 gif aparece nuestro btn "ver-mas".
 * function eventos creados sobre el mause trae dos parametro:
 * 
 * @param {url de gif traido de la api} gifImg * 
 * @param {titlu correspondiente a la url} titleGif * 
 * 
 */
document.addEventListener('DOMContentLoaded', misGifosUpload());
downloadGifA.addEventListener('mouseover', downloadGifFunction);
maxGifA.addEventListener('click', maxGifFunction);
eliminarGifBtn.addEventListener('click', eliminarGifFunction);
verMas.addEventListener('click', addGif);

//funcion con evento mouseover
function eventoMouse(gifImg, titleGif) {

    for (let j = 0; j < gifImg.length; j++) {
        gifImg[j].addEventListener('mouseover', () => {
            titleGif[j].style.display = "block";
            gifImg[j].classList.add("hover-gif");
            hoverA.style.visibility = "visible";
            gifImg[j].insertBefore(hoverA, gifImg[j].firstChild);
        });
        //MOUSEOUT
        gifImg[j].addEventListener('mouseout', () => {
            titleGif[j].style.display = "none";
            gifImg[j].classList.remove("hover-gif");
            hoverA.style.visibility = "hidden";
        });
    };
};

//FUNCIONES

function misGifosUpload() {
    let cont = 0;
    let i = num;
    if (searchGifUpload.innerHTML === '') {
        sinContenido.style.display = "flex";
    };
    for (i; i < uploadGifLocal.length; i++) {
        sinContenido.style.display = "none";
        if (cont < 12) {
            searchGifUpload.innerHTML +=
                `<div class="gif-Img">
                <img class="hover-img" src="${uploadGifLocal[i].url}"></img>
                <div class=remover>
                   <p class="title-gif">${uploadGifLocal[i].title}</p>
                </div>
              </div>
            `;
            cont++; //q si ya mostro todos no mostrar mas el ver mas
        } else
        if (cont >= 12) {
            verMas.style.display = "flex";
        };
    };
    const gifImg = document.querySelectorAll('.gif-Img');
    const titleGif = document.querySelectorAll('.title-gif');
    eventoMouse(gifImg, titleGif);
};

function addGif() {
    num += 12;
    traerGifLocalStorage();
};

//eliminar gif
function eliminarGifFunction() {
    const eliminarGif = eliminarGifBtn.parentElement.parentElement;
    const elegirGifEliminar = eliminarGifBtn.parentElement.nextElementSibling.src;

    eliminarGif.remove(eliminarGif);
    let uploadLocal = JSON.parse(localStorage.getItem('upload'));
    for (let i = 0; i < uploadLocal.length; i++) {
        if (elegirGifEliminar === uploadLocal[i].url) {
            uploadLocal.splice(i, 1);
        };
    };
    localStorage.setItem('upload', JSON.stringify(uploadLocal));
    if (uploadLocal.length === 0) {
        sinContenido.style.display = "flex";
        verMas.style.display = "none";
    };
};

//icono de descargar
function downloadGifFunction() {
    const descargarGif = downloadGifA.parentElement.nextElementSibling.src;
    (async() => {
        let response = await fetch(descargarGif);
        let load = await response.blob();
        downloadGifA.href = window.URL.createObjectURL(load);
        downloadGifA.download = 'image.gif';
    })();
};

//icono de ampliar gif
function maxGifFunction() {
    const ampliarGif = maxGifA.parentElement.nextElementSibling.src;
    const ampliarTitleGif = maxGifA.parentElement.nextElementSibling.nextElementSibling.textContent;
    let ampliarDatos = {
        'titulo': ampliarTitleGif,
        'url': ampliarGif
    };
    localStorage.setItem('ampliar', JSON.stringify(ampliarDatos));
};