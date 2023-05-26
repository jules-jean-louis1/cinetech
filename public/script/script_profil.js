import {LoginRegister, yearsFormat} from './function/function.js';
import { profilHeader } from "./function/function.js";
import { formatDate } from "./function/function.js";
import { getPosterPath } from "./function/function.js";
import { successMessageToast } from './function/function.js';
import { headerMenu} from "./function/function.js";

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
function searchBarHeader() {
    const searchBar = document.querySelector('#search');
    const displayResult = document.querySelector('#displayResultSearch');
    const formSearch = document.querySelector('#searchBarHeader');
    const btnSearch = document.querySelector('#submitBtnSearch');
    const erraseSearch = document.querySelector('#eraseSearches');
    formSearch.addEventListener('keyup', async (e) => {
        e.preventDefault();
        const query = searchBar.value;
        if (query.length > 0) {
            erraseSearch.classList.remove('hidden');
            await fetch(`http://api.themoviedb.org/3/search/multi?api_key=336f5174afdbef18cdcc2f6d25e36288&language=fr-FR&query=${query}&page=1&include_adult=false`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    displayResult.innerHTML = '';
                    let result = data.results;
                    if (result.length > 0) {
                        displayResult.classList.add('py-2', 'px-4');
                        const maxResults = 8; // Limite le nombre de résultats affichés
                        for (let i = 0; i < Math.min(result.length, maxResults); i++) {
                            const element = result[i];
                            if (element.media_type === 'movie') {
                                element.media_type = 'Film';
                                displayResult.innerHTML += `
                                <a href="${window.location.origin}/cinetech/movie/${element.id}-${generateSlug(element.title)}" class="text-white text-center flex p-1">
                                    <li class="text-white text-center flex">
                                        <div id="containerImageSearch">
                                            <img src="${getPosterPath(element.poster_path)}" alt="${element.poster_path}" class="w-12">
                                        </div>
                                        <div>
                                            <div id="title_search_bar">
                                                <h2 class="text-white">${element.title}</h2>
                                            </div>
                                            <div id="containerDate_Typesearch" class="flex">
                                                <div id="containerDateSearch">
                                                    <p class="text-white">${yearsFormat(element.release_date)}</p>
                                                </div>
                                                <div id="containerTypeMediaSearch">
                                                    <p class="text-white">${element.media_type}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </a>
                                `;
                            } else if (element.media_type === 'tv') {
                                element.media_type = 'Série';
                                displayResult.innerHTML += `
                                <a href="${window.location.origin}/cinetech/series/${element.id}-${generateSlug(element.name)}" class="text-white text-center flex">
                                    <li class="text-white text-center flex">
                                        <div id="containerImageSearch">
                                            <img src="${getPosterPath(element.poster_path)}" alt="${element.poster_path}" class="w-12">
                                        </div>
                                        <div class="flex">
                                            <div id="title_search_bar">
                                                <h2 class="text-white">${element.name}</h2>
                                            </div>
                                            <div id="containerDateSearch">
                                                <p class="text-white text-sm">${yearsFormat(element.first_air_date)}</p>
                                            </div>
                                            <p class="text-white">${element.media_type}</p>
                                        </div>
                                    </li>
                                </a>
                                `;
                            }
                        }
                    }
                });
        } else {
            erraseSearch.classList.add('hidden');
            displayResult.classList.remove('py-2', 'px-4');
            displayResult.innerHTML = '';
        }
        if (erraseSearch) {
            erraseSearch.addEventListener('click', () => {
                searchBar.value = '';
                erraseSearch.classList.add('hidden');
                displayResult.classList.remove('py-2', 'px-4');
                displayResult.innerHTML = '';
            });
        }
    });
}

function generateSlug(title) {
    let slug = title.toLowerCase(); // Convertit le titre en minuscules
    slug = slug.replace(/[^a-z0-9]+/g, '-'); // Remplace les caractères non alphabétiques et non numériques par des tirets
    slug = slug.replace(/^-+|-+$/g, ''); // Supprime les tirets en début et en fin de chaîne
    return slug;
}
// PROFILE PAGE

const btnEditProfile = document.querySelector('#btnEditProfile');
const btnFavorite = document.querySelector('#btnProfilBookmark');

const apiKey = '336f5174afdbef18cdcc2f6d25e36288';
const language = 'fr-FR';

async function getFavorite() {
    const response = await fetch(`${window.location.origin}/cinetech/getAllBookmarks`);
    const data = await response.json();
    return data;
}
async function getMovie(id) {
    const response = await fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=' + apiKey + '&language=' + language)
    const data = await response.json();
    return data;
}
async function getTv(id) {
    const response = await fetch('https://api.themoviedb.org/3/tv/' + id + '?api_key=' + apiKey + '&language=' + language)
    const data = await response.json();
    return data;
}
async function matchFavorite() {
    const displayFavorite = document.querySelector('#displayFavorite');
    const favoriteMovie = document.querySelector('#containerFavoriteMovie');
    const favoriteTv = document.querySelector('#containerFavoriteSeries');
    try {
        const favoriteData = await getFavorite();
        console.log(favoriteData);
        favoriteMovie.innerHTML = '';
        favoriteTv.innerHTML = '';
        if (favoriteData.length !== 0) {
            let optionHTML = '';
            for (const element of favoriteData) {
                if (element.status === 0) {
                    optionHTML = `
                        <option value="0" selected>Non vu</option>
                        <option value="1">En cours</option>
                        <option value="2">Vu</option>
                    `;
                } else if (element.status === 1) {
                    optionHTML = `
                        <option value="0">Non vu</option>
                        <option value="1" selected>En cours</option>
                        <option value="2">Vu</option>
                    `;
                } else if (element.status === 2) {
                    optionHTML = `
                        <option value="0">Non vu</option>
                        <option value="1">En cours</option>
                        <option value="2" selected>Vu</option>
                    `;
                }
                let data;
                if (element.type === 'movie') {
                    data = await getMovie(element.movie_id);
                    favoriteMovie.innerHTML += `
                        <div class="bg-[#251821] hover:bg-[#362431] rounded-lg p-2 w-1/5 flex flex-col items-center">
                            <img src="${getPosterPath(data.poster_path)}" alt="${data.poster_path}" class="h-fit w-36">
                            <p class="text-white">${data.title}</p>
                            <p class="text-white text-sm">Sortie : ${formatDate(data.release_date)}</p>
                            <p class="text-white text-sm">Ajouter : ${formatDate(element.created_at)}</p>
                            <form action="" method="post" id="formView_${element.id}">
                                <input type="hidden" id="movie_form" name="movie_form" value="${data.id}">
                                <select name="status" id="status" class="bg-[#4c3d47] text-white rounded-lg p-1">
                                    ${optionHTML}
                                </select>
                            </form>
                            <button id="btnDeleteBookmark_${element.id}" data-id="${element.id}" class="text-white">Supprimer</button>
                        </div>
                    `;
                } else if (element.type === 'tv') {
                    data = await getTv(element.movie_id);
                    favoriteTv.innerHTML += `
                        <div class="bg-[#251821] hover:bg-[#362431] rounded-lg p-2 w-1/5 flex flex-col items-center">
                            <img src="${getPosterPath(data.poster_path)}" alt="${data.poster_path}" class="h-fit w-36">
                            <p class="text-white">${data.name}</p>
                            <p class="text-white">${formatDate(data.first_air_date)}</p>
                            <p class="text-white">${formatDate(element.created_at)}</p>
                            <form action="" method="post" id="formView_${element.id}">
                                <input type="hidden" id="movie_form" name="movie_form" value="${data.id}">
                                <select name="status" id="status" class="bg-[#4c3d47] text-white rounded-lg p-1">
                                    ${optionHTML}
                                </select>
                            </form>
                            <button id="btnDeleteBookmark_${element.id}" data-id="${element.id}" class="text-white">Supprimer</button>
                        </div>
                    `;
                }
            }
            for (const element of favoriteData) {
                const FormEditBook = document.querySelector(`#formView_${element.id}`);
                FormEditBook.addEventListener('change', async (e) => {
                    e.preventDefault();
                    console.log(e.target.value);
                    await fetch(`${window.location.origin}/cinetech/editBookmark/${element.id}`, {
                        method: 'POST',
                        body: new FormData(FormEditBook)
                    }) .then(response => response.json())
                        .then(data => {
                            successMessageToast(containerModalDialog, data.success);
                            matchFavorite();
                        });
                })
                const btnDeleteBookmark = document.querySelector(`#btnDeleteBookmark_${element.id}`);
                btnDeleteBookmark.addEventListener('click', async (e) => {
                    e.preventDefault();
                    await fetch(`${window.location.origin}/cinetech/deleteBookmarks/${element.id}`, {
                        method: 'DELETE',
                        body: new FormData(FormEditBook)
                    })
                        .then(response => response.json())
                        .then(data => {
                            successMessageToast(containerModalDialog, data.success);
                            matchFavorite();
                        });
                })
            }
        } else {
            displayFavorite.innerHTML = '<p class="text-center">Vous n\'avez pas de favoris</p>';
        }
    } catch (error) {
        console.error(error);
    }
}
async function editProfil(){

}
matchFavorite();
