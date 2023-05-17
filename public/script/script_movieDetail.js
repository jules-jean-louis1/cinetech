import { LoginRegister } from './function/function.js';
import { profilHeader } from "./function/function.js";
import { formatDate } from "./function/function.js";
import { getPosterPath } from "./function/function.js";
import { headerMenu } from "./function/function.js";

const btnHeaderloginRegister = document.querySelector('#btnHeaderLoginRegister');
const btnHeaderLogout = document.querySelector('#btnHeaderLogout');
const btnHeaderProfile = document.querySelector('#btnHeaderProfile');

if (btnHeaderloginRegister) {
    LoginRegister(btnHeaderloginRegister);
}
if (btnHeaderProfile) {
    profilHeader(btnHeaderProfile);
    headerMenu();
}


// MOVIE DETAIL PAGE
// Récupérer l'URL actuelle
const url = window.location.href;
const segments = url.split('/');
const lastSegment = segments[segments.length - 1];
const idAndSlug = lastSegment.split('-');
const UrlId = idAndSlug[0];

// Récupérer les données du film
const containerMovies = document.querySelector('#containerMovies');
const detailMovie = document.querySelector('#detailMovie');
const containerCast = document.querySelector('#containerCast');
const containerSimilarMovies = document.querySelector('#containerSimilarMovies');

const apiKey = '336f5174afdbef18cdcc2f6d25e36288';
const language = 'fr-FR';
async function getMovie(UrlId){
    await fetch(`https://api.themoviedb.org/3/movie/${UrlId}?api_key=${apiKey}&language=${language}`)
        .then((response) => response.json())
        .then((data) => {
            const titlePage = document.querySelector('title');
            titlePage.innerHTML = `${data.title} - MovieDB`;
            const ContainerMovie = document.createElement('div');
            ContainerMovie.className = 'flex flex-col gap-4';
            ContainerMovie.innerHTML = `
                <div class="flex flex-row w-8/12">
                    <img src="${getPosterPath(data.poster_path)}" alt="${data.title}" class="w-96 h-fit">
                    <div class="flex flex-col gap-2">
                        <h1 class="text-3xl font-bold">${data.title}</h1>
                        <h2 class="text-2xl">${data.tagline}</h2>
                        <div id="realease_date" class="flex space-x-2">
                            <h3 class="text-xl">Date de sortie:</h3>
                            <p class="text-sm">${formatDate(data.release_date)}</p>
                        </div>
                        <div id="runtime" class="flex space-x-2">
                            <h3 class="text-xl">Durée:</h3>
                            <p class="text-sm">${data.runtime} min</p>
                        </div>
                        <div id="vote_average" class="flex space-x-2">
                            <h3 class="text-xl">Note:</h3>
                            <p class="text-sm">${data.vote_average}/10</p>
                        </div>
                        <div id="vote_count" class="flex space-x-2">
                            <h3 class="text-xl">Nombre de votes:</h3>
                            <p class="text-sm">${data.vote_count}</p>
                        </div>
                        <div class="flex flex-row gap-2">
                            <h3 class="text-sm">Genres:</h3>
                            <div id="containerGenres" class="flex space-x-2"></div>
                        </div>
                        <div id="status" class="flex space-x-2">
                            <h3 class="text-xl">Status:</h3>
                            <p class="text-sm">${data.status}</p>
                        </div>
                        <div id="overview" class="flex space-x-2">
                            <p class="text-sm">${data.overview}</p>
                        </div>
                    </div>
                </div>
            `;
            detailMovie.appendChild(ContainerMovie);
            for (let i = 0; i < data.genres.length; i++) {
                const displayGenres = document.querySelector('#containerGenres');
                displayGenres.innerHTML += `
                    <p class="text-sm">${data.genres[i].name}</p>
                `;
            }
            console.log(data);
        });
}
async function getMovieCast(UrlId){
    await fetch(`https://api.themoviedb.org/3/movie/${UrlId}/credits?api_key=${apiKey}&language=${language}`)
        .then((response) => response.json())
        .then((data) => {
            const ContainerMovieCast = document.createElement('div');
            ContainerMovieCast.className = 'flex flex-col gap-4';
            ContainerMovieCast.innerHTML = `
                <h1 class="text-3xl font-bold">Acteurs</h1>
                <div id="containerMovieCast" class="flex flex-row gap-4 overscroll-x-auto"></div>
            `;
            containerCast.appendChild(ContainerMovieCast);
            for (let i = 0; i < 10; i++) {
                console.log(data.cast[i].name);
                const displayMovieCast = document.querySelector('#containerMovieCast');
                displayMovieCast.innerHTML += `
                    <div class="flex flex-col gap-2 border border-slate-200 rounded">
                        <img src="${getPosterPath(data.cast[i].profile_path)}" alt="${data.cast[i].name}" class="w-36 h-fit">
                        <p class="text-sm">${data.cast[i].name}</p>
                    </div>
                `;
            }
            console.log(data);
        });
}
async function getSimilarMovie(UrlId){
    await fetch(`https://api.themoviedb.org/3/movie/${UrlId}/similar?api_key=${apiKey}&language=${language}&page=1`)
        .then((response) => response.json())
        .then((data) => {
            const ContainerSimilarMovie = document.createElement('div');
            ContainerSimilarMovie.className = 'flex flex-col gap-4';
            ContainerSimilarMovie.innerHTML = `
                <h1 class="text-3xl font-bold">Films similaires</h1>
                <div id="containerSimilarMovie" class="flex flex-row gap-4 overscroll-x-auto"></div>
            `;
            containerSimilarMovies.appendChild(ContainerSimilarMovie);
            for (let i = 0; i < 10; i++) {
                console.log(data.results[i].title);
                const displaySimilarMovie = document.querySelector('#containerSimilarMovie');
                displaySimilarMovie.innerHTML += `
                    <div class="flex flex-col gap-2 border border-slate-200 rounded">
                        <img src="${getPosterPath(data.results[i].poster_path)}" alt="${data.results[i].title}" class="w-36 h-fit">
                        <p class="text-sm">${data.results[i].title}</p>
                    </div>
                `;
            }
            console.log(data);
        });
}
async function getMovieTrailer(UrlId){
    await fetch(`https://api.themoviedb.org/3/movie/${UrlId}/videos?api_key=${apiKey}&language=${language}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
}

async function getMovieImages(UrlId){
    await fetch(`https://api.themoviedb.org/3/movie/${UrlId}/images?api_key=${apiKey}&language=${language}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        });
}
async function addComment(UrlId){
    const containerSimilarMovies = document.querySelector('#containerSimilarMovies');
    function createFormComment() {
        const formComment = document.createElement('div');
        formComment.innerHTML = `
            <form id="formComment" class="flex flex-col gap-4" method="post">
                <input type="hidden" name="id_movie" value="${UrlId}">
                <div class="flex flex-col">
                    <label for="title" class="text-xl">Titre</label>
                    <input type="text" id="title" name="title" class="border border-slate-200 rounded">
                    <small class="text-red-500 h-5" id="titleError"></small>
                </div>
                <div class="flex flex-col">
                    <label for="comment" class="text-xl">Commentaire</label>
                    <textarea id="comment" name="comment" class="border border-slate-200 rounded"></textarea>
                    <small class="text-red-500 h-5" id="commentError"></small>
                </div>
                <div id="errorsMessage" class="h-[45px]">
                    <div id="message"></div>
                </div>
                <div id="formCommentSubmit">
                    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Envoyer</button>
                </div>
            </form>
            `;
        containerSimilarMovies.appendChild(formComment);
    }
    createFormComment();
    const formComment = document.querySelector('#formComment');
    formComment.addEventListener('submit', async (e) => {
        e.preventDefault();
        await fetch(`${window.location.origin}/cinetech/addComment`, {
            method: 'POST',
            body: new FormData(formComment)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const titleError = document.querySelector('#titleError');
                const commentError = document.querySelector('#commentError');
                const message = document.querySelector('#message');
                if(data.title && data.comment){
                    message.innerHTML = '';
                    message.innerHTML = `<p class="text-red-500">Veuillez remplir tous les champs</p>`;
                }
                if(data.title){
                    titleError.textContent = '';
                    titleError.textContent = data.title;
                }
                if(data.comment){
                    commentError.textContent = '';
                    commentError.textContent = data.comment;
                }
                if(data.success){
                    message.innerHTML = '';
                    message.textContent = data.success;
                }
                if(data.logout){
                    message.innerHTML = '';
                    message.textContent = data.logout;
                }
            });
    });
}
/*async function getComment(UrlId){
    await fetch(`${window.location.origin}/cinetech/getComment/${UrlId}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const containerComment = document.querySelector('#containerCommentsList');
            if (data.status === 'success') {
                for (let comment of data.comments) {
                    if (comment.parent_id === null) {
                        containerComment.innerHTML += `
                        <div id="comment_display">
                            <div class="flex">
                                <p>Titre:</p>
                                <p>${comment.title_comment}</p>
                            </div>
                            <div class="flex">
                                <p>Commentaire:</p>
                                <p>${comment.content}</p>
                            </div> 
                            <div id="containerReplyComment_${comment.id}"></div>
                        </div>
                        `;
                    }
                }
            } else {
                containerComment.innerHTML = `
                    <p class="text-red-500">${data.message}</p>
                `;
            }

        });
}*/
async function getComment(UrlId){
    fetch(`${window.location.origin}/cinetech/getComment/${UrlId}`)
        .then((response) => response.text())
        .then((data) => {
            console.log(data);
            const containerComment = document.querySelector('#containerCommentsList');
            containerComment.innerHTML = data;
        });
}
getMovie(UrlId);
/*getMovieCast(UrlId);
getSimilarMovie(UrlId);*/
addComment(UrlId);
getComment(UrlId);
