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
                        <div class="bg-[#251821] hover:bg-[#362431] rounded-lg p-2 w-1/8 flex flex-col items-center">
                            <a href="${window.location.origin}/cinetech/films/${data.id}-${generateSlug(data.title)}">
                                <img src="${getPosterPath(data.poster_path)}" alt="${data.poster_path}" class="h-fit w-36">
                                <p class="text-white text-sm">Ajouter : ${formatDate(element.created_at)}</p>
                            </a>
                            <form action="" method="post" id="formView_${element.id}">
                                <input type="hidden" id="movie_form" name="movie_form" value="${data.id}">
                                <select name="status" id="status" class="bg-[#4c3d47] text-white rounded-lg p-1">
                                    ${optionHTML}
                                </select>
                            </form>
                            <button id="btnDeleteBookmark_${element.id}" data-id="${element.id}" class="flex items-center text-white hover:text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-minus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                                  <path d="M9 12l6 0"/>
                                </svg>
                                Supprimer
                            </button>
                        </div>
                    `;
                } else if (element.type === 'tv') {
                    data = await getTv(element.movie_id);
                    favoriteTv.innerHTML += `
                        <div class="bg-[#251821] hover:bg-[#362431] rounded-lg p-2 w-1/8 flex flex-col items-center">
                            <a href="${window.location.origin}/cinetech/series/${data.id}-${generateSlug(data.name)}">
                            <img src="${getPosterPath(data.poster_path)}" alt="${data.poster_path}" class="h-fit w-36">
                            </a>
                            <p class="text-white text-sm">Ajouter : ${formatDate(element.created_at)}</p>
                            <form action="" method="post" id="formView_${element.id}">
                                <input type="hidden" id="movie_form" name="movie_form" value="${data.id}">
                                <select name="status" id="status" class="bg-[#4c3d47] text-white rounded-lg p-1">
                                    ${optionHTML}
                                </select>
                            </form>
                            <button id="btnDeleteBookmark_${element.id}" data-id="${element.id}" class="flex items-center text-white hover:text-red-500">
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-minus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                                  <path d="M9 12l6 0"/>
                                </svg>
                                Supprimer
                            </button>
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
                            displayMessageToast(containerModalDialog, data.success, 'success')
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
                            displayMessageToast(containerModalDialog, data.success, 'success')
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
            <form action="" method="post" id="formProfil">
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
                <div>
                    <button type="submit" id="btnEditProfil" class="bg-[#4c3d47] text-white rounded-lg p-2">Modifier</button>
                </div>
            </form>
        </div>`;
}
async function editProfil(){
    await fetch(`${window.location.origin}/cinetech/getUserProfil`)
        .then(response => response.json())
        .then(data => {
            formUserProfil(data);
            const btnEditProfil = document.querySelector('#formProfil');
            btnEditProfil.addEventListener('submit', async (e) => {
                e.preventDefault();
                await fetch(`${window.location.origin}/cinetech/editProfil`, {
                    method: 'POST',
                    body: new FormData(btnEditProfil)
                })
                    .then(response => response.json())
                    .then(data => {
                        // smaill
                        const emailError = document.querySelector('#emailError');
                        const loginError = document.querySelector('#loginError');
                        const passwordError = document.querySelector('#passwordError');
                        const passwordConfirmError = document.querySelector('#passwordConfirmError');
                        const firstnameError = document.querySelector('#firstnameError');
                        const lastnameError = document.querySelector('#lastnameError');
                        // errorMessages
                        const errorMessages = document.querySelector('#errorMessages');
                        if (data.empty) {
                            errorMessages.innerHTML = `
                            <div class="flex items-center justify-center gap-2 rounded bg-[#0148d2] p-1">
                                <div class="flex items-center" id="svg_container">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"/>
                                        <path d="M12 9h.01"/>
                                        <path d="M11 12h1v4h1"/>
                                    </svg>
                                </div>
                                <div class="flex items-center">
                                    <p class=" text-white">${data.empty}</p>
                                </div>
                            </div>
                            `;
                        }
                        // success
                        if (data.success) {
                            errorMessages.innerHTML = `
                            <div class="flex items-center justify-center gap-2 rounded bg-[#05a763] p-1">
                                <div class="flex items-center" id="svg_container">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                                        <path d="M9 12l2 2l4 -4"/>
                                    </svg>
                                </div>
                                <div class="flex items-center">
                                    <p class=" text-white">Votre profil a été mis à jour.</p>
                                </div>
                            </div>
                            `;
                            editProfil();
                        }
                        // error
                        if (data.email) {
                            emailError.textContent = data.email;
                        }
                        if (data.login) {
                            loginError.textContent = data.login;
                        }
                        if (data.password) {
                            passwordError.textContent = data.password;
                        }
                        if (data.confirmPassword) {
                            passwordConfirmError.textContent = data.confirmPassword;
                        }
                        if (data.nom) {
                            lastnameError.textContent = data.nom;
                        }
                        if (data.prenom) {
                            firstnameError.textContent = data.prenom;
                        }
                        console.log(data);
                    });
            })
        });
}
editProfil();
matchFavorite();


const displayFavorite = document.querySelector('#displayFavorite');
const displayEditProfile = document.querySelector('#containerProfilAction');
btnFavorite.addEventListener('click', async (e) => {
    e.preventDefault();

    if (displayFavorite.classList.contains('hidden')) {
        displayFavorite.classList.remove('hidden');
        displayEditProfile.classList.add('hidden');
        btnFavorite.classList.remove('bg-[#362431]');
        btnFavorite.classList.remove('text-[#8d858c]');
        btnFavorite.classList.add('bg-[#e9e7e8]');
        btnFavorite.classList.add('text-[#362431]');
    } else {
        displayFavorite.classList.add('hidden');
    }
});
btnEditProfile.addEventListener('click', async (e) => {
    e.preventDefault();
    if (displayEditProfile.classList.contains('hidden')) {
        displayEditProfile.classList.remove('hidden');
        displayFavorite.classList.add('hidden');
    } else {
        displayEditProfile.classList.add('hidden');
    }
});