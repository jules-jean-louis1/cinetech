import { LoginRegister } from './function/function.js';
import { profilHeader } from "./function/function.js";
import { formatDate } from "./function/function.js";

const btnHeaderloginRegister = document.querySelector('#btnHeaderLoginRegister');
const btnHeaderLogout = document.querySelector('#btnHeaderLogout');
const btnHeaderProfile = document.querySelector('#btnHeaderProfile');

if (btnHeaderloginRegister) {
    LoginRegister(btnHeaderloginRegister);
}
if (btnHeaderProfile) {
    profilHeader(btnHeaderProfile);
}

// INDEX PAGE

let containerPopularMovies = document.querySelector('#containerPopularMovies');
// Recupération des données de l'API Films populaires
const urlPopular = 'https://api.themoviedb.org/3/movie/popular?api_key=336f5174afdbef18cdcc2f6d25e36288&language=fr-FR&page=1';
async function getPopularMovies () {
    await fetch(urlPopular)
        .then((response) => response.json())
        .then((data) => {
            containerPopularMovies.innerHTML = '';
            if (data.results) {
                const getPosterPath = (posterPath) => {
                    return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterPath}`;
                };
                const moviesCard = document.createElement('div');
                data.results.forEach((movie) => {
                    moviesCard.innerHTML += `
                        <div class="flex flex-col pl-5 gap-2">
                        <img src="${getPosterPath(movie.poster_path)}" class="w-[150px] h-[225px] shadow-sm rounded-md">
                            <div class="flex flex-col px-3 w-[150px]">
                                <h2 class="text-sm font-bold text-center">${movie.title}</h2>
                                <p class="text-xs text-center">${formatDate(movie.release_date)}</p>
                            </div>
                        </div>
                    `;
                });
                containerPopularMovies.appendChild(moviesCard);
            }
            console.log(data);
        });
}
getPopularMovies();