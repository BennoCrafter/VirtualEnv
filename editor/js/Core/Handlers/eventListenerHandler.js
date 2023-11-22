let clickedPos = [];

function addEventListenerToBoardPins(pin) {
    pin.addEventListener("click", (event) => {
        clickedPos.push(event.target);
        console.log(clickedPos);
        checkPinPlace();
    });
} 

function addEventListenerToPowerBasePins(pin) {
    pin.addEventListener("click", (event) => {
        clickedPos.push(event.target);
        console.log();
        checkPinPlace();
    });
}

function checkPinPlace() {
    console.log(clickedPos[clickedPos.length - 1], clickedPos[clickedPos.length - 2]);
    if (clickedPos.length >= 2 && componentHandler.currentComp && (componentHandler.currentComp.name == "Cable" || componentHandler.currentComp.name == "Jumper Wire") && 
        ((clickedPos[clickedPos.length - 1].classList.contains("grid-square") && clickedPos[clickedPos.length - 2].classList.contains("power-base-pin")) || 
        (clickedPos[clickedPos.length - 1].classList.contains("power-base-pin") && clickedPos[clickedPos.length - 2].classList.contains("grid-square")))) {
        new Wire([clickedPos.reverse().find(element => element.classList.contains('grid-square')).pos, clickedPos.reverse().find(element => element.classList.contains('power-base-pin'))], componentHandler.currentComp.name);
    }
    
    else if (clickedPos.length >= 2 && componentHandler.currentComp && clickedPos[clickedPos.length - 1].classList.contains("grid-square") && clickedPos[clickedPos.length - 2].classList.contains("grid-square")) {
        new Component([clickedPos[clickedPos.length - 1].pos, clickedPos[clickedPos.length - 2].pos], componentHandler.getCurrentComponent().name);
    }
}