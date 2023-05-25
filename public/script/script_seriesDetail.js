import {formatDate, getPosterPath, headerMenu, LoginRegister, profilHeader} from './function/function.js';
import {displayMessageToast} from './function/function.js';

const btnHeaderloginRegister = document.querySelector('#btnHeaderLoginRegister');
const btnHeaderLogout = document.querySelector('#btnHeaderLogout');
const btnHeaderProfile = document.querySelector('#btnHeaderProfile');
const containerModalDialog = document.querySelector('#containerModalDialog');

if (btnHeaderloginRegister) {
    LoginRegister(btnHeaderloginRegister);
}
if (btnHeaderProfile) {
    await headerMenu();
    await profilHeader(btnHeaderProfile);
}
// MOVIE SERIES PAGE
// Récupérer l'URL actuelle
const url = window.location.href;
const segments = url.split('/');
const lastSegment = segments[segments.length - 1];
const idAndSlug = lastSegment.split('-');
const UrlId = idAndSlug[0];

// Récupérer les données du film
const containerMovies = document.querySelector('#containerSeries');
const detailMovie = document.querySelector('#detailSeries');
const containerCast = document.querySelector('#containerCast');
const containerSimilarMovies = document.querySelector('#containerSimilarSeries');

const apiKey = '336f5174afdbef18cdcc2f6d25e36288';
const language = 'fr-FR';
let genreMovie = '';
async function getSeriesCast(UrlId){
    await fetch(`https://api.themoviedb.org/3/tv/${UrlId}/credits?api_key=${apiKey}&language=${language}`)
        .then((response) => response.json())
        .then((data) => {
            const ContainerMovieCast = document.createElement('div');
            ContainerMovieCast.className = 'flex flex-col gap-4';
            ContainerMovieCast.innerHTML = `
                <h1 class="text-3xl font-bold">Acteurs</h1>
                <div id="containerMovieCast" class="flex flex-row gap-4 overscroll-x-auto"></div>
            `;
            containerCast.appendChild(ContainerMovieCast);
            for (let i = 0; i < 10; i++) {
                const cast = data.cast[i];
                if (cast && cast.profile_path && cast.name && cast.character) {
                    const displayMovieCast = document.querySelector('#containerMovieCast');
                    displayMovieCast.innerHTML += `
                    <div class="flex flex-col gap-2 border border-slate-200 rounded">
                        <img src="${getPosterPath(cast.profile_path)}" alt="${cast.name}" class="w-36 h-fit">
                        <p class="text-sm">${cast.name}</p>
                        <p class="text-sm text-slate-500">${cast.character}</p>
                    </div>`;
                }
            }
        });
}
async function getSimilarSeries(UrlId){
    await fetch(`https://api.themoviedb.org/3/tv/${UrlId}/recommendations?api_key=${apiKey}&language=${language}&page=1&sort_by=popularity.asc&with_genres=${genreMovie}`)
        .then((response) => response.json())
        .then((data) => {
            const ContainerSimilarMovie = document.createElement('div');
            ContainerSimilarMovie.className = 'flex flex-col gap-4';
            ContainerSimilarMovie.innerHTML = `
                <h1 class="text-3xl font-bold">Films similaires</h1>
                <div id="containerSimilarMovie" class="flex flex-row gap-4 overscroll-x-auto"></div>
            `;
            containerSimilarMovies.appendChild(ContainerSimilarMovie);
            for (let i = 0; i < 10; i++) {
                const displaySimilarMovie = document.querySelector('#containerSimilarMovie');
                displaySimilarMovie.innerHTML += `
                    <div class="flex flex-col gap-2 border border-slate-200 rounded">
                        <a href="${window.location.origin}/cinetech/series/${data.results[i].id}-${data.results[i].name.replace(/ /g, "-")}">
                            <img src="${getPosterPath(data.results[i].poster_path)}" alt="${data.results[i].name}" class="w-36 h-fit">
                            <p class="text-sm">${data.results[i].name}</p>
                        </a>
                    </div>
                `;
            }
        });
}


getSeriesCast(UrlId);
getSimilarSeries(UrlId);