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
    getFavorite().then(data => {
        data.forEach(element => {
            if (element.type === 'movie') {
                getMovie(element.movie_id).then(data => {
                    console.log(data);
                })
            }
            if (element.type === 'tv') {
                getTv(element.movie_id).then(data => {
                    console.log(data);
                })
            }
        })
    });
}
matchFavorite();
