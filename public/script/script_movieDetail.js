import { LoginRegister } from './function/function.js';
import { profilHeader } from "./function/function.js";
import { formatDate } from "./function/function.js";
import { getPosterPath } from "./function/function.js";
import { headerMenu } from "./function/function.js";

const btnHeaderloginRegister = document.querySelector('#btnHeaderLoginRegister');
const btnHeaderLogout = document.querySelector('#btnHeaderLogout');
const btnHeaderProfile = document.querySelector('#btnHeaderProfile');
const containerModalDialog = document.querySelector('#containerModalDialog');

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
let containerComment = document.querySelector('#containerCommentsList');
async function getComment(UrlId){
    await fetch(`${window.location.origin}/cinetech/isLogged`)
        .then((response) => response.json())
        .then((data) => {
            if (data.isLogged === true) {
                console.log(data);
                let UserId = data.id;
                fetch(`${window.location.origin}/cinetech/getComment/${UrlId}`)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);

                        if (data.status === 'success') {
                            let commentsData = data.comments;
                            function addReplyToComment(comment) {
                                const dialogAvis = document.createElement('dialog');
                                dialogAvis.setAttribute('id', 'dialog_fixed');
                                dialogAvis.className = 'dialog_modal w-6/12 h-6/12 bg-[#24272A] text-[#a8b3cf] rounded-[14px] shadow-lg';
                                containerModalDialog.appendChild(dialogAvis);
                                dialogAvis.innerHTML = `
                                <div class="border-[1px] rounded-[14px] border-[#a8b3cf]">
                                                <div class="flex flex-row justify-between border-b border-[#a8b3cf] flex items-center py-4 px-6 w-full h-14">
                                                        <h3>Votre réponse</h3>
                                                        <button class="close" id="closeDialogAvis">
                                                            <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z" fill="currentcolor" fill-rule="evenodd"></path></svg>
                                                        </button>
                                                    </div>
                                                <div class="overflow-auto relative w-full h-full shrink max-h-full p-6 flex flex-col">
                                                    <div class="flex space-x-2">
                                                        <div class="flex flex-col">
                                                            <p class="text-white font-regular">${comment.login}</p>
                                                            <p class="text-[#a8b3cf] text-xs">
                                                                <span>${formatDate(comment.created_at)}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div class="m-2 border-l border-white pl-6">
                                                        <p class="text-white font-light text-lg">${comment.content}</p>
                                                    </div>
                                                    <div>
                                                        <p class="text-xs text-white pl-8">Réponse à <b>${comment.login}</b></p>
                                                    </div>
                                                </div>
                                                <div class="flex relative flex-1 pl-6 pr-2">
                                                        <form action="" method="post" id="formAddReplyComment" class="flex flex-col items-center justify-center w-full">
                                                        <input type="hidden" name="id_movie" value="${UrlId}">
                                                        <input type="hidden" name="parent_comment" value="${comment.id}">
                                                        <textarea name="content" id="content" cols="30" rows="5" placeholder="@${comment.login}" class="ml-3 flex-1 bg-[#24272A] focus:outline-none rounded-b-[14px] w-full h-full"></textarea>
                                                        <div id="errorMsg" class="h-12"></div>
                                                        <div class="flex flex-row justify-end w-full py-2">
                                                            <button class="bg-[#39e58c] text-black font-bold px-5 py-2 rounded-[14px]" id="buttonAddAvis">Répondre</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        `;
                                dialogAvis.showModal();
                                const closeDialogAvis = document.getElementById('closeDialogAvis');
                                closeDialogAvis.addEventListener('click', (ev) => {
                                    ev.preventDefault();
                                    dialogAvis.close();
                                    dialogAvis.remove();
                                });
                                const formAddReplyComment = document.querySelector('#formAddReplyComment');
                                formAddReplyComment.addEventListener('submit', async (e) => {
                                    e.preventDefault();
                                    await fetch(`${window.location.origin}/cinetech/addReplyComment/${UrlId}`, {
                                        method: 'POST',
                                        body: new FormData(formAddReplyComment)
                                    })
                                        .then((response) => response.json())
                                        .then((data) => {
                                            console.log(data);
                                            if (data.success) {
                                                dialogAvis.close();
                                            }
                                        });
                                });
                            }
                            function generateCommentHTML(comment) {
                                const commentId = `comment_${comment.id}`;
                                let commentHTML = '';
                                let callToActionHTML = '';
                                if (comment.utilisateur_id === UserId) {
                                    callToActionHTML = `
                                    <button class="border-2 border-black" id="delete_${comment.id}">Supprimer</button>
                                    <button class="border-2 border-black" id="edit_${comment.id}">Modifier</button>
                                `;
                                }
                                commentHTML = `
                                    <div class="comment" id="${commentId}">
                                        <h3>${comment.title_comment}</h3>
                                        <div class="flex space-x-2">
                                            <p>${comment.login}</p>
                                            <p>${formatDate(comment.created_at)}</p>
                                        </div>
                                        <p>${comment.content}</p>
                                        <div class="flex space-x-2">
                                            <button class="border-2 border-black" id="reply_${comment.id}">Répondre</button>
                                            <div id="callToAction_${comment.id}">${callToActionHTML}</div>
                                        </div>
                                    </div>
                                `;
                                return commentHTML;
                            }
                            // Fonction récursive pour générer le HTML des réponses imbriquées
                            function generateNestedRepliesHTML(comments, parentId) {
                                const replies = comments.filter(comment => comment.parent_id === parentId);

                                if (replies.length === 0) {
                                    return '';
                                }
                                let repliesHTML = '';
                                replies.forEach(reply => {
                                    const replyId = `${reply.id}`;
                                    const callToActionId = `callToAction_${reply.id}`;

                                    let callToActionHTML = '';

                                    if (reply.utilisateur_id === UserId) {
                                        callToActionHTML = `
                                        <button class="border-2 border-black" id="delete_${reply.id}">Supprimer</button>
                                        <button class="border-2 border-black" id="edit_${reply.id}">Modifier</button>
                                    `;
                                    }
                                    repliesHTML += `
                                    <div class="reply" id="container_${replyId}">
                                        <div class="flex space-x-2">
                                            <p>${reply.login}</p>
                                            <p>${formatDate(reply.created_at)}</p>
                                        </div>
                                        <h3>${reply.content}</h3>
                                        <div class="flex space-x-2">
                                            <button class="border-2 border-black" id="reply_${replyId}">Répondre</button>
                                            <div id="${callToActionId}">${callToActionHTML}</div>
                                        </div>
                                        ${generateNestedRepliesHTML(comments, reply.id)}
                                    </div>
                                `;
                                });
                                return repliesHTML;
                            }
                            function displayComments(comments) {
                                const commentsContainer = document.getElementById('commentsContainer');
                                comments.forEach(comment => {
                                    if (comment.parent_id === null) {
                                        const commentHTML = generateCommentHTML(comment);
                                        const repliesHTML = generateNestedRepliesHTML(comments, comment.id);

                                        commentsContainer.innerHTML += `
                                        <div class="comment-container p-2 bg-slate-100 m-2">
                                            ${commentHTML}
                                            <div id="replies-container" class="pl-2">
                                            ${repliesHTML}
                                            </div>
                                        </div>
                                        `;
                                    }
                                });
                                comments.forEach(comment => {
                                    const repliesButton = commentsContainer.querySelector(`#reply_${comment.id}`);
                                    repliesButton.addEventListener('click', (e) => {
                                        e.preventDefault();
                                        addReplyToComment(comment);
                                    });
                                });
                            }
                            // Appel de la fonction pour afficher les commentaires
                            displayComments(commentsData);
                        } else {
                            containerComment.innerHTML = `
                    <p class="text-red-500">${data.message}</p>
                `;
                        }
                    });
            } else {
                console.log("Vous n'êtes pas connecté");
            }
        });

}

getMovie(UrlId);
/*getMovieCast(UrlId);
getSimilarMovie(UrlId);*/
addComment(UrlId);
getComment(UrlId);
