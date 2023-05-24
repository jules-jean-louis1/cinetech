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

// TV SHOW PAGE
const apiKey = '336f5174afdbef18cdcc2f6d25e36288';
const language = 'fr-FR';
let getGenreIn = [];
async function getGenre() {
    const response = await fetch(`https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=${language}`);
    const data = await response.json();
    return data;
}

function displayGenre() {
    const displayGenre = document.querySelector('#containerGenres');
    const genreData = getGenre();
    const selectedGenres = []; // Tableau des genres sélectionnés
    genreData.then(data => {
        let optionHTML = '';
        for (const element of data.genres) {
            optionHTML += `
                <div data-id="${element.id}">
                    <button type="button" name="genre" id="btnGenre_${element.id}" class="border-2 border-black rounded-lg">
                        ${element.name}
                    </button>
                </div>
            `;
        }
        displayGenre.innerHTML = optionHTML;
        for (const element of data.genres) {
            const btnGenre = document.querySelector(`#btnGenre_${element.id}`);
            btnGenre.addEventListener('click', (event) => {
                if (event.target.classList.contains('border-black')) {
                    event.target.classList.remove('border-black');
                    event.target.classList.add('bg-red-500', 'border-2', 'border-red-500');
                    selectedGenres.push(element.id); // Ajouter le genre sélectionné au tableau
                } else {
                    event.target.classList.remove('bg-red-500', 'border-2', 'border-red-500');
                    event.target.classList.add('border-black', 'border-2');
                    const index = selectedGenres.indexOf(element.id);
                    if (index !== -1) {
                        selectedGenres.splice(index, 1); // Supprimer le genre sélectionné du tableau
                    }
                }
                getMoviesByGenres(selectedGenres); // Appeler la fonction avec les genres sélectionnés
            });
        }
    });
}


async function getMoviesByGenres(genreIds) {
    const genreQueryString = genreIds.join(',');
    const response = await fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=${language}&with_genres=${genreQueryString}`);
    const data = await response.json();
    displayMovies(data.results);
}

function generateSlug(title) {
    let slug = title.toLowerCase(); // Convertit le titre en minuscules
    slug = slug.replace(/[^a-z0-9]+/g, '-'); // Remplace les caractères non alphabétiques et non numériques par des tirets
    slug = slug.replace(/^-+|-+$/g, ''); // Supprime les tirets en début et en fin de chaîne
    return slug;
}
function displayMovies(movies) {
    const containerSeries = document.querySelector('#containerSeries');
    let movieHTML = '';
    for (const movie of movies) {
        movieHTML += `
            <div data-genre="${movie.genre_ids.join(',')}">
                <div class="flex flex-col pl-5 gap-2">
                <a href="/cinetech/movie/${movie.id}-${generateSlug(movie.name)}">
                    <img src="${getPosterPath(movie.poster_path)}" class="w-[150px] h-[225px] shadow-sm rounded-md">
                    <div class="flex flex-col px-3 w-[150px]">
                        <h2 class="text-sm font-bold text-center">${movie.name}</h2>
                        <p class="text-xs text-center">${formatDate(movie.first_air_date)}</p>
                    </div>
                </a>
                </div>
            </div>
        `;
    }
    containerSeries.innerHTML = movieHTML;
}

function removeMoviesByGenres(genreIds) {
    const containerSeries = document.querySelector('#containerSeries');
    for (const genreId of genreIds) {
        const movies = containerSeries.querySelectorAll(`[data-genre="${genreId}"]`);
        for (const movie of movies) {
            movie.remove();
        }
    }
}


// Appel de la fonction pour afficher les genres
displayGenre();

displayGenre();