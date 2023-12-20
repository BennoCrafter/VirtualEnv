let clickedPos = [];

function addEventListenerToPins(pin) {
    pin.addEventListener("click", (event) => {
        updateSelectedPin(pin);
        clickedPos.push(event.target);
        checkPinPlace();
    });
} 

function updateSelectedPin(pin) {
    if (selectedPin) {
        selectedPin.style.borderColor = "black";
        selectedPin.style.borderWidth = "1px";
    }
    selectedPin = pin;
    selectedPin.style.borderColor = "blue";
    selectedPin.style.borderWidth = "2px";
}

function checkPinPlace() {
    // checking for the last two elements thats clicked and placeing components
    if (clickedPos.length >= 2 && componentHandler.currentComp && (componentHandler.currentComp.name == "Cable" || componentHandler.currentComp.name == "Jumper Wire") && 
    ((clickedPos[clickedPos.length - 1].classList.contains("grid-square") && clickedPos[clickedPos.length - 2].classList.contains("power-base-pin")) || 
    (clickedPos[clickedPos.length - 1].classList.contains("power-base-pin") && clickedPos[clickedPos.length - 2].classList.contains("grid-square")))) {
        new Wire([clickedPos.reverse().find(element => element.classList.contains('grid-square')).pos, clickedPos.reverse().find(element => element.classList.contains('power-base-pin'))], componentHandler.currentComp.name);
    }
    else if (clickedPos.length >= 2 && componentHandler.currentComp && clickedPos[clickedPos.length - 1].classList.contains("grid-square") && clickedPos[clickedPos.length - 2].classList.contains("grid-square")) {
        new Component([clickedPos[clickedPos.length - 1].pos, clickedPos[clickedPos.length - 2].pos], componentHandler.getCurrentComponent().name);
    }
    // clear the array with the last two elements that were clicked in it
    if (clickedPos.length == 2) {
        clickedPos = [];
    }
}