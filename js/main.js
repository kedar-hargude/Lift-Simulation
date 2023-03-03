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

// console.log(liftsInput.value)
// console.log(floorInput.value)

// let numberOfLifts = liftsInput.value;
// let numberOfFloors = floorInput.value;
let numberOfLifts = 5;
let numberOfFloors = 8;

console.log("before: page rendered")
console.log(`lift value: ${numberOfLifts}`)
console.log(`floor value: ${numberOfFloors}`)

const liftInputUpdate = document.querySelector("#lift-input-update");
const floorInputUpdate = document.querySelector("#floor-input-update");
const updateBtn = document.querySelector(".update-btn")

liftInputUpdate.value = numberOfLifts;
floorInputUpdate.value = numberOfFloors;

updateBtn.addEventListener("click", () => {
    // TODO: put those checks here of min and max values
    numberOfLifts = liftInputUpdate.value;
    numberOfFloors = floorInputUpdate.value;

    console.log("After click")
    console.log(`lifts updated value: ${numberOfLifts}`)
    console.log(`floors updated value: ${numberOfFloors}`)
})