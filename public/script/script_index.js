import {
    formatDate,
    getPosterPath,
    headerMenu,
    LoginRegister,
    profilHeader,
    successMessageToast,
    searchBarHeader,
    reponsiveMenu,
    responsiveBtnSearch,
} from './function/function.js';
import {displayMessageToast} from './function/function.js';
import {yearsFormat} from './function/function.js';
import {generateSlug} from './function/function.js';

const btnHeaderloginRegister = document.querySelector("#btnHeaderLoginRegister");
const btnHeaderloginMobil = document.querySelector('#btnHeaderloginMobil');
const btnHeaderProfile = document.querySelector('#btnHeaderProfile');
const containerModalDialog = document.querySelector('#containerModalDialog');

if (btnHeaderloginRegister) {
    LoginRegister(btnHeaderloginRegister);
}
if (btnHeaderloginMobil) {
    LoginRegister(btnHeaderloginMobil);
}
if (btnHeaderProfile) {
    await headerMenu();
    await profilHeader(btnHeaderProfile);
}
searchBarHeader();
reponsiveMenu();
responsiveBtnSearch();


// INDEX PAGE

let containerPopularMovies = document.querySelector('#containerPopularMovies');
let containerMoviesWeekOrDay = document.querySelector('#containerMoviesWeekOrDay');
const btnTrendingWeek = document.querySelector('#btnTrendingWeek');
const btnTrendingDay = document.querySelector('#btnTrendingDay');
const containerQuickAccessImg = document.querySelector('#containerQuickAccessImg');

// Creation d'un barre de recherche
// Recupération des données de l'API Films populaires
function createVoteCircle(voteAverage) {
    const percentage = (voteAverage / 10) * 100;
    const aroundPercentage = Math.round(percentage / 10) * 10;
    const hue = (1 - percentage / 100) * 120;
    const color = `hsl(${hue}, 100%, 50%)`;

    const circleHTML = `
    <div class="flex justify-end w-full vote-circle absolute">
        <div class="flex items-center justify-center p-1 m-2 rounded bg-gray-800/40">
            <span class="flex items-start">${aroundPercentage}
                <span class="text-xs">%</span>
            </span>
        </div>
    </div>
    `;
    return circleHTML;
}
function displayMovies(data) {
    if (data.results) {
        const displayCard = document.createElement('div');
        displayCard.id = 'moviesCard';
        displayCard.classList.add('flex', 'flex-row', 'gap-5', 'overflow-x-scroll', 'py-5', 'w-full', 'h-[350px]');
        data.results.forEach((movie) => {
            if (movie.title) {
            displayCard.innerHTML += `
                <div class="flex flex-col pl-5 gap-2 text-white">
                    <a href="${window.location.origin}/cinetech/movie/${movie.id}-${generateSlug(movie.title)}">
                        <div class="relative">
                            ${createVoteCircle(movie.vote_average)}
                        </div>
                        <img src="${getPosterPath(movie.poster_path)}" class="w-[150px] h-[225px] shadow-sm rounded-md">
                        <div class="flex flex-col px-3 w-[150px]">
                            <h2 class="text-sm font-bold hover:text-[#9c4ef4]">${movie.title}</h2>
                            <p class="text-xs opacity-70">${formatDate(movie.release_date)}</p>
                        </div>
                    </a>
                </div>
            `;
            } else {
                displayCard.innerHTML += `
                <div class="flex flex-col pl-5 gap-2 text-white">
                    <a href="${window.location.origin}/cinetech/series/${movie.id}-${generateSlug(movie.name)}">
                        <div class="relative">
                            ${createVoteCircle(movie.vote_average)}
                        </div>
                        <img src="${getPosterPath(movie.poster_path)}" class="w-[150px] h-[225px] shadow-sm rounded-md">
                        <div class="flex flex-col px-3 w-[150px]">
                            <h2 class="text-sm font-bold hover:text-[#9c4ef4]">${movie.name}</h2>
                            <p class="text-xs opacity-70">${formatDate(movie.first_air_date)}</p>
                        </div>
                    </a>
                </div>
            `;
            }
        });
        containerMoviesWeekOrDay.appendChild(displayCard);
    }
}

async function trendingWeek() {
    await fetch('https://api.themoviedb.org/3/trending/all/week?api_key=336f5174afdbef18cdcc2f6d25e36288&language=fr-FR&page=1')
        .then((response) => response.json())
        .then((data) => displayMovies(data));
}

async function trendingDay() {
    await fetch('https://api.themoviedb.org/3/trending/all/day?api_key=336f5174afdbef18cdcc2f6d25e36288&language=fr-FR&page=1')
        .then((response) => response.json())
        .then((data) => displayMovies(data));
}

const urlPopular = 'https://api.themoviedb.org/3/movie/popular?api_key=336f5174afdbef18cdcc2f6d25e36288&language=fr-FR&page=1';
async function getPopularMovies () {
    await fetch(urlPopular)
        .then((response) => response.json())
        .then((data) => {
            const containerMoviesIndex = document.querySelector('#containerMoviesIndex');
            if (data.results) {
                const moviesCard = document.createElement('div');
                moviesCard.id = 'moviesCard';
                moviesCard.classList.add('flex', 'flex-row', 'gap-5', 'overflow-x-scroll', 'py-5', 'w-full', 'h-[350px]');
                data.results.forEach((movie) => {
                    moviesCard.innerHTML += `
                        <div class="flex flex-col pl-5 gap-2 text-white">
                            <a href="${window.location.origin}/cinetech/movie/${movie.id}-${generateSlug(movie.title)}">
                                <div class="relative">
                                    ${createVoteCircle(movie.vote_average)}
                                </div>
                            <img src="${getPosterPath(movie.poster_path)}" class="w-[150px] h-[225px] shadow-sm rounded-md">
                                <div class="flex flex-col px-3 w-[150px]">
                                    <h2 class="text-sm font-bold hover:text-[#9c4ef4]">${movie.title}</h2>
                                    <p class="text-xs opacity-70">${formatDate(movie.release_date)}</p>
                                </div>
                            </a>
                        </div>
                    `;
                });
                containerMoviesIndex.appendChild(moviesCard);
            }
        });
}
async function getPopularSeries () {
    await fetch('https://api.themoviedb.org/3/tv/popular?api_key=336f5174afdbef18cdcc2f6d25e36288&language=fr-FR&page=1')
        .then((response) => response.json())
        .then((data) => {
            const containerSeriesIndex = document.querySelector('#containerSeriesIndex');
            if (data.results) {
                const seriesCard = document.createElement('div');
                seriesCard.setAttribute('id', 'seriesCard')
                seriesCard.classList.add('flex', 'flex-row', 'gap-5', 'overflow-x-scroll', 'py-5', 'w-full', 'h-[350px]');
                data.results.forEach((serie) => {
                    seriesCard.innerHTML += `
                        <div class="flex flex-col pl-5 gap-2">
                            <a href="${window.location.origin}/cinetech/series/${serie.id}-${generateSlug(serie.name)}">
                            <img src="${getPosterPath(serie.poster_path)}" class="w-[150px] h-[225px] shadow-sm rounded-md">
                                <div class="flex flex-col px-3 w-[150px]">
                                    <h2 class="text-sm font-bold text-center">${serie.name}</h2>
                                    <p class="text-xs text-center">${formatDate(serie.first_air_date)}</p>
                                </div>
                            </a>
                        </div>
                    `;
                });
                containerSeriesIndex.appendChild(seriesCard);
            }
        });
}
async function mostPopularHeader() {
    await fetch('https://api.themoviedb.org/3/trending/all/week?api_key=336f5174afdbef18cdcc2f6d25e36288&language=fr-FR&page=1')
        .then((response) => response.json())
        .then((data) => {
            let result = data.results[0];
            let original_img_url = 'https://image.tmdb.org/t/p/original';
            containerQuickAccessImg.innerHTML = `
                <img src="${original_img_url}${result.backdrop_path}" alt="Background Image" class="flex items-center justify-center w-full h-[42vh] object-cover absolute inset-0 z-[-10] bg-[#1F0C19AD]" id="backdropMovie">
            `;
        });
}
mostPopularHeader();
trendingWeek();
btnTrendingWeek.addEventListener('click', () => {
    containerMoviesWeekOrDay.innerHTML = '';
    trendingWeek();
});
btnTrendingDay.addEventListener('click', () => {
    containerMoviesWeekOrDay.innerHTML = '';
    trendingDay();
});
getPopularMovies();
getPopularSeries();