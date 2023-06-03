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


// TV SHOW PAGE
const apiKey = '336f5174afdbef18cdcc2f6d25e36288';
const language = 'fr-FR';
let getGenreIn = [];

function getPopularTVShows(page, sortOption, genreIds) {
    const genreQueryString = genreIds.join(',');
    const url = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=${language}&sort_by=${sortOption}&with_genres=${genreQueryString}&page=${page}`;

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
    const response = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=${language}`);
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
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=${language}&with_genres=${genreQueryString}&page=${page}&sort_by=${sortOption}`);
    const data = await response.json();
    displayMovies(data.results);
}

function displayMovies(movies) {
    const containerSeries = document.querySelector('#containerSeries');
    let movieHTML = '';
    for (const movie of movies) {
        movieHTML += `
        <div data-genre="${movie.genre_ids.join(',')}">
        <div class="flex flex-col items-center gap-2 rounded text-white p-2 bg-[#2a1825] border border-[#362431]">
            <a href="/cinetech/series/${movie.id}-${generateSlug(movie.name)}">
            <img src="${getPosterPath(movie.poster_path)}" class="w-[150px] h-[225px] shadow-sm rounded-md" alt="${movie.name}">
            <div class="flex flex-col px-3 w-[150px]">
                <h2 class="text-sm font-bold text-center">${movie.name}</h2>
                <p class="text-xs text-center">${formatDate(movie.first_air_date)}</p>
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
    containerSeries.innerHTML = movieHTML;

    async function bookmarkedTVshow() {
        const btnAddToWatchlistList = document.querySelectorAll('#btnAddToWatchlist');
        const containerBtnBookmarkList = document.querySelectorAll('#containerBtnBookmark');

        await fetch(`${window.location.origin}/cinetech/isLogged`)
            .then(response => response.json())
            .then(data => {
                if (data) {
                    // Si l'utilisateur est connecté, on vérifie si le film est dans ses favoris
                    fetch(`${window.location.origin}/cinetech/getBookmarksTV`)
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
                } else {
                    btnAddToWatchlistList.forEach(btnAddToWatchlist => {
                        btnAddToWatchlist.addEventListener('click', (event) => {
                            displayMessageToast(containerModalDialog, 'Vous devez être connecté pour ajouter un film à votre watchlist', 'info');
                        });
                    });
                }
            });
    }
    bookmarkedTVshow();

}


function removeMoviesByGenres(genreIds) {
    const containerSeries = document.querySelector('#containerSeries');
    for (const genreId of genreIds) {
        const movies = containerSeries.querySelectorAll(`[data-genre="${genreId}"]`);
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

const buttonGenre = document.querySelector('#buttonGenre');
buttonGenre.addEventListener('click', () => {
    containerGenres.classList.toggle('hidden');
});