'use strict';
//APIKEY
const apiKey = '3H1hcaSGEO7fnIn2fQooiE2fghYi23OK';

//VARIABLES
const download = document.querySelector('#download');
const iconosMisGifos = document.querySelector('.iconos-misgifos');
const linkGif = document.querySelector('.link-gif');
const videoOne = document.querySelector('video');
const gifSubido = document.querySelector('.gif-subido-correctamente');
const textLoaderGif = document.querySelector('.text-loader-gif')
const gif = document.querySelector('#gif');
const grabarVideo = document.getElementById('grabar-video');
const comenzar = document.getElementById('button-video');
const videoGif = document.querySelector('.video-gif');
const titleVideo = document.querySelector('.title-video');
const num1 = document.querySelector('.num1');
const num2 = document.querySelector('.num2');
const num3 = document.querySelector('.num3');
const btnStartRecording = document.getElementById('btn-start-recording');
const btnStopRecording = document.getElementById('btn-stop-recording');
const subirGifo = document.getElementById('subir-gifo');
const minutosSelector = document.querySelector('.minutos-video');
let recorder;
let blob;
let h = 0;
let m = 0;
let s = 0;

//crear img
let imgGifUpload = document.createElement('IMG');

//EVENTOS
/**
 * downloan: evento click sobre icono de descargar gif.
 * 
 * comenzar: evento click inicia dando click en comenzar 
 * para despues acceder a funcion de permisos.
 * 
 * btnStopRecording:evento click detiene gif.
 */

download.addEventListener('click', downloadGifFunction);

comenzar.addEventListener('click', () => {
    comenzar.style.display = "none";
    titleVideo.style.display = "none";
    num1.style.background = "var(--primary-text)";
    num1.style.color = "var(--background-color)";
    getStreamAndRecord();
});


btnStopRecording.addEventListener('click', () => {
    recorder.stopRecording(stopRecordingCallback);
});

//FUNCIONES 
/**
 * funcion getStreamAndRecord: verifica permisos para acceder a la camara local
 */
async function getStreamAndRecord() {
    const constraints = {
        audio: false,
        video: { width: { max: 500 }, height: { max: 400 } }
    };
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleSuccess(stream);
        captureCamera(stream);
    } catch (err) {
        console.error('fetch failed', err);
        alert('debe dar acceso a la camara');
    };
};

function handleSuccess(stream) {
    subirGifo.style.display = "none";
    videoOne.style.display = "flex";
    btnStartRecording.style.display = "block";
    btnStopRecording.style.display = "none";
    videoOne.srcObject = stream;
    imgGifUpload.src = "";
    videoOne.play();
};

//GRABAR
function captureCamera(camera) {
    btnStartRecording.addEventListener('click', () => {
        gif.appendChild(imgGifUpload);
        const hoverGifUpload = document.querySelector('.hover-gif');
        if (hoverGifUpload) {
            hoverGifUpload.style.opacity = "1";
        };
        iconosMisGifos.style.display = "none";
        gifSubido.style.display = "none";
        videoOne.style.display = "none";
        gif.style.display = "flex";
        num1.style.background = "var(--background-color)";
        num1.style.color = "var(--primary-text)";
        num2.style.background = "var(--primary-text)";
        num2.style.color = "var(--background-color)";
        btnStartRecording.style.display = "none";
        minutosSelector.style.display = "flex";
        btnStopRecording.style.display = "block";
        recorder = RecordRTC(camera, {
            type: 'gif',
            frameRate: 1,
            quality: 10,
            width: 360,
            height: 200,
            hidden: 240,
            onGifRecordingStarted: function() {
                console.log('stars')
            },
            onGifPreview: function(gifURL) {
                imgGifUpload.src = gifURL;
            }
        });
        recorder.startRecording();
        recorder.camera = camera;
        cronometrar();
    });
};

//parar reproducion
function stopRecordingCallback() {
    blob = recorder.getBlob();
    imgGifUpload.src = URL.createObjectURL(blob);
    subirGifo.style.display = "flex";
    parar();
};

/**
 * evento subir video a giphy
 */
subirGifo.addEventListener('click', () => {
    minutosSelector.style.display = "none";
    subirGifo.style.display = "none";
    num2.style.background = "var(--background-color)";
    num2.style.color = "var(--primary-text)";
    num3.style.background = "var(--primary-text)";
    num3.style.color = "var(--background-color)";
    gif.classList.add("hover-gif");
    textLoaderGif.style.display = "block";

    setTimeout(() => {
        iconosMisGifos.style.display = "block";
        textLoaderGif.style.display = "none";
        gifSubido.style.display = "block";
        btnStartRecording.style.display = "block";
        num3.style.background = "var(--background-color)";
        num3.style.color = "var(--primary-text)";
    }, 5000);
    subirGifApi();
});

/**
 * cronometro 
 * -iniciar
 * -parar
 * -reiniciar
 */
var id = setInterval(escribir, 1000);

function cronometrar() {
    escribir();
};

function escribir() {
    var hAux, mAux, sAux;
    s++;
    if (s > 59) {
        m++;
        s = 0;
    };
    if (m > 59) {
        h++;
        m = 0;
    };
    if (h > 24) { h = 0; };
    if (s < 10) { sAux = "0" + s; } else { sAux = s; };
    if (m < 10) { mAux = "0" + m; } else { mAux = m; };
    if (h < 10) { hAux = "0" + h; } else { hAux = h; };
    minutosSelector.innerHTML = hAux + ":" + mAux + ":" + sAux;
};

function parar() {
    clearInterval(id);
    minutosSelector.innerHTML = "REPETIR CAPTURA";
    minutosSelector.style.borderBottom = "1px solid #50E3C2";
    minutosSelector.style.cursor = "pointer";
    btnStopRecording.style.display = "none";
};

minutosSelector.onclick = () => {
    subirGifo.style.display = "none";
    minutosSelector.innerHTML = "REPETIR CAPTURA";
    btnStartRecording.style.display = "block";
    reiniciar();
};

function reiniciar() {
    clearInterval(id);
    minutosSelector.innerHTML = "00:00:00";
    h = 0;
    m = 0;
    s = 0;
};



//UPLOAD API 
//acceder a api para subir a cuenta de giphy
async function subirGifApi() {
    const form = new FormData();
    form.append('file', blob, 'myGif.gif');
    try {
        const resp = await fetch(`https://upload.giphy.com/v1/gifs?api_key=${apiKey}`, { method: 'post', body: form });
        const data = await resp.json();
        // console.log(data)
        const upload = data.data.id;
        gifUpload(upload);
    } catch (err) {
        console.error('fetch failed', err);
    };
};

/**
 * @param {datos traidos de api} upload 
 * 
 */
async function gifUpload(upload) {
    try {
        const url = `https://api.giphy.com/v1/gifs/${upload}?api_key=${apiKey}`;
        const resp = await fetch(url);
        const data = await resp.json();
        const gifUploadAdd = data.data.images.original.url;
        const titleUploadAdd = data.data.title;
        const uploadLocal = {
            url: gifUploadAdd,
            title: titleUploadAdd || 'MI-GIF'
        };
        almacenarGifLocal(uploadLocal);
    } catch (err) {
        console.error('fetch failed', err);
    };
};

/**
 * alamacenar en un array cada que se grabe un nuevo gif
 * guardar cada gif en local storage
 */

function almacenarGifLocal(uploadLocal) {
    let arrayUpload = [];
    arrayUpload.push(uploadLocal);
    let dataLocalStorage = localStorage.getItem('upload');
    if (dataLocalStorage == null) {
        localStorage.setItem('upload', JSON.stringify(arrayUpload));
    } else {
        let data = JSON.parse(dataLocalStorage);
        data.push(uploadLocal);
        localStorage.setItem('upload', JSON.stringify(data));
    };
    linkGifUpload(arrayUpload);
};

/**
 * funciones para cada icono
 * -link copiar
 * -descargar
 * 
 * @param {tipo de dato array} arrayUpload  * 
 */

//COPY LINK
function linkGifUpload(arrayUpload) {
    linkGif.addEventListener('click', () => {
        for (let i = 0; i < arrayUpload.length; i++) {
            //como copiar y que pueda pegarlo en otro lado
            navigator.clipboard.writeText(arrayUpload[i].url)
        };
    });
};

//icono de descargar
function downloadGifFunction() {
    invokeSaveAsDialog(blob);
};