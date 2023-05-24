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
const MessageToast = (modalAppend, message, state) => {
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
        container.setAttribute('class', 'flex items-center justify-between gap-2 bg-[#ffd53d] rounded-lg');
    } else if (state === 'default') {
        container.setAttribute('class', 'flex items-center justify-between gap-2 bg-[#3d3d3d] rounded-lg');
    }
    container.innerHTML = `
    <div class="p-2">
        <div class="flex items-center justify-between gap-2">
            <div class="flex items-center" id="svg_container">
                
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
    dialogElement.appendChild(container);
    modalAppend.appendChild(dialogElement);
    dialogElement.classList.add('open');
    const closeToast = document.getElementById('closeToast');
    closeToast.addEventListener('click', () => {
        dialogElement.classList.remove('open');
        dialogElement.remove();
    });
}

function createDialog() {
    const containerModal = document.querySelector('#containerModalDialog');
    const dialog = document.createElement("dialog");
    dialog.setAttribute("id", "dialog");
    dialog.setAttribute("class", "w-[26.25rem] h-[55%] bg-slate-200 border-[1px] border-[#a8b3cf33] rounded-[14px] shadow-lg");
    dialog.innerHTML = '';

    const divBottom = document.createElement("div");
    divBottom.setAttribute("id", "divBottom");
    divBottom.setAttribute("class", "w-full flex items-center justify-center bg-[#202225] border-t-[1px] border-t-[#a8b3cf33] text-white");
    divBottom.innerHTML = `
            <div class="w-full flex items-center justify-center">
                <p class="text-sm" id="TextchangeLogin">Vous n'avez pas de compte ?</p>
                <button type="button" id="buttonLogin" class="p-4 bg-red rounded-lg">S'inscrire</button>
            </div>
        `;
    const Div = document.createElement("div");
    Div.setAttribute("id", "DivModifyText");
    Div.setAttribute("class", "py-2 px-4 w-full flex items-center justify-between bg-[#202225] border-b-[1px] border-b-[#a8b3cf33] text-white font-semibold text-lg");
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
    btnLogin.addEventListener('click', async (ev) => {
        dialog.showModal();
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
                ParaModifyText.textContent = "Se connecter sur Game+";
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
                                        message.textContent = data.success;
                                    }
                                });
                        });
                    });
            } else {
                buttonLogin.textContent = "Connexion";
                ParaModifyText.textContent = "S'inscrire sur Game+";
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
                        <p class="ml-2 font-bold text-black">${data.login}</p>
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
function headerMenu() {
    const btnHeaderProfile = document.getElementById('btnHeaderProfile');
    const menuProfilHeader = document.getElementById('menuProfilHeader');

    btnHeaderProfile.addEventListener('click', () => {
        menuProfilHeader.classList.toggle('hidden');
    });

// Fermer le menu lorsque l'utilisateur clique en dehors de celui-ci
    document.addEventListener('click', (event) => {
        const targetElement = event.target;
        const isMenuOpen = !menuProfilHeader.classList.contains('hidden');

        if (isMenuOpen && !targetElement.closest('#menuProfilHeader') && targetElement !== btnHeaderProfile) {
            menuProfilHeader.classList.add('hidden');
        }
    });
}
const getPosterPath = (posterPath) => {
    return `https://www.themoviedb.org/t/p/w220_and_h330_face${posterPath}`;
};

export { createDialog, LoginRegister, profilHeader, formatDate, headerMenu, getPosterPath, successMessageToast};