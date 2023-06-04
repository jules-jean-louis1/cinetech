import {
    formatDate,
    getPosterPath,
    headerMenu,
    LoginRegister,
    profilHeader,
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


// SEARCH PAGE
const apiKey = '336f5174afdbef18cdcc2f6d25e36288';
const language = 'fr-FR';
const previousPageButton = document.getElementById('previousPageButton');
const nextPageButton = document.getElementById('nextPageButton');
let currentPage = 1;


function displayMovies(movies) {
    const containerSeries = document.querySelector('#containerSeries');
    let movieHTML = '';
    for (const movie of movies) {
        if (movie.media_type === 'movie') {
            movieHTML += `
        <div data-genre="${movie.genre_ids.join(',')}">
            <div class="flex flex-col items-center gap-2 justify-between h-full rounded text-white p-2 bg-[#2a1825] border border-[#fffe3e]">
                <a href="/cinetech/movie/${movie.id}-${generateSlug(movie.title)}">
                <div class="relative">
                    <img src="${getPosterPath(movie.poster_path)}" class="w-[150px] h-[225px] shadow-sm rounded-md" alt="${movie.name}">
                    ${createVoteCircle(movie.vote_average)}
                    <div class="flex flex-col px-3 w-[150px]">
                        <h2 class="text-sm font-bold text-center">${movie.title}</h2>
                        <p class="text-xs text-center">${formatDate(movie.release_date)}</p>
                    </div>
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
        } else if (movie.media_type === 'tv') {
            movieHTML += `
        <div data-genre="${movie.genre_ids.join(',')}">
            <div class="flex flex-col items-center justify-between gap-2 h-full rounded text-white p-2 bg-[#2a1825] border border-[#9c4ef4]">
                <a href="/cinetech/series/${movie.id}-${generateSlug(movie.name)}">
                <div class="relative">
                    <img src="${getPosterPath(movie.poster_path)}" class="w-[150px] h-[225px] shadow-sm rounded-md" alt="${movie.name}">
                        ${createVoteCircle(movie.vote_average)}
                    <div class="flex flex-col px-3 w-[150px]">
                        <h2 class="text-sm font-bold text-center">${movie.name}</h2>
                        <p class="text-xs text-center">${yearsFormat(movie.first_air_date)}</p>
                    </div>
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

    }
    containerSeries.innerHTML = movieHTML;

    async function bookmarkedTVshow() {
        const btnAddToWatchlistList = document.querySelectorAll('#btnAddToWatchlist');
        const containerBtnBookmarkList = document.querySelectorAll('#containerBtnBookmark');
        await fetch(`${window.location.origin}/cinetech/isLogged`)
            .then(response => response.json())
            .then(async data => {
                console.log(data);
                if (data) {
                    await fetch(`${window.location.origin}/cinetech/getAllBookmarks`)
                        .then(response => response.json())
                        .then(data => {
                            for (let show of data) {
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
                                console.log(movie.media_type);
                                await fetch(`${window.location.origin}/cinetech/addBookmarks/${movie.id}/${movie.media_type}`)
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.success) {
                                            const containerBtnBookmark = btnAddToWatchlist.parentElement;
                                            containerBtnBookmark.innerHTML = `
                    <button type="button" id="btnRemoveFromWatchlist" class="flex items-center gap-2" data-id="${movie.movie_id}">
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
                                await fetch(`${window.location.origin}/cinetech/removeBookmarkTV/${movie.id}`)
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.success) {
                                            const containerBtnBookmark = btnRemoveFromWatchlist.parentElement;
                                            containerBtnBookmark.innerHTML = `
                    <button type="button" id="btnAddToWatchlist" class="flex items-center gap-2" data-id="${movie.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fffe3e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/>
                        </svg>
                        Favoris
                    </button>
                `;
                                            displayMessageToast(containerModalDialog,'Série retirée de votre watchlist', 'success');
                                            bookmarkedTVshow();
                                        }
                                    });
                            });
                        }
                    }
                } else {
                    containerBtnBookmark.innerHTML = `
                    <button type="button" id="btnAddToWatchlist" class="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fffe3e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"/>
                        </svg>
                        Favoris
                    </button>
                `;
                    const btnAddToWatchlist = document.querySelectorAll(`#btnAddToWatchlist`);
                    btnAddToWatchlist.forEach((btn) => {
                        btn.addEventListener('mousedown',  (event) => {
                            event.preventDefault();
                            displayMessageToast(containerModalDialog, 'Vous devez être connecté pour ajouter un favoris', 'info');
                        });
                    });

                }
            });

    }
    bookmarkedTVshow();
}
function createVoteCircle(voteAverage) {
    const percentage = (voteAverage / 10) * 100;
    const aroundPercentage = Math.round(percentage / 10) * 10;
    const hue = (percentage / 100) * 120;
    const color = `hsl(${hue}, 100%, 50%)`;

    const circleHTML = `
    <div class="rounded p-0.5 bg-black/60 absolute top-1 left-28" style="border-color: ${color}; border-width: 2px;">
        <p class="flex items-start">
            <span class="rounded text-xs font-bold">
                ${aroundPercentage}
                <span class="text-[0.5em]">%</span>
            </span>
        </p>
    </div>
    `;
    return circleHTML;
}

async function displayResult(page, sortOption) {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('query');
    const formSort = document.querySelector('#sort-form');
    const response = await fetch(`https://api.themoviedb.org/3/search/multi?api_key=336f5174afdbef18cdcc2f6d25e36288&language=fr-FR&query=${searchQuery}&page=${page}&include_adult=false&sort_by=${sortOption}`);
    const data = await response.json();
    displayMovies(data.results);
    const previousPageButton = document.getElementById('previousPageButton');
    const nextPageButton = document.getElementById('nextPageButton');
    previousPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayResult(currentPage);
        }
    });

    nextPageButton.addEventListener('click', () => {
        currentPage++;
        displayResult(currentPage);
    });
    formSort.addEventListener('change', (event) => {
        event.preventDefault();
        const sortOption = document.querySelector('#sort-by').value;
        displayResult(currentPage, sortOption);
    });
}
function titlePage() {
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('query');
    const titlePage = document.querySelector('#titlePage');
    const title = document.querySelector('title');
    title.innerHTML = `Résultat pour : ${searchQuery}`;
    titlePage.innerHTML = `
    <h2 class="text-white text-2xl font-bold">
        Résultat de recherche pour : ${searchQuery}
    </h2>`;
}
const sort = 'popularity.desc';
displayResult(currentPage, sort);
titlePage();