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

// const liftsInput = document.getElementById("lift-input");
// const floorInput = document.getElementById("floor-input");

// input page buttons
const inputPage = document.querySelector(".input-page");
const liftsInput = document.getElementById("lift-input");
const floorInput = document.getElementById("floor-input");
const inputsSubmit = document.querySelector(".inputsSubmit");

// navbar buttons
const liftInputUpdate = document.querySelector("#lift-input-update");
const floorInputUpdate = document.querySelector("#floor-input-update");
const updateBtn = document.querySelector(".update-btn");

let floorsCountGlobal = 0;
let liftsCountGlobal = 0;

// current lift value here
let currentLiftNumber = 0;
let liftsStateArray = [];

// input page submitting inputs
inputsSubmit.addEventListener("click", () => {

    if ((liftsInput.value < 1 || liftsInput.value > 5) || (floorInput.value < 2 || floorInput.value > 10)) {
        location.reload();
    } else {
        console.log(`lifts: ${liftsInput.value}, floors: ${floorInput.value}`);
        inputPage.style.display = 'none';

        floorsCountGlobal = floorInput.value;
        liftsCountGlobal = liftsInput.value;

        liftInputUpdate.value = liftsInput.value;
        floorInputUpdate.value = floorInput.value;

        // set each element in liftsStateArray (each lift position) to 0 
        for (let i = 0; i < liftsCountGlobal; i++) {
            liftsStateArray[i] = 1;
        }

        buildNewLiftContainer(liftsInput.value, floorInput.value);
    }
});

// handle update button click
updateBtn.addEventListener("click", () => {
    numberOfLifts = liftInputUpdate.value;
    numberOfFloors = floorInputUpdate.value;
    
    // do nothing if passed values are beyong bounds
    if (numberOfLifts < 1 || numberOfLifts > 5 || numberOfFloors < 2 || numberOfFloors > 10) return;

    floorsCountGlobal = numberOfFloors;
    liftsCountGlobal = numberOfLifts;
    buildNewLiftContainer(numberOfLifts, numberOfFloors);
    currentLiftNumber = 0;
});



function getSelectedLiftNumber(clickedFloorNumber) {
    // // console.log(`current lift count value: ${currentLiftNumber}`);
    console.log(`clicked floor: ${clickedFloorNumber}, liftsArray: ${liftsStateArray}`);
    // if lift already on floor, return the same lift number
    if (liftsStateArray.includes(clickedFloorNumber)) {
        // console.log(`first case chya aat. clickedFloorNumber: ${clickedFloorNumber}, liftsStateArray: ${liftsStateArray}`);
        currentLiftNumber = liftsStateArray.indexOf(clickedFloorNumber) + 1; // array has every lift value starting from 0
        // console.log(`lift on same floor: to be returned lift number: ${currentLiftNumber}`)
        return currentLiftNumber;
    }

    let minGapBetnFloorAndLift = floorsCountGlobal + 5; // just as a safe extreme

    for (let liftCount = 1; liftCount <= liftsCountGlobal; liftCount++) {
        let individualLiftGap = Math.abs(clickedFloorNumber - liftsStateArray[liftCount - 1]);
        // console.log(`liftCount: ${liftCount}, tempGap: ${tempGap}`);
        if (individualLiftGap < minGapBetnFloorAndLift) {
            currentLiftNumber = liftCount;
            minGapBetnFloorAndLift = individualLiftGap;
        }
    }
    // console.log(`selected currentLiftNumber: ${currentLiftNumber}`);
    
    // // Don't know why this works with double equals and not triple equals
    // if (currentLiftNumber == liftsCountGlobal) {
    //     // console.log(`liftsCountGlobal: ${liftsCountGlobal}, currentLiftNumber: ${currentLiftNumber}`)
    //     currentLiftNumber = 1;
    // } else {
    //     currentLiftNumber += 1;
    // }
    // console.log(`liftNumber to be provided: ${currentLiftNumber}, liftsCountGlobal: ${liftsCountGlobal}`);

    liftsStateArray[currentLiftNumber - 1] = clickedFloorNumber;
    return currentLiftNumber;
}


function liftCallClickHandler( isUpPressed, floorNumber) {
    // console.log(`Floor: ${floorNumber}, ${isUpPressed? "Up" : "Down"} key pressed.`);

    const liftNumber = getSelectedLiftNumber(floorNumber);
    // console.log(`liftsStateArray: ${liftsStateArray}`)
    // console.log(`bhetlela liftNumber: ${liftNumber}`);
    const chosenLift = document.querySelector(`#lift-${liftNumber}`);
    chosenLift.style.marginBottom = `${ ((floorNumber-1) * 150) + 4}px`;
    
}

function buildNewLiftContainer(numberOfLifts, numberOfFloors) {
    const buildingContainer = document.querySelector("#building-container");
    buildingContainer.innerHTML = "";
    
    for (let count = numberOfFloors; count > 0; count--) {
        buildingContainer.innerHTML += `
        <div class="floor">
            <div class="floor-info-box">
                <p class="floor-words">Floor</p>
                <p class="floor-number">${count}</p>
                <button onclick="liftCallClickHandler(true, ${count})" class="btn up-btn">Up</button>
                <button onclick="liftCallClickHandler(false, ${count})" class="btn down-btn">Down</button>
            </div>
        </div>`
    }

    // generating multiple lift as text
    let multipleLiftsText = '';
    for (let count = 1; count <= numberOfLifts; count++) {
        multipleLiftsText += `<div id='lift-${count}' class="lift"></div>`
    }

    buildingContainer.innerHTML += `<div id='lifts-container-block'>${multipleLiftsText}</div>`

}

