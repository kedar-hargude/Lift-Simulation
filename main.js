"use strict";

const callBtn4 = document.querySelector(".btn4");
const callBtn3 = document.querySelector(".btn3");
const callBtn2 = document.querySelector(".btn2");
const callBtn1 = document.querySelector(".btn1");

const door = document.querySelector(".door");

function goto4() {
    door.style.bottom = '305px';
}

callBtn4.addEventListener("click", goto4)