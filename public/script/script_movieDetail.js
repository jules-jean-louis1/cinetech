import {
    formatDate,
    getPosterPath,
    headerMenu,
    LoginRegister,
    profilHeader,
    successMessageToast,
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
let genreMovie = '';
function generateStarIcons(voteAverage) {
    const maxStars = 5; // Nombre maximum d'étoiles
    const filledStars = Math.round(voteAverage / 2); // Nombre d'étoiles remplies (arrondi à la valeur entière la plus proche)

    let starIcons = '';
    for (let i = 1; i <= maxStars; i++) {
        if (i <= filledStars) {
            // Ajouter une étoile remplie
            starIcons += '<i class="fas fa-star"></i>';
        } else {
            // Ajouter une étoile vide
            starIcons += '<i class="far fa-star"></i>';
        }
    }

    return starIcons;
}
async function getMovie(UrlId){
    await fetch(`https://api.themoviedb.org/3/movie/${UrlId}?api_key=${apiKey}&language=${language}`)
        .then((response) => response.json())
        .then((data) => {
            let original_img_url = 'https://image.tmdb.org/t/p/original';
            const titlePage = document.querySelector('title');
            titlePage.innerHTML = `${data.title} - WatchManager`;
            const ContainerMovie = document.createElement('div');
            ContainerMovie.className = 'flex flex-col items-center gap-4';
            ContainerMovie.innerHTML = `
                <div class="relative p-4">
                    <img src="${original_img_url}${data.backdrop_path}" alt="Background Image" class="w-full h-full object-cover absolute inset-0 z-[-10]" id="backdropMovie">
                    <div class="absolute inset-0 bg-[#1F0C19AD]"></div>
                    <div class="flex flex-row gap-4 w-8/12 text-white p-2 rounded mx-auto relative">
                        <div class="flex-shrink-0">
                            <img src="${getPosterPath(data.poster_path)}" alt="${data.title}" class="w-80 h-fit">
                        </div>
                        <div class="flex flex-col gap-2">
                            <h1 class="text-3xl font-bold">${data.title}</h1>
                            <h2 class="text-lg">${data.tagline}</h2>
                            <div id="realease_date" class="flex space-x-2">
                                <p class="text-sm">${formatDate(data.release_date)} / ${data.runtime} min</p>
                            </div>
                            <div id="vote_average" class="flex flex-col space-y-2">
                                <div class="flex">
                                    ${generateStarIcons(data.vote_average)}
                                </div>
                                <div id="vote_count" class="flex space-x-2">
                                    <p class="text-sm font-light">${data.vote_count} votes</p>
                                </div>
                            </div>
                            <div class="flex flex-row gap-2">
                                <h3 class="text-sm">Genres:</h3>
                                <div id="containerGenres" class="flex space-x-2"></div>
                            </div>
                            <div id="overview" class="flex space-x-2">
                                <p class="text-sm"><b class="opacity-50">Synopsis :</b> ${data.overview.substring(0,200) + '...'}</p>
                            </div>
                            <div id="containerBtnAddBookmarks"></div>
                        </div>
                    </div>
                </div>`;
            detailMovie.appendChild(ContainerMovie);
            for (let i = 0; i < data.genres.length; i++) {
                const displayGenres = document.querySelector('#containerGenres');
                displayGenres.innerHTML += `
                    <p class="text-sm">${data.genres[i].name}</p>
                `;
            }
            for (let i = 0; i < data.genres.length; i++) {
                genreMovie += data.genres[i].id;
                if (i < data.genres.length - 1) {
                    genreMovie += ',';
                }
            }
        });
}
// recupere les bookmarks lors du chargement de la page puis les affiches est appel la fonction pour ajouter un bookmark
async function movieType(UrlId){
    const movieResponse = await fetch(`https://api.themoviedb.org/3/movie/${UrlId}?api_key=${apiKey}`);
    const movieData = await movieResponse.json();
    if (movieData.id) {
        return 'movie';
    } else {
        const tvResponse = await fetch(`https://api.themoviedb.org/3/tv/${UrlId}?api_key=${apiKey}`);
        const tvData = await tvResponse.json();
        if (tvData.id) {
            return 'tv';
        } else {
            return 'error';
        }
    }
}

async function checkBookmarkMovie(UrlId) {
    const containerBookmarks = document.querySelector('#containerBtnAddBookmarks');
    await fetch(`${window.location.origin}/cinetech/getBookmarks/${UrlId}`)
        .then((response) => response.json())
        .then(async (data) => {
            if (data) {
                containerBookmarks.innerHTML = `
                    <button id="btnAddBookmarks" class="flex items-center gap-2 p-2 w-48 h-12 bg-slate-500/60 hover:bg-slate-500/40 text-white rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-minus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                      <path d="M9 12l6 0"/>
                    </svg>
                    Retirer des favoris
                    </button>`;
                const btnAddBookmarks = document.querySelector('#btnAddBookmarks');
                btnAddBookmarks.addEventListener('click', async (e) => {
                    e.preventDefault();
                    await fetch(`${window.location.origin}/cinetech/removeBookmarks/${UrlId}`)
                        .then((response) => response.json())
                        .then((data) => {
                            checkBookmarkMovie(UrlId);
                        });
                });
            } else {
                containerBookmarks.innerHTML = `
                    <button id="btnAddBookmarks" class="flex items-center gap-2 p-2 w-48 h-12 bg-slate-500/60 hover:bg-slate-500/40 text-white rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                          <path d="M9 12l6 0"/>
                          <path d="M12 9l0 6"/>
                        </svg>
                        Ajouter aux favoris
                    </button>`;
                const contentType = await movieType(UrlId);
                if (contentType === 'movie' || contentType === 'tv') {
                    const btnAddBookmarks = document.querySelector('#btnAddBookmarks');
                    btnAddBookmarks.addEventListener('click', async (e) => {
                        e.preventDefault();
                        await fetch(`${window.location.origin}/cinetech/addBookmarks/${UrlId}/${contentType}`)
                            .then((response) => response.json())
                            .then((data) => {
                                checkBookmarkMovie(UrlId);
                                successMessageToast(containerModalDialog, 'Ajouté aux favoris')
                            });
                    });
                }
            }
        });
}

async function getMovieCast(UrlId){
    await fetch(`https://api.themoviedb.org/3/movie/${UrlId}/credits?api_key=${apiKey}&language=${language}`)
        .then((response) => response.json())
        .then((data) => {
            const ContainerMovieCast = document.createElement('div');
            ContainerMovieCast.className = 'flex flex-col gap-4 my-4';
            ContainerMovieCast.innerHTML = `
                <h1 class="text-2xl font-bold text-white">Acteurs</h1>
                <div id="containerMovieCast" class="flex flex-row gap-4 overscroll-x-auto"></div>
            `;
            containerCast.appendChild(ContainerMovieCast);
            for (let i = 0; i < 10; i++) {
                const displayMovieCast = document.querySelector('#containerMovieCast');
                displayMovieCast.innerHTML += `
                    <div class="flex flex-col items-center gap-2 bg-[#2A1825] p-1 rounded">
                        <a href="${window.location.origin}/cinetech/actor/${data.cast[i].id}-${generateSlug(data.cast[i].name)}" class="text-center flex flex-col items-center">
                            <img src="${getPosterPath(data.cast[i].profile_path)}" alt="${data.cast[i].name}" class="w-36 h-fit">
                            <p class="text-sm text-white">${data.cast[i].name}</p>
                            <p class="text-sm text-slate-500">${data.cast[i].character}</p>
                        </a>
                    </div>
                `;
            }
        });
}

async function getSimilarMovie(UrlId){
    await fetch(`https://api.themoviedb.org/3/movie/${UrlId}/recommendations?api_key=${apiKey}&language=${language}&page=1&sort_by=popularity.asc&with_genres=${genreMovie}`)
        .then((response) => response.json())
        .then((data) => {
            const ContainerSimilarMovie = document.createElement('div');
            ContainerSimilarMovie.className = 'flex flex-col gap-4 my-4';
            ContainerSimilarMovie.innerHTML = `
                <h1 class="text-2xl font-bold text-white">Recommandations</h1>
                <div id="containerSimilarMovie" class="flex flex-row gap-4 overscroll-x-auto"></div>
            `;
            containerSimilarMovies.appendChild(ContainerSimilarMovie);
            for (let i = 0; i < 10; i++) {
                const displaySimilarMovie = document.querySelector('#containerSimilarMovie');
                displaySimilarMovie.innerHTML += `
                    <div class="flex flex-col gap-2 rounded">
                        <a href="${window.location.origin}/cinetech/movie/${data.results[i].id}-${generateSlug(data.results[i].title)}" class="w-36 h-fit">
                        <img src="${getPosterPath(data.results[i].poster_path)}" alt="${data.results[i].title}" class="w-36 h-fit">
                        </a>
                    </div>
                `;
            }
        });
}
async function getMovieTrailer(UrlId){
    await fetch(`https://api.themoviedb.org/3/movie/${UrlId}/videos?api_key=${apiKey}&language=${language}`)
        .then((response) => response.json())
        .then((data) => {
        });
}

async function getMovieImages(UrlId){
    await fetch(`https://api.themoviedb.org/3/movie/${UrlId}/images?api_key=${apiKey}&language=${language}`)
        .then((response) => response.json())
        .then((data) => {
        });
}
async function addComment(UrlId){
    const containerCommentsForm = document.querySelector('#containerCommentsForm');
    function createFormComment() {
        const formComment = document.createElement('div');
        formComment.innerHTML = `
        <div>
            <h1 class="font-semibold text-white p-2">Ajouter un commentaire</h1>
            <form id="formComment" class="flex flex-col gap-4 text-white" method="post">
                <input type="hidden" name="id_movie" value="${UrlId}">
                <div class="flex flex-col">
                    <label for="title" class="text-xl">Titre</label>
                    <input type="text" id="title" name="title" class="bg-[#292226] p-2 border border-slate-200 rounded">
                    <small class="text-red-500 h-5" id="titleError"></small>
                </div>
                <div class="flex flex-col">
                    <label for="comment" class="text-xl">Commentaire</label>
                    <textarea id="comment" name="comment" class="bg-[#292226] p-2 border border-slate-200 rounded"></textarea>
                    <small class="text-red-500 h-5" id="commentError"></small>
                </div>
                <div id="errorsMessage" class="h-[45px]">
                    <div id="message"></div>
                </div>
                <div id="formCommentSubmit">
                    <button type="submit" class="bg-[#9c4ef4] hover:bg-[#8241cc] text-white font-bold py-2 px-4 rounded">Poster</button>
                </div>
            </form>
        </div>
            `;
        containerCommentsForm.appendChild(formComment);
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
                let UserId = data.id;
                fetch(`${window.location.origin}/cinetech/getComment/${UrlId}`)
                    .then((response) => response.json())
                    .then((data) => {
                        // console.log(data);
                        if (data.status === 'success') {
                            let commentsData = data.comments;
                            function addReplyToComment(comment, action, UrlId) {
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
                                            <form action="" method="post" id="formAddReplyComment" class="flex flex-col items-center justify-center w-full text-white">
                                            <input type="hidden" name="id_movie" value="${UrlId}">
                                            <input type="hidden" name="parent_comment" value="${comment.id}">
                                            <textarea name="content" id="content" cols="30" rows="5" placeholder="@${comment.login}" class="ml-3 flex-1 bg-[#24272A] focus:outline-none rounded-b-[14px] w-full h-full text-white"></textarea>
                                            <div id="errorMsg" class="h-12"></div>
                                            <div class="flex flex-row justify-end w-full py-2">
                                                <button class="bg-[#39e58c] text-black font-bold px-5 py-2 rounded-[14px]" id="buttonAddAvis">Répondre</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>`;
                                const textArea = document.querySelector('#content');
                                if (action === 'reply') {
                                    textArea.placeholder = `@${comment.login}`;
                                } else if (action === 'edit') {
                                    textArea.placeholder = '';
                                    textArea.value = comment.content;
                                }
                                dialogAvis.showModal();
                                const closeDialogAvis = document.getElementById('closeDialogAvis');
                                closeDialogAvis.addEventListener('click', (ev) => {
                                    ev.preventDefault();
                                    dialogAvis.close();
                                    dialogAvis.remove();
                                });
                                const formAddReplyComment = document.querySelector('#formAddReplyComment');
                                if (action === 'reply') {
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
                                } else if (action === 'edit') {
                                    formAddReplyComment.addEventListener('submit', async (e) => {
                                        e.preventDefault();
                                        await fetch(`${window.location.origin}/cinetech/editComment/${UrlId}`, {
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
                            }
                            function generateCommentHTML(comment) {
                                const commentId = `comment_${comment.id}`;
                                let commentHTML = '';
                                let callToActionHTML = '';
                                if (comment.utilisateur_id === UserId) {
                                    callToActionHTML = `
                                    <div class="flex">
                                    <button class="flex items-center gap-2 p-2 text-[#bebabd] hover:bg-[#ff2b2b3d] hover:text-[ff3b3b]" id="delete_${comment.id}">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-minus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M9 12h6"/>
                                            <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"/>
                                        </svg>
                                    Supprimer
                                    </button>
                                    <button class="flex items-center gap-2 p-2 text-[#bebabd] hover:bg-[#0dcfdc3d] hover:text-[#2cdce6]" id="edit_${comment.id}">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"/>
                                            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"/>
                                            <path d="M16 5l3 3"/>
                                        </svg>
                                        Modifier
                                    </button>
                                    </div>
                                `;
                                }
                                commentHTML = `
                                    <div class="comment" id="${commentId}">
                                        <div class="flex space-x-2">
                                            <div class="flex justify-between items-center w-full"> 
                                                <div class="flex items-center gap-2">   
                                                    <img src="${window.location.origin}/cinetech/public/images/avatars/${comment.avatar}" alt="avatar" class="w-8 h-8 rounded-full">
                                                    <p>${comment.login}</p>
                                                </div>
                                                <p>${formatDate(comment.created_at)}</p>
                                            </div>
                                        </div>
                                        <h3>${comment.title_comment}</h3>
                                        <p class="ml-6 font-light">${comment.content}</p>
                                        <div class="flex space-x-2">
                                            <button class="p-2 text-[#bebabd] flex items-center gap-2 hover:bg-[#1ddc6f3d] hover:text-[#39e58c]" id="reply_${comment.id}">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1"/>
                                                </svg>
                                            Répondre
                                            </button>
                                            <div id="callToAction_${comment.id}" class="ml-6">${callToActionHTML}</div>
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
                                        <button class="flex items-center gap-2 p-2 text-[#bebabd] hover:bg-[#ff2b2b3d] hover:text-[ff3b3b]" id="delete_${reply.id}">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-rounded-minus" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M9 12h6"/>
                                            <path d="M12 3c7.2 0 9 1.8 9 9s-1.8 9 -9 9s-9 -1.8 -9 -9s1.8 -9 9 -9z"/>
                                        </svg>
                                        Supprimer
                                        </button>
                                        <button class="flex items-center gap-2 p-2 text-[#bebabd] hover:bg-[#0dcfdc3d] hover:text-[#2cdce6]" id="edit_${reply.id}">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"/>
                                            <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"/>
                                            <path d="M16 5l3 3"/>
                                        </svg>
                                        Modifier
                                        </button>
                                    `;
                                    }
                                    repliesHTML += `
                                    <div class="reply my-2 rounded" id="container_${replyId}">
                                        <div class="flex space-x-2">
                                            <div class="flex justify-between items-center w-full"> 
                                                <div class="flex items-center gap-2">   
                                                    <img src="${window.location.origin}/cinetech/public/images/avatars/${reply.avatar}" alt="avatar" class="w-8 h-8 rounded-full">
                                                    <p>${reply.login}</p>
                                                </div>
                                                <p>${formatDate(reply.created_at)}</p>
                                            </div>
                                        </div>
                                        <p class="ml-10 font-light">${reply.content}</p>
                                        <div class="flex space-x-2 ml-10">
                                            <button class="p-2 text-[#bebabd] flex items-center gap-2 hover:bg-[#1ddc6f3d] hover:text-[#39e58c]" id="reply_${replyId}">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1"/>
                                                </svg>
                                            Répondre
                                            </button>
                                            <div id="${callToActionId}" class="flex gap-2">${callToActionHTML}</div>
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
                                        <div class="comment-container p-2 bg-[#4c3745] rounded text-white m-2">
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
                                        addReplyToComment(comment, 'reply', UrlId);
                                    });
                                    const editButton = commentsContainer.querySelector(`#edit_${comment.id}`);
                                    if (editButton) {
                                        editButton.addEventListener('click', (e) => {
                                            e.preventDefault();
                                            addReplyToComment(comment, 'edit', UrlId);
                                        });
                                    }
                                    const deleteButton = commentsContainer.querySelector(`#delete_${comment.id}`);
                                    if (deleteButton) {
                                        deleteButton.addEventListener('click', async (e) => {
                                            e.preventDefault();
                                            await fetch(`${window.location.origin}/cinetech/deleteComment/${UrlId}`, {
                                                method: 'POST',
                                                body: new FormData(),
                                                headers: {
                                                    'Content-Type': 'application/json'
                                                }
                                            })
                                                .then((response) => response.json())
                                                .then((data) => {
                                                    console.log(data);
                                                    if (data.success) {

                                                    }
                                                });
                                        });
                                    }
                                });
                            }
                            // Appel de la fonction pour afficher les commentaires
                            displayComments(commentsData);
                        } else {
                            containerComment.innerHTML = `
                                <div class="w-full p-2 bg-[#2a1825] h-12 rounded my-6">
                                    <p class="text-white">Aucun commentaire pour ce film</p>
                                </div>`;
                        }
                    });
            } else {
                fetch(`${window.location.origin}/cinetech/getComment/${UrlId}`)
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        const commentsData = data.comments;
                        if (data.status !== 'errors') {
                            function addReplyToComment() {
                                LoginRegister(btnHeaderloginRegister);
                            }
                            function generateCommentHTML(comment) {
                                const commentId = `comment_${comment.id}`;
                                let commentHTML = '';
                                let callToActionHTML = '';
                                commentHTML = `
                                    <div class="comment" id="${commentId}">
                                        <div class="flex space-x-2">
                                            <div class="flex justify-between items-center w-full"> 
                                                <div class="flex items-center gap-2">   
                                                    <img src="${window.location.origin}/cinetech/public/images/avatars/${comment.avatar}" alt="avatar" class="w-8 h-8 rounded-full">
                                                    <p>${comment.login}</p>
                                                </div>
                                                <p>${formatDate(comment.created_at)}</p>
                                            </div>
                                        </div>
                                        <h3>${comment.title_comment}</h3>
                                        <p class="ml-10 font-light">${comment.content}</p>
                                        <div class="flex space-x-2 ml-10">
                                            <button class="p-2 text-[#bebabd] flex items-center gap-2 hover:bg-[#1ddc6f3d] hover:text-[#39e58c]" id="reply_${comment.id}">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1"/>
                                                </svg>
                                            Répondre
                                            </button>
                                            <div id="callToAction_${comment.id}" class="flex gap-2">${callToActionHTML}</div>
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
                                    repliesHTML += `
                                    <div class="reply my-2 rounded" id="container_${replyId}">
                                        <div class="flex space-x-2">
                                            <div class="flex justify-between items-center w-full"> 
                                                <div class="flex items-center gap-2">   
                                                    <img src="${window.location.origin}/cinetech/public/images/avatars/${reply.avatar}" alt="avatar" class="w-8 h-8 rounded-full">
                                                    <p>${reply.login}</p>
                                                </div>
                                                <p>${formatDate(reply.created_at)}</p>
                                            </div>
                                        </div>
                                        <p class="ml-10 font-light">${reply.content}</p>
                                        <div class="flex space-x-2 ml-10">
                                            <button class="p-2 text-[#bebabd] flex items-center gap-2 hover:bg-[#1ddc6f3d] hover:text-[#39e58c]" id="reply_${replyId}">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-message-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1"/>
                                                </svg>
                                            Répondre
                                            </button>
                                            <div id="${callToActionId}" class="flex gap-2">${callToActionHTML}</div>
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
                                        <div class="comment-container p-2 bg-[#4c3745] rounded text-white m-2">
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
                                    repliesButton.addEventListener('mousedown', (e) => {
                                        e.preventDefault(); // Empêche la sélection de texte lors du clic
                                        LoginRegister(repliesButton);
                                    });
                                });
                            }
                            // Appel de la fonction pour afficher les commentaires
                            displayComments(commentsData);
                        } else {
                            containerComment.innerHTML = `
                                <div class="w-full p-2 bg-[#2a1825] h-12 rounded my-6">
                                    <p class="text-white">Aucun commentaire pour ce film</p>
                                </div>`;
                        }
                    });
            }
        });
}

//getMovie(UrlId);
//getMovieCast(UrlId);
//getSimilarMovie(UrlId);
async function main(){
    await getMovie(UrlId);
    await checkBookmarkMovie(UrlId);
    await getMovieCast(UrlId);
    await getSimilarMovie(UrlId);
}
main();
addComment(UrlId);
getComment(UrlId);
