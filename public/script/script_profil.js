import {headerMenu, LoginRegister, yearsFormat} from './function/function.js';
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
                            <p class="text-white text-sm">Ajouter : ${formatDate(element.created_at)}</p>
                            <form action="" method="post" id="formView_${element.id}">
                                <input type="hidden" id="movie_form" name="movie_form" value="${data.id}">
                                <select name="status" id="status" class="bg-[#4c3d47] text-white rounded-lg p-1">
                                    ${optionHTML}
                                </select>
                            </form>
                            <button id="btnDeleteBookmark_${element.id}" data-id="${element.id}" class="text-white">Supprimer</button>
                        </div>`;
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
function formUserProfil(user){
    const profilForm = document.querySelector('#profilForm');
    profilForm.innerHTML = `
        <div class="flex flex-col items-center gap-4 w-8/10">
            <div class="flex items-center space-x-4">
                <div class="flex flex-col">
                    <label for="email" class="text-white">Email</label>
                    <input type="email" name="email" id="email" class="bg-[#4c3d47] text-white rounded-lg p-2 border border-slate-100" value="${user.email}">
                    <small class="text-red-500 h-5" id="emailError"></small>
                </div>
                <div class="flex flex-col">
                    <label for="login" class="text-white">Nom d'utilisateur</label>
                    <input type="text" name="login" id="login" class="bg-[#4c3d47] text-white rounded-lg p-2 border border-slate-100" value="${user.login}">
                    <small class="text-red-500 h-5" id="loginError"></small>
                </div>
            </div>
            <div class="flex items-center space-x-4">     
                <div class="flex flex-col">
                    <label for="password" class="text-white">Mot de passe</label>
                    <input type="password" name="password" id="password" class="bg-[#4c3d47] text-white rounded-lg p-2 border border-slate-100">
                    <small class="text-red-500 h-5" id="passwordError"></small>
                </div>
                <div class="flex flex-col">
                    <label for="password_confirm" class="text-white">Confirmation du mot de passe</label>
                    <input type="password" name="password_confirm" id="password_confirm" class="bg-[#4c3d47] text-white rounded-lg p-2 border border-slate-100">
                    <small class="text-red-500 h-5" id="passwordConfirmError"></small>
                </div>
            </div>
            <div class="flex items-center space-x-4"> 
                <div class="flex flex-col">
                    <label for="firstname" class="text-white">Prénom</label>
                    <input type="text" name="firstname" id="firstname" class="bg-[#4c3d47] text-white rounded-lg p-2 border border-slate-100" value="${user.prenom ? user.prenom : ''}" placeholder="Votre prénom">
                    <small class="text-red-500 h-5" id="firstnameError"></small>
                </div>
                <div class="flex flex-col">
                    <label for="lastname" class="text-white">Nom</label>
                    <input type="text" name="lastname" id="lastname" class="bg-[#4c3d47] text-white rounded-lg p-2 border border-slate-100" value="${user.nom ? user.nom : ''}" placeholder="Votre nom">
                    <small class="text-red-500 h-5" id="lastnameError"></small>
                </div>
            </div>
            <div class="flex items-center space-x-4">
                <div id="errorMessages" class="h-[45px]"></div>
            </div>
            <div>
                <button type="submit" id="btnEditProfil" class="bg-[#4c3d47] text-white rounded-lg p-2">Modifier</button>
            </div>
        </div>`;
}
async function editProfil(){
    await fetch(`${window.location.origin}/cinetech/getUserProfil`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            formUserProfil(data);
        });
}
editProfil();
matchFavorite();

btnFavorite.addEventListener('click', async (e) => {
    e.preventDefault();
    const displayFavorite = document.querySelector('#displayFavorite');
    if (displayFavorite.classList.contains('hidden')) {
        displayFavorite.classList.remove('hidden');
        btnFavorite.textContent = 'Cacher mes favoris';
    } else {
        displayFavorite.classList.add('hidden');
        btnFavorite.textContent = 'Afficher mes favoris';
    }
});