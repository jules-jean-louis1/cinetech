import { LoginRegister } from './function/function.js';
import { profilHeader } from "./function/function.js";
import { formatDate } from "./function/function.js";
import { getPosterPath } from "./function/function.js";
import { headerMenu } from "./function/function.js";

const btnHeaderloginRegister = document.querySelector('#btnHeaderLoginRegister');
const btnHeaderLogout = document.querySelector('#btnHeaderLogout');
const btnHeaderProfile = document.querySelector('#btnHeaderProfile');

if (btnHeaderloginRegister) {
    LoginRegister(btnHeaderloginRegister);
}
if (btnHeaderProfile) {
    profilHeader(btnHeaderProfile);
    headerMenu();
}


// MOVIE DETAIL PAGE
// Récupérer l'URL actuelle
const url = window.location.href;
const segments = url.split('/');
const lastSegment = segments[segments.length - 1];
const idAndSlug = lastSegment.split('-');
const UrlId = idAndSlug[0];

// Récupérer les données du film
const containerMovies = document.querySelector('#containerMovies');
const detailMovie = document.querySelector('#detailMovie');

const apiKey = '336f5174afdbef18cdcc2f6d25e36288';
const language = 'fr-FR';
async function getMovie(UrlId){
    await fetch(`https://api.themoviedb.org/3/movie/${UrlId}?api_key=${apiKey}&language=${language}`)
        .then((response) => response.json())
        .then((data) => {
            const titlePage = document.querySelector('title');
            titlePage.innerHTML = `${data.title} - MovieDB`;
            const ContainerMovie = document.createElement('div');
            ContainerMovie.className = 'flex flex-col gap-4';
            ContainerMovie.innerHTML = `
                <div class="flex flex-row">
                    <img src="${getPosterPath(data.poster_path)}" alt="${data.title}" class="w-96">
                    <div class="flex flex-col gap-4">
                        <h1 class="text-3xl font-bold">${data.title}</h1>
                        <p class="text-sm">${formatDate(data.release_date)}</p>
                        <p class="text-sm">${data.runtime} min</p>
                        <p class="text-sm">${data.vote_average}/10</p>
                        <p class="text-sm">${data.vote_count} votes</p>
                        <div class="flex flex-row gap-2">
                            <h3 class="text-sm">Genres:</h3>
                            <div id="containerGenres" class="flex space-x-4"></div>
                        </div>
                        <p class="text-sm">${data.status}</p>
                        <p class="text-sm">${data.overview}</p>
                    </div>
                </div>
            `;
            detailMovie.appendChild(ContainerMovie);
            for (let i = 0; i < data.genres.length; i++) {
                console.log(data.genres[i].name);
                const displayGenres = document.querySelector('#containerGenres');
                displayGenres.innerHTML += `
                    <p class="text-sm">${data.genres[i].name}</p>
                `;
            }
            console.log(data);

        });

}

getMovie(UrlId);
