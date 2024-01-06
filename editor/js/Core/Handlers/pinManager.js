let clickedPos = [];
let selectedPin = null;

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

  // updating inspector
  updateInspector();
}

function checkPinPlace() {
  // checking for the last two elements thats clicked and placeing components
  console.log(clickedPos[clickedPos.length - 1].coordinate)
  if (clickedPos.length >= 2 && clickedPos[clickedPos.length - 1].coordinate.type === null && clickedPos[clickedPos.length - 2].coordinate.type === null) {
    if (
      componentHandler.currentComp &&
      (componentHandler.currentComp.name == "Cable" ||
        componentHandler.currentComp.name == "Jumper Wire") &&
      ((clickedPos[clickedPos.length - 1].classList.contains("grid-square") &&
        clickedPos[clickedPos.length - 2].classList.contains("power-base-pin")) ||
        (clickedPos[clickedPos.length - 1].classList.contains("power-base-pin") &&
          clickedPos[clickedPos.length - 2].classList.contains("grid-square")))
    ) {
      new Wire(
        [
          clickedPos
            .reverse()
            .find((element) => element.classList.contains("grid-square")).pos,
          clickedPos
            .reverse()
            .find((element) => element.classList.contains("power-base-pin")),
        ],
        componentHandler.currentComp.name
      );
    } else if (
      componentHandler.currentComp &&
      clickedPos[clickedPos.length - 1].classList.contains("grid-square") &&
      clickedPos[clickedPos.length - 2].classList.contains("grid-square")
    ) {
      new Component(
        [
          clickedPos[clickedPos.length - 2].pos,
          clickedPos[clickedPos.length - 1].pos,
        ],
        componentHandler.getCurrentComponent().name
      );
    }
  }
  // clear the array with the last two elements that were clicked in it
  if (clickedPos.length == 2) {
    clickedPos = [];
  }
}
