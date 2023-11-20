function addEventListenerToBoardPins(pin) {
    pin.addEventListener("mousedown", (event) => {
        console.log(event.target.pos);
    });
} 

function addEventListenerToPowerBasePins(pin) {
    pin.addEventListener("mousedown", (event) => {
        console.log(pin.props.type, pin.props.pos);
    })
}