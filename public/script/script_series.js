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
                <div data-id="${element.id}">
                    <button type="button" name="genre" id="btnGenre_${element.id}" class="border-2 border-black rounded-lg">
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
                if (event.target.classList.contains('border-black')) {
                    event.target.classList.remove('border-black');
                    event.target.classList.add('bg-red-500', 'border-2', 'border-red-500');
                    selectedGenres.push(element.id); // Ajouter le genre sélectionné au tableau
                } else {
                    event.target.classList.remove('bg-red-500', 'border-2', 'border-red-500');
                    event.target.classList.add('border-black', 'border-2');
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

function generateSlug(title) {
    let slug = title.toLowerCase(); // Convertit le titre en minuscules
    slug = slug.replace(/[^a-z0-9]+/g, '-'); // Remplace les caractères non alphabétiques et non numériques par des tirets
    slug = slug.replace(/^-+|-+$/g, ''); // Supprime les tirets en début et en fin de chaîne
    return slug;
}

function displayMovies(movies) {
    const containerSeries = document.querySelector('#containerSeries');
    let movieHTML = '';
    for (const movie of movies) {
        movieHTML += `
      <div data-genre="${movie.genre_ids.join(',')}">
        <div class="flex flex-col pl-5 gap-2">
          <a href="/cinetech/series/${movie.id}-${generateSlug(movie.name)}">
            <img src="${getPosterPath(movie.poster_path)}" class="w-[150px] h-[225px] shadow-sm rounded-md" alt="${movie.name}">
            <div class="flex flex-col px-3 w-[150px]">
              <h2 class="text-sm font-bold text-center">${movie.name}</h2>
              <p class="text-xs text-center">${formatDate(movie.first_air_date)}</p>
            </div>
          </a>
          <div id="containerBtnBookmark">
            <button type="button" id="btnAddToWatchlist" data-id="${movie.id}">Ajouter à ma watchlist</button>
          </div>
        </div>
      </div>
    `;
    }
    containerSeries.innerHTML = movieHTML;

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
                <button type="button" id="btnRemoveFromWatchlist" data-id="${show.movie_id}">Retirer de ma watchlist</button>
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
                    await fetch(`${window.location.origin}/cinetech/addBookmarkTV/${movie.id}`)
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                const containerBtnBookmark = btnAddToWatchlist.parentElement;
                                containerBtnBookmark.innerHTML = `
                    <button type="button" id="btnRemoveFromWatchlist" data-id="${movie.id}">Retirer de ma watchlist</button>
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
                    await fetch(`${window.location.origin}/cinetech/removeBookmarkTV/${movie.id}`)
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
