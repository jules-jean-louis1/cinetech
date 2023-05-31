function updateField(data, fieldName, fieldInput, smallField) {
    if (data[fieldName]) {
        fieldInput.addEventListener('keyup', () => {
            const fieldValue = fieldInput.value;
            if (fieldValue === ''){
                smallField.innerHTML = '';
                smallField.innerHTML = `${data[fieldName]}`;
                smallField.classList.add('text-red-500');
                fieldInput.classList.remove('textField_border');
                fieldInput.classList.add('textField_invalid');
            } else {
                smallField.innerHTML = '';
                fieldInput.classList.remove('textField_invalid');
                fieldInput.classList.add('textField_border');
            }
        });
        smallField.innerHTML = '';
        smallField.innerHTML = `${data[fieldName]}`;
        fieldInput.classList.remove('textField_border');
        smallField.classList.add('text-red-500');
        fieldInput.classList.add('textField_invalid');
    }
}
const displayMessageToast = (modalAppend, message, state) => {
    modalAppend.innerHTML = '';
    const dialogElement = document.createElement('div');
    dialogElement.setAttribute('class', 'fixed z-10 inset-0 bg-[#05a763] rounded-lg open h-fit w-fit');
    dialogElement.setAttribute('id', 'ToastSuccess');
    const container = document.createElement('div');
    if (state === 'success') {
        container.setAttribute('class', 'flex items-center justify-between gap-2 bg-[#05a763] rounded-lg');
    } else if (state === 'error') {
        container.setAttribute('class', 'flex items-center justify-between gap-2 bg-[#ff003d] rounded-lg');
    } else if (state === 'warning') {
        container.setAttribute('class', 'flex items-center justify-between gap-2 bg-[#ffd53d] rounded-lg');
    } else if (state === 'info') {
        container.setAttribute('class', 'flex items-center justify-between gap-2 bg-[#0148d2] rounded-lg');
    } else if (state === 'default') {
        container.setAttribute('class', 'flex items-center justify-between gap-2 bg-[#3d3d3d] rounded-lg');
    }
    container.innerHTML = `
    <div class="p-2">
        <div class="flex items-center justify-between gap-2">
            <div class="flex items-center" id="svg_container"></div>
            <div class="flex items-center">
                <p class=" text-white">${message}</p>
            </div>
            <div class="border-l border-white">
                <button id="closeToast" class="text-white hover:text-gray-400 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M18 6l-12 12"/>
                        <path d="M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>`;

    dialogElement.appendChild(container);
    modalAppend.appendChild(dialogElement);
    dialogElement.classList.add('open');
    const svgContainer = document.getElementById('svg_container');
    if (state === 'success') {
        svgContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
            <path d="M9 12l2 2l4 -4"/>
        </svg>
        `;
    } else if (state === 'error') {
        svgContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-alert-triangle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M10.24 3.957l-8.422 14.06a1.989 1.989 0 0 0 1.7 2.983h16.845a1.989 1.989 0 0 0 1.7 -2.983l-8.423 -14.06a1.989 1.989 0 0 0 -3.4 0z"/>
            <path d="M12 9v4"/>
            <path d="M12 17h.01"/>
        </svg>
        `;
    } else if (state === 'warning') {
        svgContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"/>
            <path d="M12 9h.01"/>
            <path d="M11 12h1v4h1"/>
        </svg>
        `;
    } else if (state === 'info') {
        svgContainer.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-info-circle" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"/>
            <path d="M12 9h.01"/>
            <path d="M11 12h1v4h1"/>
        </svg>
        `;
    }
    const closeToast = document.getElementById('closeToast');
    closeToast.addEventListener('click', () => {
        dialogElement.classList.remove('open');
        dialogElement.remove();
    });
    setTimeout(() => {
        dialogElement.classList.remove('open');
        dialogElement.remove();
        modalAppend.innerHTML = '';
    }, 3000);
}

function createDialog() {
    const containerModal = document.querySelector('#containerModalDialog');
    const dialog = document.createElement("dialog");
    dialog.setAttribute("id", "dialog");
    dialog.setAttribute("class", "w-[26.25rem] h-[55%] border-[1px] border-[#251821] bg-[#251821] rounded shadow-lg");
    dialog.innerHTML = '';

    const divBottom = document.createElement("div");
    divBottom.setAttribute("id", "divBottom");
    divBottom.setAttribute("class", "w-full flex items-center justify-center bg-[#251821] border-t-[1px] border-t-[#a8b3cf33] text-white");
    divBottom.innerHTML = `
            <div class="w-full flex items-center justify-center">
                <p class="text-sm" id="TextchangeLogin">Vous n'avez pas de compte ?</p>
                <button type="button" id="buttonLogin" class="p-4 bg-red rounded-lg">S'inscrire</button>
            </div>
        `;
    const Div = document.createElement("div");
    Div.setAttribute("id", "DivModifyText");
    Div.setAttribute("class", "py-2 px-4 w-full flex items-center justify-between bg-[#251821] border-b-[1px] border-b-[#a8b3cf33] text-white font-semibold text-lg");
    const Para = document.createElement("p")
    Para.setAttribute("id", "ParaModifyText");
    Para.textContent = "Se connecter sur Game+";

    const buttonClose = document.createElement("button");
    buttonClose.innerHTML = `
            <svg width="1em" height="1em" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-7 h-7 pointer-events-none"><path d="M16.804 6.147a.75.75 0 011.049 1.05l-.073.083L13.061 12l4.72 4.72a.75.75 0 01-.977 1.133l-.084-.073L12 13.061l-4.72 4.72-.084.072a.75.75 0 01-1.049-1.05l.073-.083L10.939 12l-4.72-4.72a.75.75 0 01.977-1.133l.084.073L12 10.939l4.72-4.72.084-.072z" fill="currentcolor" fill-rule="evenodd"></path></svg>
        `;
    buttonClose.setAttribute("id", "buttonClose");
    buttonClose.setAttribute("type", "button");
    buttonClose.setAttribute("class", "font-bold cursor-pointer select-none focus-outline justify-center flex z-1 rounded-[12px] hover:bg-[#a8b3cf1f]");

    const Divflex1 = document.createElement("div");
    Divflex1.setAttribute("class", "flex flex-1");

    const containerDiv = document.createElement("div");
    containerDiv.setAttribute("id", "containerDiv");
    containerDiv.setAttribute("class", "flex justify-center w-full h-[78%]");

    dialog.appendChild(Div);
    Div.appendChild(Para);
    Div.appendChild(buttonClose);
    dialog.appendChild(containerDiv);
    dialog.appendChild(Divflex1);
    dialog.appendChild(divBottom);
    containerModal.appendChild(dialog);
}
async function LoginRegister(btnLogin) {
    createDialog();
    const dialog = document.getElementById("dialog");
    const containerDiv = document.getElementById("containerDiv");
    const background = document.getElementById("containerModalDialog");
    btnLogin.addEventListener('click', async (ev) => {
        dialog.showModal();
        background.classList.add('bg-overlay-quaternary-onion');
        const buttonLogin = document.getElementById("buttonLogin");
        const ParaModifyText = document.getElementById("ParaModifyText");
        await fetch(`${window.location.origin}/cinetech/login`)
            .then(response => response.text())
            .then(data => {
                containerDiv.innerHTML = data;
                const formLogin = document.getElementById("login-form");
                formLogin.addEventListener('submit', async (ev) => {
                    ev.preventDefault();
                    await fetch(`${window.location.origin}/cinetech/login/submit`, {
                        method: 'POST',
                        body: new FormData(formLogin)
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log(data);
                        });
                });
            });
        buttonLogin.addEventListener('click', async (ev) => {
            if (buttonLogin.textContent === "Connexion") {
                buttonLogin.textContent = "S'inscrire";
                ParaModifyText.textContent = "Se connecter sur WatchManager";
                await fetch(`${window.location.origin}/cinetech/login`)
                    .then(response => response.text())
                    .then(data => {
                        containerDiv.innerHTML = '';
                        containerDiv.innerHTML = data;
                        const formLogin = document.getElementById("login-form");
                        formLogin.addEventListener('submit', async (ev) => {
                            ev.preventDefault();
                            await fetch(`${window.location.origin}/cinetech/login/submit`, {
                                method: 'POST',
                                body: new FormData(formLogin)
                            })
                                .then(response => response.json())
                                .then(data => {
                                    let message = document.getElementById("errorMsg");
                                    //small
                                    const smallEmail = document.getElementById("errorEmail");
                                    const smallPassword = document.getElementById("errorPassword");
                                    if (data.email) {
                                        smallEmail.textContent = '';
                                        smallEmail.textContent = data.email;
                                    }
                                    if (data.password) {
                                        smallPassword.textContent = '';
                                        smallPassword.textContent = data.password;
                                    }
                                    if (data.email && data.password) {
                                        message.textContent ='';
                                        message.textContent = "Veuillez remplir tous les champs";
                                    }
                                    if (data.error) {
                                        message.textContent ='';
                                        message.textContent = data.error;
                                    }
                                    if (data.success) {
                                        smallPassword.textContent = '';
                                        smallEmail.textContent = '';
                                        message.textContent ='';
                                        message.textContent = 'Connexion réussie';
                                        setTimeout(() => {
                                            window.location.reload();
                                        });
                                    }
                                });
                        });
                    });
            } else {
                buttonLogin.textContent = "Connexion";
                ParaModifyText.textContent = "S'inscrire sur WatchManager";
                await fetch(`${window.location.origin}/cinetech/register`)
                    .then(response => response.text())
                    .then(data => {
                        containerDiv.innerHTML = '';
                        containerDiv.innerHTML = data;
                        const formRegister = document.getElementById("register-form");
                        formRegister.addEventListener('submit', async (ev) => {
                            ev.preventDefault();
                            await fetch(`${window.location.origin}/cinetech/register/submit`, {
                                method: 'POST',
                                body: new FormData(formRegister)
                            })
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data);
                                    let message = document.getElementById("errorMsg");
                                    const loginInput = document.getElementById("login");
                                    const emailInput = document.getElementById("email");
                                    const passwordInput = document.getElementById("password");
                                    const passwordConfirmInput = document.getElementById("passwordConfirm");
                                    // Small
                                    const smallLogin = document.getElementById("errorLogin");
                                    const smallEmail = document.getElementById("errorEmail");
                                    const smallPassword = document.getElementById("errorPassword");
                                    const smallPasswordConfirm = document.getElementById("errorC_Password");
                                    // Error
                                    if (data.login || data.email || data.password || data.passwordConfirm) {
                                        message.innerHTML = 'Veuillez remplir tous les champs';
                                    }
                                    if (data.success) {
                                        message.innerHTML = 'Inscription réussie';
                                    }
                                });
                        });
                    });
            }
        });
        const buttonClose = document.getElementById("buttonClose");
        buttonClose.addEventListener("click", () => {
            dialog.close();
            background.classList.remove('bg-overlay-quaternary-onion');
        });
    });
}

// Profil Header Utiliser l'URL Absolut pour le fetch
async function profilHeader(container) {
    await fetch(`${window.location.origin}/cinetech/profilHeader`)
        .then(response => response.json())
        .then(data => {
            if (data.login) {
                container.innerHTML =
                    `<div class="flex items-center justify-center w-full h-full">
                        <img src="${window.location.origin}/cinetech/public/images/avatars/${data.avatar}" alt="${data.avatar}" class="h-6 w-6 rounded-full">
                        <p class="ml-2 font-bold text-white">${data.login}</p>
                    </div>
                    `;
            }
        });
}
function formatDate(timestamp) {
    const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = months[date.getMonth()];
    const day = date.getDate();
    return `${day} ${month} ${year}`;
}
function yearsFormat(timestamp) {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    return `${year}`;
}
const successMessageToast = (modalAppend, message) => {
    const dialogElement = document.createElement('div');
    dialogElement.setAttribute('class', 'fixed z-10 inset-0 bg-[#05a763] rounded-lg open h-fit w-fit');
    dialogElement.setAttribute('id', 'ToastSuccess');
    const container = document.createElement('div');
    container.innerHTML = `
    <div class="p-2">
        <div class="flex items-center justify-between gap-2">
            <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-circle-check" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"/>
                    <path d="M9 12l2 2l4 -4"/>
                </svg>
            </div>
            <div class="flex items-center">
                <p class=" text-white">${message}</p>
            </div>
            <div class="border-l border-white">
                <button id="closeToast" class="text-white hover:text-gray-400 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-x" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                        <path d="M18 6l-12 12"/>
                        <path d="M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>`;
    dialogElement.appendChild(container);
    modalAppend.appendChild(dialogElement);
    dialogElement.classList.add('open');
    const closeToast = document.getElementById('closeToast');
    closeToast.addEventListener('click', () => {
        dialogElement.classList.remove('open');
        dialogElement.remove();
    });
}
const getPosterPath = (posterPath) => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterPath}`;
};
function headerMenu() {
    const btnHeaderProfile = document.querySelector('#btnHeaderProfile');
    const menuProfilHeader = document.querySelector('#menuProfilHeader');

    // Afficher ou masquer le menu au clic sur le bouton
    btnHeaderProfile.addEventListener('click', () => {
        menuProfilHeader.classList.toggle('hidden');
    });

    // Fermer le menu lorsque l'utilisateur clique en dehors du menu
    document.addEventListener('click', (event) => {
        const targetElement = event.target;

        // Vérifier si l'élément cliqué est en dehors du menu
        if (!menuProfilHeader.contains(targetElement) && !btnHeaderProfile.contains(targetElement)) {
            menuProfilHeader.classList.add('hidden');
        }
    });
}
function generateSlug(title) {
    let slug = title.toLowerCase(); // Convertit le titre en minuscules
    slug = slug.replace(/[^a-z0-9]+/g, '-'); // Remplace les caractères non alphabétiques et non numériques par des tirets
    slug = slug.replace(/^-+|-+$/g, ''); // Supprime les tirets en début et en fin de chaîne
    return slug;
}
function searchBarHeader() {
    const searchBar = document.querySelector('#search');
    const displayResult = document.querySelector('#displayResultSearch');
    const formSearch = document.querySelector('#searchBarHeader');
    const btnSearch = document.querySelector('#submitBtnSearch');
    const erraseSearch = document.querySelector('#eraseSearches');
    formSearch.addEventListener('keyup', async (e) => {
        e.preventDefault();
        const query = searchBar.value;
        if (query.length > 0) {
            erraseSearch.classList.remove('hidden');
            await fetch(`http://api.themoviedb.org/3/search/multi?api_key=336f5174afdbef18cdcc2f6d25e36288&language=fr-FR&query=${query}&page=1&include_adult=false`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    displayResult.innerHTML = '';
                    let result = data.results;
                    if (result.length > 0) {
                        displayResult.classList.add('py-2', 'px-4');
                        const maxResults = 8; // Limite le nombre de résultats affichés
                        for (let i = 0; i < Math.min(result.length, maxResults); i++) {
                            const element = result[i];
                            if (element.media_type === 'movie') {
                                element.media_type = 'Film';
                                displayResult.innerHTML += `
                                <a href="${window.location.origin}/cinetech/movie/${element.id}-${generateSlug(element.title)}" class="text-white text-center flex p-1 hover:bg-[#251821]">
                                    <li class="text-white flex gap-3">
                                        <div id="containerImageSearch">
                                            <img src="${getPosterPath(element.poster_path)}" alt="${element.poster_path}" class="w-12">
                                        </div>
                                        <div class="flex flex-col justify-around ml-2">
                                            <div id="title_search_bar">
                                                <h2 class="text-white">${element.title}</h2>
                                            </div>
                                            <div id="containerDate_Typesearch" class="flex space-x-4">
                                                <div id="containerDateSearch">
                                                    <p class="text-white/60 text-sm"><b>Année : </b>${formatDate(element.release_date)}</p>
                                                </div>
                                                <div id="containerTypeMediaSearch">
                                                    <p class="text-white/60 text-sm"><b>Type : </b>${element.media_type}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </a>
                                `;
                            } else if (element.media_type === 'tv') {
                                element.media_type = 'Série';
                                displayResult.innerHTML += `
                                <a href="${window.location.origin}/cinetech/series/${element.id}-${generateSlug(element.name)}" class="text-white text-center flex p-1 hover:bg-[#251821]">
                                    <li class="text-white text-center flex">
                                        <div id="containerImageSearch">
                                            <img src="${getPosterPath(element.poster_path)}" alt="${element.poster_path}" class="w-12">
                                        </div>
                                        <div class="flex flex-col justify-around ml-2">
                                            <div id="title_search_bar">
                                                <h2 class="text-white">${element.name}</h2>
                                            </div>
                                            <div id="containerDate_Typesearch" class="flex space-x-4">
                                                <div id="containerDateSearch">
                                                    <p class="text-white/60 text-sm"><b>Année : </b>${yearsFormat(element.first_air_date)}</p>
                                                </div>
                                                <div id="containerTypeMediaSearch">
                                                    <p class="text-white/60 text-sm"><b>Type : </b>${element.media_type}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </a>
                                `;
                            }
                        }
                        if (result.length > maxResults) {
                            displayResult.innerHTML += `
                        <a href="${window.location.origin}/cinetech/search?query=${encodeURIComponent(query)}" class="text-white text-center flex p-1">
                            <li class="text-white text-center flex">
                                <div class="more-results">
                                    Voir tous les résultats (${result.length})
                                </div>
                            </li>
                        </a>
                        `;
                        }
                    }
                });
        } else {
            erraseSearch.classList.add('hidden');
            displayResult.classList.remove('py-2', 'px-4');
            displayResult.innerHTML = '';
        }
        if (erraseSearch) {
            erraseSearch.addEventListener('click', () => {
                searchBar.value = '';
                erraseSearch.classList.add('hidden');
                displayResult.classList.remove('py-2', 'px-4');
                displayResult.innerHTML = '';
            });
        }
    });
    formSearch.addEventListener('submit', (e) => {
        e.preventDefault();
        const query = searchBar.value;
        if (query.length > 0) {
            window.location.href = `${window.location.origin}/cinetech/search?query=${encodeURIComponent(query)}`;
        }
    });
}

export { createDialog, LoginRegister, profilHeader, formatDate, yearsFormat, headerMenu, getPosterPath, successMessageToast, displayMessageToast};
export { searchBarHeader, generateSlug }