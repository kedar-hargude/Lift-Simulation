const inputPage = document.querySelector(".input-page");
const liftsInput = document.getElementById("lift-input");
const floorInput = document.getElementById("floor-input");
const inputsSubmit = document.querySelector(".inputsSubmit");

// input page submitting inputs
inputsSubmit.addEventListener("click", () => {

    if ((liftsInput.value < 1 || liftsInput.value > 5) || (floorInput.value < 2 || floorInput.value > 10)) {
        location.reload();
    } else {
        console.log(`lifts: ${liftsInput.value}, floors: ${floorInput.value}`);
        inputPage.style.display = 'none';
    }
})
