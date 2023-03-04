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
// TODO: remove these predefined values
let numberOfLifts = 5;
let numberOfFloors = 8;

// console.log("before: page rendered")
// console.log(`lift value: ${numberOfLifts}`)
// console.log(`floor value: ${numberOfFloors}`)

// navbar buttons
const liftInputUpdate = document.querySelector("#lift-input-update");
const floorInputUpdate = document.querySelector("#floor-input-update");
const updateBtn = document.querySelector(".update-btn");

liftInputUpdate.value = numberOfLifts;
floorInputUpdate.value = numberOfFloors;

const liftOutputTag = document.querySelector('#lift-output');

function buildNewLiftContainer(numberOfLifts, numberOfFloors) {
    liftOutputTag.innerHTML = "Lifts: " + numberOfLifts + ' Floors: ' + numberOfFloors;
}

// handle update button click
updateBtn.addEventListener("click", () => {
    numberOfLifts = liftInputUpdate.value;
    numberOfFloors = floorInputUpdate.value;
    
    // do nothing if passed values are beyong bounds
    if (numberOfLifts < 1 || numberOfLifts > 5 || numberOfFloors < 2 || numberOfFloors > 10) return;

    buildNewLiftContainer(numberOfLifts, numberOfFloors);

})