const btnHeaderloginRegister = document.querySelector('#btnHeaderLoginRegister');

import { createDialog } from './function/function.js';

btnHeaderloginRegister.addEventListener('click', async (ev) => {
    ev.preventDefault();
    createDialog(containerModal);
    const dialog = document.getElementById("dialog");
    const containerDiv = document.getElementById("containerDiv");
});