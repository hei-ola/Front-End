'use strict';
//APIKEY
const apiKey = '3H1hcaSGEO7fnIn2fQooiE2fghYi23OK';

//VARIABLES 
const hover = document.querySelector('.hover-slider');
let imgGif = document.getElementById('img-gif');
let imgGif1 = document.getElementById('img-gif1');
const saveGif = document.querySelector('.save-gif');
const downloadGif = document.querySelector('.download-gif');
const maxGif = document.querySelector('.max-gif');
const carruselIzq = document.querySelector('.carrusel-izq');
const carruselDerecho = document.querySelector('.carrusel-derecho');
const carruselIzq1 = document.querySelector('.carrusel-izq1');
const carruselDerecho1 = document.querySelector('.carrusel-derecho1');

let pag = 1;
let numCarrusel = 0;
let contCarrusel = 3;
let numCarrusel1 = 0;
let contCarrusel1 = 1;
const gifsLocal = [];
const carruselImg = [];

/**
 * 1.traer api para slider.
 * 2.@param {llenar array con todos los gif traidos de api} carruselImg * 
 * 3.acceder a las funciones carruselgif y crear slider para pantallas desktop
 * 4.acceder a las funciones carruselgif1 y crear slider para mobile
 */
async function searchGifCarrusel() {
    try {
        const url = `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&q=`;
        // console.log(url)
        const resp = await fetch(url);
        const data = await resp.json();

        imgGif.innerHTML = "";

        for (let j = 0; j < data.data.length; j++) {
            carruselImg.push(data.data[j])
        };

        carruselGif(carruselImg);
        carruselGif1(carruselImg);

    } catch (err) {
        console.error('fetch failed', err);
    };
};

//EVENTOS
/**
 * evento DOMContentLoaded carga contenido html primero 
 * evento para cada icono:
 * -saveGif: evento click guardar en local storage acceder a gif en pag de favoritos.
 * -downloadGif: evento mauseover accede a descarga directa del gif.
 * -maxGif: evento click trae pagina de gifAmpliado cargar solo gif que se escoge.
 * 
 * function eventos creados sobre el mause trae dos parametro:
 * 
 * @param {url de gif traido de la api} apiGifCarrusel * 
 * @param {titlu correspondiente a la url} titleGifSlider * 
 * 
 */
document.addEventListener('DOMContentLoaded', searchGifCarrusel());
saveGif.addEventListener('click', saveGifFunction);
downloadGif.addEventListener('mouseover', downloadGifFunction);
maxGif.addEventListener('click', maxGifFunction);

function eventoMouseSlider(apiGifCarrusel, titleGifSlider) {
    //MOUSEOVER 
    for (let j = 0; j < apiGifCarrusel.length; j++) {
        apiGifCarrusel[j].addEventListener('mouseover', () => {
            titleGifSlider[j].style.display = "block";
            apiGifCarrusel[j].classList.add("hover-gif");
            hover.style.visibility = "visible";
            apiGifCarrusel[j].insertBefore(hover, apiGifCarrusel[j].firstChild);
        });
        //MOUSEOUT
        apiGifCarrusel[j].addEventListener('mouseout', () => {
            titleGifSlider[j].style.display = "none";
            apiGifCarrusel[j].classList.remove("hover-gif");
            hover.style.visibility = "hidden";
        });
    };
};

//guardar gif a favoritos 
function saveGifFunction() {

    const guardarFavoritos = saveGif.parentElement.nextElementSibling.src;
    const guardarTitle = saveGif.parentElement.nextElementSibling.nextElementSibling.textContent;

    let datosFavoritos = {
        'titulo': guardarTitle,
        'url': guardarFavoritos
    };

    gifsLocal.push(datosFavoritos);

    let dataLocalStorage = localStorage.getItem('favoritos');

    if (dataLocalStorage == null) {
        localStorage.setItem('favoritos', JSON.stringify(gifsLocal));
    } else {
        let data = JSON.parse(dataLocalStorage);
        data.push(datosFavoritos);
        localStorage.setItem('favoritos', JSON.stringify(data));
    };
};

//icono de descargar
function downloadGifFunction() {

    const descargarGif = downloadGif.parentElement.nextElementSibling.src;

    (async() => {
        let response = await fetch(descargarGif);
        let load = await response.blob();
        downloadGif.href = window.URL.createObjectURL(load);
        downloadGif.download = 'image.gif';
    })();
};

//icono de ampliar gif
function maxGifFunction() {

    const ampliarGif = maxGif.parentElement.nextElementSibling.src;
    const ampliarTitleGif = maxGif.parentElement.nextElementSibling.nextElementSibling.textContent;

    let ampliarDatos = {
        'titulo': ampliarTitleGif,
        'url': ampliarGif
    };

    localStorage.setItem('ampliar', JSON.stringify(ampliarDatos));
};

//CARRUSEL PARA PANTALLAS DESKTOP
carruselDerecho.addEventListener('click', () => {

    pag = 1;

    imgGif.innerHTML = "";

    numCarrusel += 3;
    contCarrusel += 3;

    if (numCarrusel >= carruselImg.length) {
        numCarrusel = 0;
        contCarrusel = 3;
    };

    carruselGif();
});

carruselIzq.addEventListener('click', () => {

    pag = 0;

    imgGif.innerHTML = "";

    numCarrusel -= 3;
    contCarrusel -= 3;

    if (numCarrusel <= 0) {
        numCarrusel = 47;
        contCarrusel = 50;
    };

    carruselGif();

});


function carruselGif() {

    if (pag === 1) {
        let i = numCarrusel;

        for (i; i < contCarrusel; i++) {

            if (i >= carruselImg.length) {
                contCarrusel = 1;
                i = 0;
            };
            imgGif.innerHTML +=
                `<div class="api-gif">
                    <img class="hover-img" src="${carruselImg[i].images.downsized.url}"></img>
                    <div class=remover>
                        <p class="title-gif-slider">${carruselImg[i].title}</p>
                    </div>
                 </div>
               `;
        };
    };
    if (pag === 0) {

        let i = numCarrusel;

        for (i; i < contCarrusel; i++) {
            imgGif.innerHTML +=
                `<div class="api-gif">
                    <img class="hover-img off-click" src="${carruselImg[i].images.downsized.url}"></img>
                    <div class=remover>
                        <p class="title-gif-slider">${carruselImg[i].title}</p>
                    </div>
                 </div>
                `;
        };
    };
    const apiGifCarrusel = document.querySelectorAll('.api-gif');
    const titleGifSlider = document.querySelectorAll('.title-gif-slider');
    eventoMouseSlider(apiGifCarrusel, titleGifSlider);
};

//CARRUSEL PARA PANTALLAS MOVILES
carruselDerecho1.addEventListener('click', () => {

    pag = 1;

    imgGif1.innerHTML = "";

    numCarrusel1 += 1;
    contCarrusel1 += 1;

    if (numCarrusel1 >= carruselImg.length) {
        numCarrusel1 = 0;
        contCarrusel = 1;
    };


    carruselGif1();
});

carruselIzq1.addEventListener('click', () => {

    pag = 0;

    imgGif1.innerHTML = "";

    numCarrusel1 -= 1;
    contCarrusel1 -= 1;

    if (numCarrusel1 <= 0) {
        numCarrusel1 = 49;
        contCarrusel1 = 50;
    };


    carruselGif1();
});

function carruselGif1() {

    if (pag === 1) {
        let i = numCarrusel1;

        for (i; i < contCarrusel1; i++) {

            if (i >= carruselImg.length) {
                contCarrusel1 = 1;
                i = 0;
            };
            imgGif1.innerHTML +=
                `<div class="api-gif1">
                    <a class="small-gif">
                      <img class="hover-img1 off-click" src="${carruselImg[i].images.downsized.url}"></img>
                     <div class=remover>
                      <p class="title-gif-slider">${carruselImg[i].title}</p>
                    </div>
                   </a>
                </div>
               `;
        };
    };
    if (pag === 0) {

        let i = numCarrusel1;

        for (i; i < contCarrusel1; i++) {
            imgGif1.innerHTML +=
                `<div class="api-gif1">
                  <a class="small-gif">
                    <img class="hover-img1 off-click" src="${carruselImg[i].images.downsized.url}"></img>
                    <div class=remover>
                        <p class="title-gif-slider">${carruselImg[i].title}</p>
                    </div>
                  </a>
                 </div>
                `;
        };
    };

    const smallGif = document.querySelector('.small-gif');
    /**
     * guardar gif en local estorage al dal click en gif y luego ampliar gif 
     * con su respectivo titulo.
     */
    smallGif.addEventListener('click', () => {

        const gifSmall = smallGif.childNodes[1].src;
        const titleSmall = smallGif.childNodes[3].children[0].textContent;

        let ampliarSmall = {
            'titulo': titleSmall,
            'url': gifSmall
        };
        localStorage.setItem('ampliar', JSON.stringify(ampliarSmall));
        smallGif.href = "./gifAmpliado.html";
    });
};