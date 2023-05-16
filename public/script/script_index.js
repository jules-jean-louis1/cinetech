import { LoginRegister } from './function/function.js';
import { profilHeader } from "./function/function.js";

const btnHeaderloginRegister = document.querySelector('#btnHeaderLoginRegister');
const btnHeaderLogout = document.querySelector('#btnHeaderLogout');
const btnHeaderProfile = document.querySelector('#btnHeaderProfile');

if (btnHeaderloginRegister) {
    LoginRegister(btnHeaderloginRegister);
}
if (btnHeaderProfile) {
    profilHeader(btnHeaderProfile);
}