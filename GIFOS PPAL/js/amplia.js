'use strict';
//VARIABLES
const ampliarGif = document.querySelector('#ampliar-gif');
const saveGif = document.getElementById('save-gif');
const downloadGif = document.getElementById('download-gif');
const titleAmpliar = document.querySelector('.title-ampliar');
const gifsLocal = [];
const gifLocalAmpliar = JSON.parse(localStorage.getItem('ampliar')) || [];

//EVENTOS
document.addEventListener('DOMContentLoaded', mostrarGifAmpliado);
saveGif.addEventListener('click', saveGifFunction);
downloadGif.addEventListener('mouseover', downloadGifFunction);


//FUNCIONES

function mostrarGifAmpliado() {
    titleAmpliar.innerText = gifLocalAmpliar.titulo;
    ampliarGif.innerHTML +=
        `<div class="gif-Img">
        <img class="hover-img" src="${gifLocalAmpliar.url}"></img>
     </div>
    `;
};

// icono guardar
function saveGifFunction(e) {
    e.preventDefault();
    gifsLocal.push(gifLocalAmpliar);

    let dataLocalStorage = localStorage.getItem('favoritos');

    if (dataLocalStorage == null) {
        localStorage.setItem('favoritos', JSON.stringify(gifsLocal));
    } else {
        let data = JSON.parse(dataLocalStorage);
        data.push(gifLocalAmpliar);
        localStorage.setItem('favoritos', JSON.stringify(data));
    };
};

//icono de descargar
function downloadGifFunction() {
    (async() => {
        let response = await fetch(gifLocalAmpliar.url);
        let load = await response.blob();
        downloadGif.href = window.URL.createObjectURL(load);
        downloadGif.download = 'image.gif';
    })();
};