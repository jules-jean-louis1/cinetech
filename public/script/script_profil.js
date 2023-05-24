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
    displayFavorite.innerHTML = '';

    try {
        const favoriteData = await getFavorite();
        console.log(favoriteData);

        if (favoriteData.length !== 0) {
            let tableHTML = `
                <table class="text-white border border-[#a8b3cf33] rounded-[14px]">
                    <thead class="bg-[#0e1217]">
                        <tr class="border border-[#a8b3cf33]">
                            <th class="p-2 border border-[#a8b3cf33]">Titre</th>
                            <th class="p-2 border border-[#a8b3cf33]">Sortie</th>
                            <th class="p-2 border border-[#a8b3cf33]">Ajouter le :</th>
                            <th class="p-2 border border-[#a8b3cf33]">Statut</th>
                            <th class="p-2 border border-[#a8b3cf33]">Modifier</th>
                            <th class="p-2 border border-[#a8b3cf33]">Suppression</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
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
                    tableHTML += `
                        <tr class="border border-[#a8b3cf33]">
                            <td class="p-2 border border-[#a8b3cf33] text-black">${data.title}</td>
                            <td class="p-2 border border-[#a8b3cf33] text-black">${formatDate(data.release_date)}</td>
                            <td class="p-2 border border-[#a8b3cf33] text-black">${formatDate(element.created_at)}</td>
                            <td class="p-2 border border-[#a8b3cf33] text-black">
                                <form action="" method="post">
                                    <select name="status" id="status" class="bg-[#0e1217] text-white rounded-[14px]">
                                        ${optionHTML}
                                </form>
                            </td>
                            <td class="p-2 border border-[#a8b3cf33] text-black"><button class="btn btn-primary btnEditBookmark" data-id="${element.id}">Modifier</button></td>
                            <td class="p-2 border border-[#a8b3cf33] text-black"><button class="btn btn-danger btnDeleteBookmark" data-id="${element.id}">Supprimer</button></td>
                        </tr>
                    `;
                } else if (element.type === 'tv') {
                    data = await getTv(element.movie_id);
                    tableHTML += `
                        <tr class="border border-[#a8b3cf33]">
                            <td class="p-2 border border-[#a8b3cf33] text-black">${data.name}</td>
                            <td class="p-2 border border-[#a8b3cf33] text-black">${formatDate(data.first_air_date)}</td>
                            <td class="p-2 border border-[#a8b3cf33] text-black">${formatDate(element.created_at)}</td>
                            <td class="p-2 border border-[#a8b3cf33] text-black">${element.status}</td>
                            <td class="p-2 border border-[#a8b3cf33] text-black"><button class="btn btn-primary btnEditBookmark" data-id="${element.id}">Modifier</button></td>
                            <td class="p-2 border border-[#a8b3cf33] text-black"><button class="btn btn-danger btnDeleteBookmark" data-id="${element.id}">Supprimer</button></td>
                        </tr>
                    `;
                }
            }

            tableHTML += `
                </tbody>
                </table>
            `;

            displayFavorite.innerHTML = tableHTML;
        } else {
            displayFavorite.innerHTML = '<p class="text-center">Vous n\'avez pas de favoris</p>';
        }
    } catch (error) {
        console.error(error);
    }
}


matchFavorite();
