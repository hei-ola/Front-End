'use strict';
//lIMPIAR BUSQUEDA 
function limpiarHTML() {
    while (resultEnlace.firstChild) {
        resultEnlace.removeChild(resultEnlace.firstChild);
    };
};

function limpiarHTML1() {
    while (resultEnlace1.firstChild) {
        resultEnlace1.removeChild(resultEnlace1.firstChild);
    };
};
//CARGANDO PAGINA COMPLETA
document.addEventListener('DOMContentLoaded', () => {
    trendingApi();
});

//VARIABLES GLOBALES
const busquedaRechazada = document.querySelector('.pantallas-grandes .busqueda-rechazada');
const searchInput = document.querySelector('.pantallas-grandes .search-input');
const searchButton = document.querySelector('.pantallas-grandes .search-button');
const closeButton = document.querySelector('.pantallas-grandes .close-btn');
const searchGifs = document.querySelector('.pantallas-grandes .search-gifs');
const resultEnlace = document.querySelector('.pantallas-grandes .result-enlace');
const verMas = document.querySelector('.pantallas-grandes .ver-mas');
const verMasTrending = document.querySelector('.ver-mas-trending');
let titleSearch = document.querySelector('.pantallas-grandes .title-search');
let searchoff = 12;
const busquedaRechazada1 = document.querySelector('.pantallas-pequeñas .busqueda-rechazada');
const searchInput1 = document.querySelector('.pantallas-pequeñas .search-input');
const searchButton1 = document.querySelector('.pantallas-pequeñas .search-button');
const closeButton1 = document.querySelector('.pantallas-pequeñas .close-btn');
const searchGifs1 = document.querySelector('.pantallas-pequeñas .search-gifs');
const resultEnlace1 = document.querySelector('.pantallas-pequeñas .result-enlace');
const verMas1 = document.querySelector('.pantallas-pequeñas .ver-mas');
let titleSearch1 = document.querySelector('.pantallas-pequeñas .title-search');
const textTrending = document.querySelector('.text-trending');
const trending = document.getElementById('trending');
let searchoff1 = 12;
let arrayGifTrending = [];

//Pantallas grande
//LLAMADA DE API
//sugerencias
async function searchGifApi() {

    try {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchInput.value}`;
        // console.log(url);
        const resp = await fetch(url);
        const data = await resp.json();
        const gifApi = data.data;
        sugerenciasApi(gifApi);
    } catch (err) {
        console.error('fetch failed', err);
    };
};
//traer imagenes gif
async function searchGifApiImagenes() {
    try {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchInput.value}&offset=${searchoff}`;
        const resp = await fetch(url);
        const data = await resp.json();
        mostrarGif(data.data);
    } catch (err) {
        console.error('fetch failed', err);
    };
};

//pagina small
async function searchGifApi1() {

    try {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchInput1.value}`;
        // console.log(url);
        const resp = await fetch(url);
        const data = await resp.json();
        const gifApi1 = data.data;
        sugerenciasApi1(gifApi1);
    } catch (err) {
        console.error('fetch failed', err);
    };
};
//traer imagenes gif pantallas pequeñas
async function searchGifApiImagenes1() {
    try {
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${searchInput1.value}&offset=${searchoff}`;
        const resp = await fetch(url);
        const data = await resp.json();
        mostrarGif1(data.data);
    } catch (err) {
        console.error('fetch failed', err);
    };
};


//TRENDING
async function trendingApi() {
    try {
        const url = `https://api.giphy.com/v1/trending/searches?api_key=${apiKey}`;
        const resp = await fetch(url);
        const data = await resp.json();
        const gifTrending = data.data;

        for (let i = 0; i < 5; i++) {
            textTrending.innerHTML +=
                `<a href="#">${gifTrending[i]}</a>`;
        };
        searchTrending();

    } catch (err) {
        console.error('fetch failed', err);
    };
};

// //EVENTOS
//enter
searchInput.addEventListener('keyup', e => {
    e.preventDefault();
    if (e.which === 13 || e.keyCode == 13) {
        buscargif();
    };
});
searchButton.addEventListener('click', buscargif);
searchInput.addEventListener('input', sugerenciasBuscador);
verMas.addEventListener('click', addGif);
closeButton.addEventListener('click', limpiarBuscador);


// //fUNCIONES

//buscador de trending
function searchTrending() {

    for (let i = 0; i < textTrending.children.length; i++) {
        textTrending.childNodes[i].addEventListener('click', e => {
            trending.innerHTML = "";
            e.preventDefault();
            (async() => {
                const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${textTrending.childNodes[i].innerText}&limit=12`;
                const resp = await fetch(url);
                const data = await resp.json();

                searchTrendingGif(data);
            })();
        });
    };
};

function searchTrendingGif(data) {
    searchGifs.innerHTML = "";
    titleSearch.textContent = "";
    verMas.style.display = "none";
    searchGifs1.innerHTML = "";
    titleSearch1.textContent = "";
    verMas1.style.display = "none";
    for (let j = 0; j < data.data.length; j++) {
        trending.innerHTML +=
            `<div class="gif-Img">
                   <img class="hover-img" src="${data.data[j].images.downsized.url}"></img>
                   <div class=remover>
                    <p class="title-gif">${data.data[j].title}</p>
                   </div>
             </div>
            `;
    };

    const gifImg = document.querySelectorAll('.gif-Img');
    const titleGif = document.querySelectorAll('.title-gif');
    eventoMouseSlider(gifImg, titleGif);
};

//borrar al dar click en x
function limpiarBuscador() {
    searchInput.value = '';
    titleSearch.style.display = "none";
    searchButton.style.display = "block";
    closeButton.style.display = "none";
    searchGifs.innerHTML = "";
    verMas.style.display = "none";
    limpiarHTML();
}

// input
function sugerenciasBuscador(e) {
    if (e.target.value === "") {
        resultEnlace.style.display = "none";
        titleSearch.style.display = "none";
        searchButton.style.display = "block";
        closeButton.style.display = "none";
    } else {
        searchGifApi();
        searchButton.style.display = "none";
        closeButton.style.display = "block";
        resultEnlace.style.display = "block";
        searchGifs.innerHTML = '';
        verMas.style.display = "none";
    };
};

// // //sacar titulo de sugerencia de api
function sugerenciasApi(gifApi) {
    titleSearch.innerText = searchInput.value;
    titleSearch.style.display = "block";
    let bandera = false;
    let cont = 0;
    limpiarHTML(); //cada ves q tipeo algo nuevo va actualizando

    for (let i = 0; i < gifApi.length; i++) {
        if (gifApi[i].title.indexOf(searchInput.value) !== -1) {
            if (bandera == false) {
                resultEnlace.innerHTML +=
                    `<a href="#" class="enlace-gif">
                       <img src="./img/icon-search-mod-noc.svg" alt="search">
                        ${gifApi[i].title}
                    </a>
                    `;
                cont++;
            };
        }
        if (cont > 4) {
            bandera = true;
        };
    };
    if (resultEnlace.firstChild === null) {
        busquedaRechazada.style.display = "flex";
        setTimeout(() => {
            busquedaRechazada.style.display = "none";
            searchInput.value = '';
            titleSearch.style.display = "none";
        }, 5000);

    }

    const enlaceGif = document.querySelectorAll('.enlace-gif');
    traerGif(gifApi, enlaceGif);
}

// //traer gif al dar click en alguna sugerencia
function traerGif(gifApi, enlaceGif) {
    trending.innerHTML = "";
    for (let i = 0; i < enlaceGif.length; i++) {
        enlaceGif[i].addEventListener('click', (e) => {
            searchInput.value = '';
            searchButton.style.display = "block";
            closeButton.style.display = "none";

            e.preventDefault();
            for (let j = 0; j < gifApi.length; j++) {
                if (enlaceGif[i].innerText === (gifApi[j].title)) {
                    searchGifs.innerHTML +=
                        `<div class="gif-Img">
                           <img class="hover-img" src="${gifApi[j].images.downsized.url}"></img>
                           <div class=remover>
                            <p class="title-gif">${gifApi[j].title}</p>
                           </div>
                         </div>
                        `;
                    limpiarHTML();
                };
            };
            const gifImg = document.querySelectorAll('.gif-Img');
            const titleGif = document.querySelectorAll('.title-gif');
            eventoMouseSlider(gifImg, titleGif);
        });

    };
};
//si no esta vacio
function buscargif() {
    if (searchInput.value === '') {
        busquedaRechazada.style.display = "flex";
        setTimeout(() => {
            busquedaRechazada.style.display = "none";
        }, 5000);
    } else {
        searchGifApiImagenes();
    }
};

//traer gifs al dar click en la lupa o enter
function mostrarGif(data) {
    limpiarHTML();
    let cont = 0;
    for (let i = 0; i < data.length; i++) {
        if (data[i].title.includes(searchInput.value)) {
            if (cont < 12) {
                searchGifs.innerHTML += `
            <div class="ultimo-intento">
                 <img class="hover-img" src="${data[i].images.downsized.url}"></img> 
                 <div class=remover>
                 <p class="title-gif">${data[i].title}</p>
               </div>               
           </div>
           `;
            }
            cont++;
        } else
        if (cont >= 12) {
            verMas.style.display = "flex";
        }
    };
    const ultimoIntento = document.querySelectorAll('.ultimo-intento');
    const titleGif = document.querySelectorAll('.title-gif');
    eventoMouseSlider(ultimoIntento, titleGif);
};

function addGif() {
    searchoff += 12;
    searchGifApiImagenes();
};

//pantallas pequeñas
// //EVENTOS
//enter
searchInput1.addEventListener('keyup', e => {
    e.preventDefault();
    if (e.which === 13 || e.keyCode == 13) {
        buscargif1();
    };
});
searchButton1.addEventListener('click', buscargif1);
searchInput1.addEventListener('input', sugerenciasBuscador1);
verMas1.addEventListener('click', addGif1);
closeButton1.addEventListener('click', limpiarBuscador1);

// //fUNCIONES
//borrar al dar click en x
function limpiarBuscador1() {
    searchInput1.value = '';
    titleSearch1.style.display = "none";
    searchButton1.style.display = "block";
    closeButton1.style.display = "none";
    searchGifs1.innerHTML = "";
    verMas1.style.display = "none";
    limpiarHTML1();
}
// input
function sugerenciasBuscador1(e) {
    if (e.target.value === "") {
        resultEnlace1.style.display = "none";
        titleSearch1.style.display = "none";
        searchButton1.style.display = "block";
        closeButton1.style.display = "none";
    } else {
        searchGifApi1();
        searchButton1.style.display = "none";
        closeButton1.style.display = "block";
        resultEnlace1.style.display = "block";
        searchGifs1.innerHTML = '';
        verMas1.style.display = "none";
    };
};

// // //sacar titulo de sugerencia de api
function sugerenciasApi1(gifApi1) {
    console.log(gifApi1)
    titleSearch1.innerText = searchInput1.value;
    titleSearch1.style.display = "block";
    let bandera1 = false;
    let cont1 = 0;
    limpiarHTML1(); //cada ves q tipeo algo nuevo va actualizando

    for (let i = 0; i < gifApi1.length; i++) {
        if (gifApi1[i].title.indexOf(searchInput1.value) !== -1) {
            if (bandera1 == false) {
                resultEnlace1.innerHTML +=
                    ` 
                  <a href="#" class="enlace-gif1">
                     <img src="./img/icon-search-mod-noc.svg" alt="search">
                     ${gifApi1[i].title}
                  </a>
               `;
                cont1++;
            };
        }
        if (cont1 > 4) {
            bandera1 = true;
        };
    };
    if (resultEnlace1.firstChild === null) {
        busquedaRechazada1.style.display = "flex";
        setTimeout(() => {
            busquedaRechazada1.style.display = "none";
            searchInput1.value = '';
            titleSearch1.style.display = "none";
        }, 5000);

    }

    const enlaceGif1 = document.querySelectorAll('.enlace-gif1');
    traerGif1(gifApi1, enlaceGif1);
}

// //traer gif al dar click en alguna sugerencia
function traerGif1(gifApi1, enlaceGif1) {

    for (let i = 0; i < enlaceGif1.length; i++) {
        enlaceGif1[i].addEventListener('click', (e) => {
            searchButton1.style.display = "block";
            closeButton1.style.display = "none";
            searchInput1.value = '';
            e.preventDefault();
            for (let j = 0; j < gifApi1.length; j++) {
                if (enlaceGif1[i].innerText === (gifApi1[j].title)) {
                    searchGifs1.innerHTML +=
                        `<a class="gif-Img">
                           <img class="hover-img" src="${gifApi1[j].images.downsized.url}"></img> 
                            <div class=remover>
                              <p class="title-gif">${gifApi1[j].title}</p>
                            </div>               
                         </a>
                        `;
                    limpiarHTML1();
                };
            };
            const gifImg1 = document.querySelectorAll('.gif-Img');
            gifImgFunction(gifImg1);
        });

    };
};
//si no esta vacio
function buscargif1() {
    if (searchInput1.value === '') {
        busquedaRechazada1.style.display = "flex";
        setTimeout(() => {
            busquedaRechazada1.style.display = "none";
        }, 5000);
    } else {
        searchGifApiImagenes1();
    }
};

//traer gifs al dar click en la lupa o enter
function mostrarGif1(data1) {
    limpiarHTML1();
    let cont1 = 0;
    for (let i = 0; i < data1.length; i++) {
        searchButton1.style.display = "block";
        closeButton1.style.display = "none";
        if (data1[i].title.includes(searchInput1.value)) {
            if (cont1 < 12) {
                searchGifs1.innerHTML +=
                    `<a class="gif-Img">
                       <img class="hover-img" src="${data1[i].images.downsized.url}"></img> 
                       <div class=remover>
                          <p class="title-gif">${data1[i].title}</p>
                       </div>               
                     </a>
                    `;
            }
            cont1++;
        } else
        if (cont1 >= 12) {
            verMas1.style.display = "flex";
        }
    };
    const gifImg1 = document.querySelectorAll('.gif-Img');
    gifImgFunction(gifImg1);

};

function addGif1() {
    searchoff1 += 12;
    searchGifApiImagenes1();
};

//funciones para pantallas small
function gifImgFunction(gifImg1) {

    gifImg1.forEach(gif => {
        gif.addEventListener('click', () => {
            console.log(gifImg1)
            const gifSmall = gif.childNodes[1].src;
            const titleSmall = gif.childNodes[3].children[0].textContent;

            let ampliarSmall = {
                'titulo': titleSmall,
                'url': gifSmall
            };
            localStorage.setItem('ampliar', JSON.stringify(ampliarSmall));
            gif.href = "./gifAmpliado.html";
        });
    });
};