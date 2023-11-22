let clickedPos = [];
function addEventListenerToBoardPins(pin) {
    pin.addEventListener("click", (event) => {
        clickedPos.push(event.target);

        if (clickedPos.length >= 2 && clickedPos[clickedPos.length - 1].classList.contains("grid-square") && clickedPos[clickedPos.length - 2].classList.contains("grid-square")) {
            new Component([clickedPos[clickedPos.length - 1].pos, clickedPos[clickedPos.length - 2].pos], componentHandler.getCurrentComponent().name);
        }
    });
} 

function addEventListenerToPowerBasePins(pin) {
    pin.addEventListener("click", (event) => {
        console.log(pin.props.type, pin.props.pos);
    })
}