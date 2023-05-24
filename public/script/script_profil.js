import { LoginRegister } from './function/function.js';
import { profilHeader } from "./function/function.js";
import { formatDate } from "./function/function.js";
import { getPosterPath } from "./function/function.js";
import { successMessageToast } from './function/function.js';
import { headerMenu} from "./function/function.js";

const btnHeaderloginRegister = document.querySelector('#btnHeaderLoginRegister');
const btnHeaderLogout = document.querySelector('#btnHeaderLogout');
const btnHeaderProfile = document.querySelector('#btnHeaderProfile');
const containerModalDialog = document.querySelector('#containerModalDialog');

if (btnHeaderloginRegister) {
    LoginRegister(btnHeaderloginRegister);
}
if (btnHeaderProfile) {
    await profilHeader(btnHeaderProfile);
    await headerMenu();
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

        if (favoriteData.length !== 0) {

            let optionHTML = '';
            for (const element of favoriteData) {
                console.log(element.status);
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
            }
            for (const element of favoriteData) {
                let data;
                if (element.type === 'movie') {
                    data = await getMovie(element.movie_id);
                    favoriteMovie.innerHTML += `
                        <div class="bg-[#251821] rounded-lg p-2 w-1/5 flex flex-col items-center">
                            <img src="${getPosterPath(data.poster_path)}" alt="${data.poster_path}" class="h-fit w-36">
                            <p class="text-white">${data.title}</p>
                            <p class="text-white text-sm">Sortie : ${formatDate(data.release_date)}</p>
                            <p class="text-white text-sm"">Ajouter : ${formatDate(element.created_at)}</p>
                            <form action="" method="post" id="formView_${element.id}">
                                <select name="status" id="status" class="bg-[#4c3d47] text-white rounded-lg p-1">
                                    ${optionHTML}
                                </select>
                                <button type="submit" id="btnEditBookmark_${element.id}" data-id="${element.id}" class="text-white">Modifier</button>
                            </form>
                            <button id="btnDeleteBookmark_${element.id}" data-id="${element.id}" class="text-white">Supprimer</button>
                        </div>
                    `;
                } else if (element.type === 'tv') {
                    data = await getTv(element.movie_id);
                    favoriteTv.innerHTML += `
                        <div class="bg-[#251821] rounded-lg p-2 w-1/5 flex flex-col items-center">
                            <img src="${getPosterPath(data.poster_path)}" alt="${data.poster_path}" class="h-fit w-36">
                            <p class="text-white">${data.name}</p>
                            <p class="text-white">${formatDate(data.first_air_date)}</p>
                            <p class="text-white">${formatDate(element.created_at)}</p>
                            <form action="" method="post" id="formView_${element.id}">
                                <select name="status" id="status" class="bg-[#0e1217] text-white rounded-[14px]">
                                    ${optionHTML}
                                </select>
                                <button type="submit" id="btnEditBookmark_${element.id}" data-id="${element.id}">Modifier</button>
                            </form>
                            <button id="btnDeleteBookmark_${element.id}" data-id="${element.id}">Supprimer</button>
                        </div>
                    `;
                }
            }
        } else {
            displayFavorite.innerHTML = '<p class="text-center">Vous n\'avez pas de favoris</p>';
        }
    } catch (error) {
        console.error(error);
    }
}

matchFavorite();
