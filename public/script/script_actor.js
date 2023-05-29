import {displayMessageToast, headerMenu, LoginRegister, yearsFormat} from './function/function.js';
import { profilHeader } from "./function/function.js";
import { formatDate } from "./function/function.js";
import { getPosterPath } from "./function/function.js";
import { successMessageToast } from './function/function.js';
import { searchBarHeader } from "./function/function.js";
import { generateSlug } from "./function/function.js";

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


// ACTOR PAGE
// Récupérer l'URL actuelle
const url = window.location.href;
const segments = url.split('/');
const lastSegment = segments[segments.length - 1];
const idAndSlug = lastSegment.split('-');
const UrlId = idAndSlug[0];

const containerActor = document.querySelector('#detailActor');
const containerSimilarMovies = document.querySelector('#containerSimilarActorMovies');

async function getActor() {
    await fetch(`https://api.themoviedb.org/3/person/${UrlId}?api_key=336f5174afdbef18cdcc2f6d25e36288&language=fr-FR`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            containerActor.innerHTML = `
            <div>
                <img class="w-48 h-72 rounded-lg" src="${getPosterPath(data.profile_path)}" alt="${data.name}">
                <div class="flex flex-col md:flex-row gap-4">
                    <h1 class="text-3xl font-bold">${data.name}</h1>
                    <p class="text-xl">${data.birthday ? formatDate(data.birthday) : ''}</p>
                    <p class="text-xl">${data.place_of_birth ? data.place_of_birth : ''}</p>
                    <p class="text-xl">${data.deathday ? formatDate(data.deathday) : ''}</p>
                    <p class="text-xl">${data.known_for_department ? data.known_for_department : ''}</p>
                    <p class="text-xl">${data.biography ? data.biography : ''}</p>
                </div>
            </div>
            `;
        });
}
getActor();
