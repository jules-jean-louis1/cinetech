function createDialog() {
    const containerModal = document.querySelector('#containerModalDialog');
    const dialog = document.createElement("dialog");
    dialog.setAttribute("id", "dialog");
    dialog.setAttribute("class", "w-[26.25rem] h-[55%] bg-[#202225] border-[1px] border-[#a8b3cf33] rounded-[14px] shadow-lg");
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
        await fetch('./login')
            .then(response => response.text())
            .then(data => {
                containerDiv.innerHTML = data;
            });
    });
}

export { createDialog,}