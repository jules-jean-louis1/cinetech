import {
    formatDate,
    getPosterPath,
    headerMenu,
    LoginRegister,
    profilHeader,
    successMessageToast,
} from './function/function.js';
import {displayMessageToast} from './function/function.js';
import {yearsFormat} from './function/function.js';
import {generateSlug} from './function/function.js';

const btnHeaderloginRegister = document.querySelector('#btnHeaderLoginRegister');
const btnHeaderLogout = document.querySelector('#btnHeaderLogout');
const btnHeaderProfile = document.querySelector('#btnHeaderProfile');
const containerModalDialog = document.querySelector('#containerModalDialog');

if (btnHeaderloginRegister) {
    LoginRegister(btnHeaderloginRegister);
}
if (btnHeaderProfile) {
    await headerMenu();
    await profilHeader(btnHeaderProfile);
}
// MOVIE SERIES PAGE
// Récupérer l'URL actuelle
const url = window.location.href;
const segments = url.split('/');
const lastSegment = segments[segments.length - 1];
const idAndSlug = lastSegment.split('-');
const UrlId = idAndSlug[0];

// Récupérer les données du film
const containerMovies = document.querySelector('#containerSeries');
const detailMovie = document.querySelector('#detailSeries');
const containerCast = document.querySelector('#containerCast');
const containerSimilarMovies = document.querySelector('#containerSimilarSeries');

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

async function getSeries(UrlId){
    await fetch(`https://api.themoviedb.org/3/tv/${UrlId}?api_key=${apiKey}&language=${language}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const titlePage = document.querySelector('title');
            titlePage.innerHTML = `${data.name} - Movie`;
            const ContainerMovie = document.createElement('div');
            ContainerMovie.className = 'flex flex-col items-center gap-4';
            ContainerMovie.innerHTML = `
                <div class="flex flex-row w-10/12">
                    <img src="${getPosterPath(data.poster_path)}" alt="${data.title}" class="w-96 h-fit">
                    <div class="flex flex-col gap-2">
                        <h1 class="text-3xl font-bold">${data.name}</h1>
                            <div id="original_title">
                                <h3 class="">Titre original:</h3>
                                <p class="text-sm">${data.original_name}(${data.original_language})</p>
                            </div>
                        <h2 class="text-2xl">${data.tagline}</h2>
                        <div id="realease_date" class="flex space-x-2">
                            <p class="text-sm">${yearsFormat(data.first_air_date)}</p>
                            <p class="text-sm">/ ${data.episode_run_time} min</p>
                            <div id="containerGenres" class="flex space-x-2"></div>
                        </div>
                        <div id="vote_average" class="flex flex-col space-y-2">
                            <div class="flex">
                                ${generateStarIcons(data.vote_average)}
                            </div>
                            <div id="vote_count" class="flex space-x-2">
                                <p class="text-sm font-light">${data.vote_count} votes</p>
                            </div>
                        </div>
                        <div id="containerBtnAddBookmarks"></div>
                        <div id="episode_season" class="flex gap-2">
                            <div class="flex flex-col gap-2 items-center">
                                <h3 class="text-xl">${data.number_of_seasons}</h3>
                                <p class="text-sm uppercase font-bold">Saisons</p>
                            </div>
                            <div class="flex flex-col gap-2 items-center">
                                <h3 class="text-xl">${data.number_of_episodes}</h3>
                                <p class="text-sm uppercase font-bold">Episodes</p>
                            </div>
                        </div>
                        <div id="status" class="flex space-x-2">
                            <p class="text-sm" id="para_status">${data.status}</p>
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
                    <p class="text-sm">/${data.genres[i].name}</p>
                `;
            }
            for (let i = 0; i < data.genres.length; i++) {
                genreMovie += data.genres[i].id;
                if (i < data.genres.length - 1) {
                    genreMovie += ',';
                }
            }
            const paraStatus = document.querySelector('#para_status');
            if (data.status === 'Returning Series'){
                paraStatus.innerHTML = 'En cours';
                paraStatus.classList.add('text-green-500');
            } else if (data.status === 'Ended'){
                paraStatus.innerHTML = 'Terminé';
                paraStatus.classList.add('text-red-500');
            }
        });
}
async function getSeriesCast(UrlId){
    await fetch(`https://api.themoviedb.org/3/tv/${UrlId}/credits?api_key=${apiKey}&language=${language}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            const ContainerMovieCast = document.createElement('div');
            ContainerMovieCast.className = 'flex flex-col gap-4';
            ContainerMovieCast.innerHTML = `
                <h1 class="text-3xl font-bold">Acteurs</h1>
                <div id="containerMovieCast" class="flex flex-row gap-4 overscroll-x-auto"></div>
            `;
            containerCast.appendChild(ContainerMovieCast);
            for (let i = 0; i < 10; i++) {
                const cast = data.cast[i];
                if (cast && cast.profile_path && cast.name && cast.character) {
                    const displayMovieCast = document.querySelector('#containerMovieCast');
                    displayMovieCast.innerHTML += `
                    <div class="flex flex-col gap-2 border border-slate-200 rounded">
                        <a href="${window.location.origin}/cinetech/actor/${cast.id}-${generateSlug(cast.name)}" class="text-center text-sm font-bold text-slate-500">
                            <img src="${getPosterPath(cast.profile_path)}" alt="${cast.name}" class="w-36 h-fit">
                            <p class="text-sm">${cast.name}</p>
                            <p class="text-sm text-slate-500">${cast.character}</p>
                        </a>
                    </div>`;
                }
            }
        });
}
async function getSimilarSeries(UrlId){
    await fetch(`https://api.themoviedb.org/3/tv/${UrlId}/recommendations?api_key=${apiKey}&language=${language}&page=1&sort_by=popularity.asc&with_genres=${genreMovie}`)
        .then((response) => response.json())
        .then((data) => {
            const ContainerSimilarMovie = document.createElement('div');
            ContainerSimilarMovie.className = 'flex flex-col gap-4';
            ContainerSimilarMovie.innerHTML = `
                <h1 class="text-3xl font-bold">Recommandations</h1>
                <div id="containerSimilarMovie" class="flex flex-row gap-4 overscroll-x-auto"></div>
            `;
            containerSimilarMovies.appendChild(ContainerSimilarMovie);
            for (let i = 0; i < 10; i++) {
                const displaySimilarMovie = document.querySelector('#containerSimilarMovie');
                displaySimilarMovie.innerHTML += `
                    <div class="flex flex-col gap-2 border border-slate-200 rounded">
                        <a href="${window.location.origin}/cinetech/series/${data.results[i].id}-${data.results[i].name.replace(/ /g, "-")}">
                            <img src="${getPosterPath(data.results[i].poster_path)}" alt="${data.results[i].name}" class="w-36 h-fit">
                            <p class="text-sm">${data.results[i].name}</p>
                        </a>
                    </div>
                `;
            }
        });
}
async function movieType(UrlId){
    const tvResponse = await fetch(`https://api.themoviedb.org/3/tv/${UrlId}?api_key=${apiKey}`);
    const tvData = await tvResponse.json();
    if (tvData.id) {
        return 'tv';
    } else {
        return 'error';
    }
}

async function checkBookmarkMovie(UrlId) {
    const containerBookmarks = document.querySelector('#containerBtnAddBookmarks');
    await fetch(`${window.location.origin}/cinetech/getBookmarks/${UrlId}`)
        .then((response) => response.json())
        .then(async (data) => {
            if (data) {
                containerBookmarks.innerHTML = `<button id="btnAddBookmarks" class="w-36 h-12 bg-slate-500 text-white rounded">Retirer des favoris</button>`;
                const btnAddBookmarks = document.querySelector('#btnAddBookmarks');
                btnAddBookmarks.addEventListener('click', async (e) => {
                    e.preventDefault();
                    await fetch(`${window.location.origin}/cinetech/removeBookmarks/${UrlId}`)
                        .then((response) => response.json())
                        .then((data) => {
                            console.log(data);
                            checkBookmarkMovie(UrlId);
                        });
                });
            } else {
                containerBookmarks.innerHTML = `<button id="btnAddBookmarks" class="w-36 h-12 bg-slate-500 text-white rounded">Ajouter aux favoris</button>`;
                const contentType = await movieType(UrlId);
                if (contentType === 'movie' || contentType === 'tv') {
                    const btnAddBookmarks = document.querySelector('#btnAddBookmarks');
                    btnAddBookmarks.addEventListener('click', async (e) => {
                        e.preventDefault();
                        await fetch(`${window.location.origin}/cinetech/addBookmarks/${UrlId}/${contentType}`)
                            .then((response) => response.json())
                            .then((data) => {
                                console.log(data);
                                checkBookmarkMovie(UrlId);
                                successMessageToast(containerModalDialog, 'Ajouté aux favoris')
                            });
                    });
                }
            }
        });
}
async function addComment(UrlId){
    const containerCommentsForm = document.querySelector('#containerCommentsForm');
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
                    getComment(UrlId);
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
                        console.log(data);
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
                                </div>
                                        `;
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
                                    <button class="border-2 border-black" id="delete_${comment.id}">Supprimer</button>
                                    <button class="border-2 border-black" id="edit_${comment.id}">Modifier</button>
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
                                            <div class="flex justify-between items-center w-full"> 
                                                <div class="flex items-center gap-2">   
                                                    <img src="${window.location.origin}/cinetech/public/images/avatars/${reply.avatar}" alt="avatar" class="w-8 h-8 rounded-full">
                                                    <p>${reply.login}</p>
                                                </div>
                                                <p>${formatDate(reply.created_at)}</p>
                                            </div>
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
                    <p class="text-red-500">Aucun commentaire pour cette series</p>
                `;
                        }
                    });
            } else {
                console.log("Vous n'êtes pas connecté");
            }
        });

}


async function main() {
    await getSeries(UrlId);
    await checkBookmarkMovie(UrlId);
    await getSeriesCast(UrlId);
    await getSimilarSeries(UrlId);
}
main();
addComment(UrlId);
getComment(UrlId);