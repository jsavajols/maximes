// @ts-nocheck
import { browser } from '$app/environment';
let burger;
let menu;
if (browser) {
    burger = document.querySelector('#burger');
    menu = document.querySelector('#menu');
}

burger?.addEventListener('click', () => {
    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
    } else {
        menu.classList.add('hidden');
    }
});