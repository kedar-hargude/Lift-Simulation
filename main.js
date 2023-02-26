// "use strict";

// const callBtn4 = document.querySelector(".btn4");
// const callBtn3 = document.querySelector(".btn3");
// const callBtn2 = document.querySelector(".btn2");
// const callBtn1 = document.querySelector(".btn1");

// const door = document.querySelector(".door");

// function goto(floorNo) {
//     // door.style.bottom = '305px';
//     door.style.bottom = `${floorNo * 150 + 5}px`;
//     // door.style.transition = `bottom ${(floorNo + 1) * 2}s`
// }


// callBtn4.addEventListener("click", () => goto(3))
// callBtn3.addEventListener("click", () => goto(2))
// callBtn2.addEventListener("click", () => goto(1))
// callBtn1.addEventListener("click", () => goto(0))

const inputPage = document.querySelector(".input-page");
const liftsInput = document.getElementById("lift-input");
const floorInput = document.getElementById("floor-input");
const inputsSubmit = document.querySelector(".inputsSubmit");

// input page submitting inputs
inputsSubmit.addEventListener("click", () => {
    // if ((1 <= liftsInput.value <= 5) && (2 <= floorInput.value <= 10)) {
    //     // console.log(floorInput.value);
    //     console.log(`lifts: ${liftsInput.value}, floors: ${floorInput.value}`);
    //     inputPage.style.display = 'none';
    // } else {
    //         location.reload();
    //     }
    if ((liftsInput.value < 1 || liftsInput.value > 5) || (floorInput.value < 2 || floorInput.value > 10)) {
        location.reload();
    } else {
        console.log(`lifts: ${liftsInput.value}, floors: ${floorInput.value}`);
        inputPage.style.display = 'none';
    }
})