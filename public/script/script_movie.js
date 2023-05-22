import { LoginRegister } from './function/function.js';
import { profilHeader } from "./function/function.js";
import { formatDate } from "./function/function.js";
import { headerMenu} from "./function/function.js";

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


// MOVIE PAGE

// Creation des filtres

const containerGenres = document.querySelector('#containerGenres');
const containerMovies = document.querySelector('#containerMovies');
const getPosterPath = (posterPath) => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterPath}`;
};

async function getGenres() {
    await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=336f5174afdbef18cdcc2f6d25e36288&language=fr-FR')
        .then((response) => response.json())
        .then((data) => {
            if (data.genres) {
                const displayGenres = document.createElement('div');
                displayGenres.id = 'genres';
                displayGenres.className = 'flex gap-2 flex-wrap';
                data.genres.forEach((genre) => {
                    displayGenres.innerHTML += `
                        <button class="genre_button w-fit rounded px-2 py-1 border-2 border-red-300" type="button" data-value="${genre.id}">${genre.name}</button>
                    `;
                });
                containerGenres.appendChild(displayGenres);
            }
        });
}
// Recupération en fonction du genre
document.addEventListener('DOMContentLoaded', async function() {
    await getGenres();

    const genreButtons = document.querySelectorAll('.genre_button');
    genreButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleGenreClick
            button.classList.toggle('bg-red-300');
        });
    });
});

function handleGenreClick(event) {
    const genreId = event.target.dataset.value;
    searchMoviesByGenre(genreId);
}
async function searchMoviesByGenre(genreId) {
    const apiKey = '336f5174afdbef18cdcc2f6d25e36288';
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.log('Une erreur s\'est produite lors de la récupération des films par genre:', error);
    }
}
function generateSlug(title) {
    let slug = title.toLowerCase(); // Convertit le titre en minuscules
    slug = slug.replace(/[^a-z0-9]+/g, '-'); // Remplace les caractères non alphabétiques et non numériques par des tirets
    slug = slug.replace(/^-+|-+$/g, ''); // Supprime les tirets en début et en fin de chaîne
    return slug;
}

function displayMovies(results) {
    containerMovies.innerHTML = '';
    const displayCard = document.createElement('div');
    displayCard.id = 'moviesCard';
    displayCard.classList.add('flex', 'flex-wrap', 'gap-5', 'overflow-x-scroll', 'py-5', 'px-10', 'w-full', 'h-[90vh]');
    results.forEach(movie => {
        displayCard.innerHTML += `
                <div class="flex flex-col pl-5 gap-2">
                <a href="/cinetech/movie/${movie.id}-${generateSlug(movie.title)}">
                    <img src="${getPosterPath(movie.poster_path)}" class="w-[150px] h-[225px] shadow-sm rounded-md">
                    <div class="flex flex-col px-3 w-[150px]">
                        <h2 class="text-sm font-bold text-center">${movie.title}</h2>
                        <p class="text-xs text-center">${formatDate(movie.release_date)}</p>
                    </div>
                </a>
                </div>
            `;
    });
    containerMovies.appendChild(displayCard);
}

//
async function getPopularMovies(page) {
    const apiKey = '336f5174afdbef18cdcc2f6d25e36288';
    const language = 'fr-FR';
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${language}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}
let currentPage = 1;

async function nextPage() {
    currentPage++;
    const movies = await getPopularMovies(currentPage);
    displayMovies(movies);
}


async function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        const movies = await getPopularMovies(currentPage);
        displayMovies(movies);
    }
}


// Ajoutez des événements aux boutons de pagination
const nextPageButton = document.getElementById('nextPageButton');
const previousPageButton = document.getElementById('previousPageButton');

nextPageButton.addEventListener('click', nextPage);
previousPageButton.addEventListener('click', previousPage);

getPopularMovies(currentPage).then(displayMovies);

// Tri des films

const sortForm = document.getElementById('sort-form');
sortForm.addEventListener('submit', handleSortFormSubmit);

function handleSortFormSubmit(event) {
    event.preventDefault();
    const sortBy = document.getElementById('sort-by').value;
    const currentPage = 1; // Réinitialisez la page à 1 lors du tri
    getMoviesBySort(sortBy, currentPage);
}
async function getMoviesBySort(sortBy, page) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=336f5174afdbef18cdcc2f6d25e36288&language=fr-FR&sort_by=${sortBy}&page=${page}`;
    const response = await fetch(url);
    const data = await response.json();
    // return data.results;
    displayMovies(data.results);
}


