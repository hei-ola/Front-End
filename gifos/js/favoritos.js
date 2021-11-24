'use strict';
//VARIABLES
const gifFavoritos = document.querySelector('#search-gifs-fav');
const verMas = document.querySelector('.ver-mas');
const sinContenido = document.querySelector('.sin-contenido');
const downloadGifA = document.querySelector('#download-gif');
const maxGifA = document.querySelector('#max-gif');
const hoverA = document.querySelector('.hover');
const eliminarGifBtn = document.getElementById('save-gif');
let num = 0;

/**
 * 1.traer del local storage gifs favoritos
 * 2.cargarlos a un array y comprobar por medio de una funcion que no esten repetidos.
 * 3.@param {array solo con elementos no repetidos} newArrLocal *
 * 4.subo a local storage nuevo array sin repetidos.
 */
const arrayLocal = JSON.parse(localStorage.getItem('favoritos')) || [];
const newArrLocal = eliminarObjetosDuplicados(arrayLocal, 'titulo');
localStorage.setItem('favoritos', JSON.stringify(newArrLocal));


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
document.addEventListener('DOMContentLoaded', traerGifLocalStorage());
eliminarGifBtn.addEventListener('click', eliminarGifFunction);
verMas.addEventListener('click', addGif);
downloadGifA.addEventListener('mouseover', downloadGifFunction);
maxGifA.addEventListener('click', maxGifFunction);
//evento mause
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

//funciones
//elimino gif repetidos traidos por el local storage
function eliminarObjetosDuplicados(arr, prop) {
    let nuevoArray = [];
    let lookup = {};

    for (var i in arr) {
        lookup[arr[i][prop]] = arr[i];
    }
    for (i in lookup) {
        nuevoArray.push(lookup[i]);
    }
    return nuevoArray;
};

function traerGifLocalStorage() {
    let cont = 0;
    let k = num;

    if (gifFavoritos.innerHTML === "") {
        sinContenido.style.display = 'flex';
    }
    for (k; k < newArrLocal.length; k++) {
        sinContenido.style.display = 'none';
        if (cont < 12) {
            gifFavoritos.innerHTML +=
                `<div class="gif-Img">
                      <img class="hover-img" src="${newArrLocal[k].url}"></img>
                      <div class=remover>
                         <p class="title-gif">${newArrLocal[k].titulo}</p>
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
    let uploadLocal = JSON.parse(localStorage.getItem('favoritos'));
    for (let i = 0; i < uploadLocal.length; i++) {
        if (elegirGifEliminar === uploadLocal[i].url) {
            uploadLocal.splice(i, 1);
        };
    };
    localStorage.setItem('favoritos', JSON.stringify(uploadLocal));
    if (uploadLocal.length === 0) {
        sinContenido.style.display = "flex";
        verMas.style.display = "none";
    }
};

//descargar
function downloadGifFunction() {
    const descargarGif = downloadGifA.parentElement.nextElementSibling.src;
    (async() => {
        let response = await fetch(descargarGif);
        let load = await response.blob();
        downloadGifA.href = window.URL.createObjectURL(load);
        downloadGifA.download = 'image.gif';
    })();
}

//icono de ampliar gif
function maxGifFunction() {
    const ampliarGif = maxGifA.parentElement.nextElementSibling.src;
    const ampliarTitleGif = maxGifA.parentElement.nextElementSibling.nextElementSibling.textContent;
    let ampliarDatos = {
        'titulo': ampliarTitleGif,
        'url': ampliarGif
    };
    localStorage.setItem('ampliar', JSON.stringify(ampliarDatos));
}