function addEventListenerToBoardPins(pin) {
    pin.addEventListener("mousedown", (event) => {
        console.log(event.target.pos);
    });
} 