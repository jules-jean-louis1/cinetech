import {displayMessageToast, headerMenu, LoginRegister, yearsFormat} from './function/function.js';
import { profilHeader } from "./function/function.js";
import { formatDate } from "./function/function.js";
import { getPosterPath } from "./function/function.js";
import { successMessageToast } from './function/function.js';
import { searchBarHeader } from "./function/function.js";

const btnHeaderloginRegister = document.querySelector('#btnHeaderLoginRegister');
const btnHeaderLogout = document.querySelector('#btnHeaderLogout');
const btnHeaderProfile = document.querySelector('#btnHeaderProfile');
const containerModalDialog = document.querySelector('#containerModalDialog');
const containerSearchBar = document.querySelector('#containerSearchBar');

if (btnHeaderloginRegister) {
    LoginRegister(btnHeaderloginRegister);
}
if (btnHeaderProfile) {
    await profilHeader(btnHeaderProfile);
    await headerMenu();
}
searchBarHeader();


// MOVIE PAGE

// Creation des filtres

const containerGenres = document.querySelector('#containerGenres');
const containerMovies = document.querySelector('#containerMovies');


const apiKey = '336f5174afdbef18cdcc2f6d25e36288';
const language = 'fr-FR';
let getGenreIn = [];

function getPopularTVShows(page, sortOption, genreIds) {
    const genreQueryString = genreIds.join(',');
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${language}&sort_by=${sortOption}&with_genres=${genreQueryString}&page=${page}`;

    if (!sortOption) {
        sortOption = defaultSortOption;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);
        })
        .catch(error => console.log(error));
}

const previousPageButton = document.getElementById('previousPageButton');
const nextPageButton = document.getElementById('nextPageButton');
let currentPage = 1;

previousPageButton.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        getPopularTVShows(currentPage, sortOption, selectedGenres);
    }
});
nextPageButton.addEventListener('click', () => {
    currentPage++;
    getPopularTVShows(currentPage, sortOption, selectedGenres);
});

async function getGenre() {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=${language}`);
    const data = await response.json();
    return data;
}
function displayGenre() {
    const displayGenre = document.querySelector('#containerGenres');
    const genreData = getGenre();
    const selectedGenres = []; // Tableau des genres sélectionnés
    let currentPage = 1;

    genreData.then(data => {
        let optionHTML = '';
        for (const element of data.genres) {
            optionHTML += `
                <div data-id="${element.id}" class="w-fit">
                    <button type="button" name="genre" id="btnGenre_${element.id}" class="border border-white/50 rounded p-1 w-fit">
                        ${element.name}
                    </button>
                </div>
            `;
        }
        displayGenre.innerHTML = optionHTML;

        const previousPageButton = document.getElementById('previousPageButton');
        const nextPageButton = document.getElementById('nextPageButton');
        const sortForm = document.getElementById('sort-form');
        const sortBySelect = document.getElementById('sort-by');

        previousPageButton.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                getMoviesByGenres(selectedGenres, currentPage, sortBySelect.value);
            }
        });

        nextPageButton.addEventListener('click', () => {
            currentPage++;
            getMoviesByGenres(selectedGenres, currentPage, sortBySelect.value);
        });

        sortForm.addEventListener('change', (event) => {
            event.preventDefault();
            getMoviesByGenres(selectedGenres, currentPage, sortBySelect.value);
        });

        for (const element of data.genres) {
            const btnGenre = document.querySelector(`#btnGenre_${element.id}`);
            btnGenre.addEventListener('click', (event) => {
                if (event.target.classList.contains('border-white/50')) {
                    event.target.classList.remove('border-white/50');
                    event.target.classList.add('bg-[#fffe3e]', 'border', 'border-[#fffe3e]', 'text-black', 'font-bold');
                    selectedGenres.push(element.id); // Ajouter le genre sélectionné au tableau
                } else {
                    event.target.classList.remove('bg-[#fffe3e]', 'border-[#fffe3e]', 'text-black', 'font-bold');
                    event.target.classList.add('border-white/50');
                    const index = selectedGenres.indexOf(element.id);
                    if (index !== -1) {
                        selectedGenres.splice(index, 1); // Supprimer le genre sélectionné du tableau
                    }
                }
                getMoviesByGenres(selectedGenres, currentPage, sortBySelect.value); // Appeler la fonction avec les genres sélectionnés, la page actuelle et l'option de tri sélectionnée
            });
        }
    });
}
async function getMoviesByGenres(genreIds, page, sortOption) {
    const genreQueryString = genreIds.join(',');
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=${language}&with_genres=${genreQueryString}&page=${page}&sort_by=${sortOption}`);
    const data = await response.json();
    displayMovies(data.results);
}

function generateSlug(title) {
    let slug = title.toLowerCase(); // Convertit le titre en minuscules
    slug = slug.replace(/[^a-z0-9]+/g, '-'); // Remplace les caractères non alphabétiques et non numériques par des tirets
    slug = slug.replace(/^-+|-+$/g, ''); // Supprime les tirets en début et en fin de chaîne
    return slug;
}

function displayMovies(movies) {
    const containerMovies = document.querySelector('#containerMovies');
    let movieHTML = '';
    for (const movie of movies) {
        movieHTML += `
        <div data-genre="${movie.genre_ids.join(',')}">
        <div class="flex flex-col items-center gap-2 rounded text-white p-2 bg-[#2a1825] border border-[#362431]">
            <a href="/cinetech/series/${movie.id}-${generateSlug(movie.title)}">
            <img src="${getPosterPath(movie.poster_path)}" class="w-[150px] h-[225px] shadow-sm rounded-md" alt="${movie.title}">
            <div class="flex flex-col px-3 w-[150px]">
                <h2 class="text-sm font-bold text-center">${movie.title}</h2>
                <p class="text-xs text-center">${formatDate(movie.release_date)}</p>
            </div>
            </a>
            <div id="containerBtnBookmark">
            <button type="button" id="btnAddToWatchlist" class="flex items-center gap-2" data-id="${movie.id}">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fffe3e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/>
                </svg>
                Favoris
            </button>
            </div>
        </div>
      </div>
    `;
    }
    containerMovies.innerHTML = movieHTML;

    async function bookmarkedTVshow() {
        const btnAddToWatchlistList = document.querySelectorAll('#btnAddToWatchlist');
        const containerBtnBookmarkList = document.querySelectorAll('#containerBtnBookmark');

        await fetch(`${window.location.origin}/cinetech/getBookmarksTV`)
            .then(response => response.json())
            .then(data => {
                for (const show of data) {
                    for (let i = 0; i < btnAddToWatchlistList.length; i++) {
                        const btnAddToWatchlist = btnAddToWatchlistList[i];
                        const containerBtnBookmark = containerBtnBookmarkList[i];
                        if (btnAddToWatchlist.dataset.id === show.movie_id.toString()) {
                            containerBtnBookmark.innerHTML = `
                <button type="button" id="btnRemoveFromWatchlist" class="flex items-center gap-2" data-id="${show.movie_id}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fffe3e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor"/>
                    </svg>
                    Favoris
                </button>
            `;
                        }
                    }
                }
            });
        for (const movie of movies) {
            const btnAddToWatchlist = document.querySelector(`#btnAddToWatchlist[data-id="${movie.id}"]`);
            if (btnAddToWatchlist){
                btnAddToWatchlist.addEventListener('click', async (event) => {
                    event.preventDefault();
                    await fetch(`${window.location.origin}/cinetech/addBookmarks/${movie.id}/${movie.media_type}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                const containerBtnBookmark = btnAddToWatchlist.parentElement;
                                containerBtnBookmark.innerHTML = `
                    <button type="button" id="btnRemoveFromWatchlist" class="flex items-center gap-2" data-id="${show.movie_id}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fffe3e" fill="#fffe3e" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor"/>
                    </svg>
                    Favoris
                </button>
                            `;
                                displayMessageToast(containerModalDialog,'Série ajoutée à votre watchlist', 'success');
                                bookmarkedTVshow();
                            }
                        });
                });
            }
        }
        for (const movie of movies) {
            const btnRemoveFromWatchlist = document.querySelector(`#btnRemoveFromWatchlist[data-id="${movie.id}"]`);
            if (btnRemoveFromWatchlist){
                btnRemoveFromWatchlist.addEventListener('click', async (event) => {
                    event.preventDefault();
                    await fetch(`${window.location.origin}/cinetech/removeBookmarks/${movie.id}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                const containerBtnBookmark = btnRemoveFromWatchlist.parentElement;
                                containerBtnBookmark.innerHTML = `
                    <button type="button" id="btnAddToWatchlist" data-id="${movie.id}">Ajouter à ma watchlist</button>
                `;
                                displayMessageToast(containerModalDialog,'Série retirée de votre watchlist', 'success');
                                bookmarkedTVshow();
                            }
                        });
                });
            }
        }
    }
    //bookmarkedTVshow();

}


function removeMoviesByGenres(genreIds) {
    const containerMovies = document.querySelector('#containerMovies');
    for (const genreId of genreIds) {
        const movies = containerMovies.querySelectorAll(`[data-genre="${genreId}"]`);
        for (const movie of movies) {
            movie.remove();
        }
    }
}
async function getBookmarkedMovies() {
    await fetch(`${window.location.origin}/cinetech/getBookmarksTV`)
        .then(response => response.json())
        .then(data => {
            const btnAddToWatchlist = document.querySelector('.btnAddToWatchlist');
            const containerBtnBookmark = document.querySelector('#containerBtnBookmark');
            for (const show of data) {
                // console.log(show.movie_id);
                if (btnAddToWatchlist.dataset.id === show.movie_id) {
                    containerBtnBookmark.innerHTML = `
                    <button type="button" class="btnRemoveFromWatchlist" data-id="${show.id}">Retirer de ma watchlist</button>
                `;
                }
            }
        });

}


// Appel de la fonction pour afficher les genres
displayGenre();
const defaultSortOption = 'popularity.desc';
const defaultGenreIds = []; // Ajoutez ici les identifiants des genres par défaut que vous souhaitez utiliser

getPopularTVShows(currentPage, defaultSortOption, defaultGenreIds);

/*async function getGenres() {
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
}*/


