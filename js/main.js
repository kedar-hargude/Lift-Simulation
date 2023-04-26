
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
// TODO change liftsStateArray to liftsPositionArray
let liftsStateArray = []; // gives current floor position of lifts
let liftsAvailableArray = []; // shows which lifts are busy
let floorCallStackArray = []; // memory of all the floors clicked

// input page submitting inputs
inputsSubmit.addEventListener("click", () => {

    if ((liftsInput.value < 1 || liftsInput.value > 5) || (floorInput.value < 2 || floorInput.value > 10)) {
        location.reload();
    } else {
        // console.log(`lifts: ${liftsInput.value}, floors: ${floorInput.value}`);
        inputPage.style.display = 'none';

        floorsCountGlobal = +floorInput.value;
        liftsCountGlobal = +liftsInput.value;

        liftInputUpdate.value = liftsInput.value;
        floorInputUpdate.value = floorInput.value;

        // set each element in liftsStateArray (each lift position) to 1
        for (let i = 0; i < liftsCountGlobal; i++) {
            liftsStateArray[i] = 1;
            liftsAvailableArray[i] = true;
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
    console.log(`getSelectedLiftNumber func entered, clickedFloorNumber: ${clickedFloorNumber} is input.`)
    currentLiftNumber = -1; // to not let previous values of lift be passed

    // if lift already on floor, return the same lift number
    if (liftsStateArray.includes(clickedFloorNumber)) {
        currentLiftNumber = liftsStateArray.indexOf(clickedFloorNumber) + 1; // array has every lift value starting from 0
        console.log(`same floor, returning [${currentLiftNumber}, 0] from getSelectedLiftNumber function.`)
        return [currentLiftNumber, 0];
    }

    let minGapBetnFloorAndLift = +floorsCountGlobal + 5; // just as a safe extreme

    console.log(`Entering for loop of getSelectedLiftNumber. Current liftsAvailableArray: ${liftsAvailableArray}. liftsStateArray: ${liftsStateArray}.`)
    for (let liftCount = 1; liftCount <= liftsCountGlobal; liftCount++) {
        // only return a value if any lift is available to move
        if (liftsAvailableArray[liftCount - 1] === true) {
            console.log(`entered the for loop. liftCount: ${liftCount}.`);
            let individualLiftGap = Math.abs(clickedFloorNumber - liftsStateArray[liftCount - 1]);
            if (individualLiftGap < minGapBetnFloorAndLift) {
                currentLiftNumber = liftCount;
                minGapBetnFloorAndLift = individualLiftGap;
            }
        } else {
            continue;
        };
    }

    // all lifts are busy
    if(currentLiftNumber === -1) {
        console.log(`all lifts are busy, so returning [-1, 0], for clickedFloorNumber: ${clickedFloorNumber} from getSelectedLiftNumber func.`)
        return [-1, 0];
    }

    // before updating the array, first set the lift transition time based on the difference between current selected lift number and where it has to go
    // const chosenLiftTemp = document.querySelector(`#lift-${currentLiftNumber}`);
    // const floorGapValue = Math.abs(clickedFloorNumber - liftsStateArray[currentLiftNumber - 1]);
    // chosenLiftTemp.style.transition = `margin-bottom ${floorGapValue * 2}s`
    
    liftsStateArray[currentLiftNumber - 1] = clickedFloorNumber;
    console.log(`getSelectedLiftNumber func, clickedFloorNumber: ${clickedFloorNumber}, returning [currentLiftNumber: ${currentLiftNumber}, minGap: ${minGapBetnFloorAndLift}]`);
    return [currentLiftNumber, minGapBetnFloorAndLift];
}

function wait(time) {
    return new Promise(res => setTimeout(res, time));
}

async function liftCallClickHandler( isUpPressed, floorNumber) {
    
    const [liftNumber, floorGapValue] = getSelectedLiftNumber(floorNumber);
    console.log(`----liftNumber: ${liftNumber} is chosen to go to floor: ${floorNumber}`);
    floorCallStackArray = floorCallStackArray.filter(ele => ele !== floorNumber);
    console.log(`floor ${floorNumber} is removed from floorCallStackArray: ${floorCallStackArray} as it's been decided that lift ${liftNumber} will go to it. So, don't want to repeat it when other lifts are free.`);
    if(liftNumber === -1) {
        // all lifts are busy, don't do anything.
        return;
    }
    liftsAvailableArray[liftNumber - 1] = false;
    const chosenLift = document.querySelector(`#lift-${liftNumber}`);
    if (chosenLift === null) {
        return;
    }
    // start moving lift up
    console.log(`${liftNumber} moving up to floor: ${floorNumber}.`)
    chosenLift.style.transition = `margin-bottom ${floorGapValue * 2}s`
    chosenLift.style.marginBottom = `${ ((floorNumber-1) * 150) + 4}px`;
    
    // add animation to lift opening and closing
    await wait(floorGapValue * 2000); // wait till lift reaches the floor
    console.log(`${liftNumber} reached floor: ${floorNumber}. Will start door animation.`)
    

    
    const chosenLiftDoor = document.querySelector(`.lift-${liftNumber}-door`);
    console.log(`liftNumber: ${liftNumber} opening doors, reached floor ${floorNumber}`)
    chosenLiftDoor.classList.add("lift-door-animate");
    await wait(2500); // 500ms added to 2.5seconds for aesthetics
    chosenLiftDoor.classList.remove("lift-door-animate");
    await wait(2500);
    console.log(`liftNumber: ${liftNumber} closing doors. Now the lift is available in liftsAvailableArray.`);
    liftsAvailableArray[liftNumber - 1] = true;
    
    // lift has reached the floor, and doors have opened and closed. Remove it from the call stack
    // floorCallStackArray = floorCallStackArray.filter(ele => ele !== floorNumber);
    // console.log(`After lift: ${liftNumber} door closing and lift available in liftsAvailableArray: ${liftsAvailableArray}, now floorCallStackArray's (${floorCallStackArray}) value has been changed where ${floorNumber} is removed from it.`)

    console.log(`${liftNumber} has done it's job on floor ${floorNumber} now. floorCallStackArray: ${floorCallStackArray}, liftsAvailableArray: ${liftsAvailableArray}`);

    if(floorCallStackArray.length !== 0) {
        console.log(`${liftNumber} is done. floorCallStackArray: ${floorCallStackArray} is still not empty. Implementing liftCallClickHandler again, let's see.`)
        liftCallClickHandler(true, floorCallStackArray[0]);
        // floorCallStackArray.forEach(ele => liftCallClickHandler(true, ele));
    }
}

function manageFloorClick(isUpPressed, floorNumber) {
    if (floorCallStackArray.includes(floorNumber)) {
        return;
    } else {
        floorCallStackArray.push(floorNumber);
    }
    // console.log(`floorCallStackArray: ${floorCallStackArray}`);
    // console.log(`liftsAvailableArray: ${liftsAvailableArray}`);

    if ((floorCallStackArray.length <= liftsCountGlobal) && (liftsAvailableArray.includes(true))) {
        liftCallClickHandler(isUpPressed, floorNumber);
    }
  
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
                <button onclick="manageFloorClick(true, ${count})" class="btn up-btn">Up</button>
                <button onclick="manageFloorClick(false, ${count})" class="btn down-btn">Down</button>
            </div>
        </div>`
    }

    // generating multiple lift as text
    let multipleLiftsText = '';
    for (let count = 1; count <= numberOfLifts; count++) {
        multipleLiftsText += `
        <div id='lift-${count}' class="lift">
            <div class="lift-door lift-${count}-door"></div>
        </div>
        `
    }

    buildingContainer.innerHTML += `<div id='lifts-container-block'>${multipleLiftsText}</div>`

}

