// IMPORTANT: selectedPin is defined in pinManager.js
const inspector = document.getElementById("inspector");

function updateInspector() {
    inspector.innerHTML = ""; // Clear previus Content
    
    // finding the coordinate where the pin is placed
    let pinCord;
    if (selectedPin.classList.contains("grid-square")) {
        pinCord = board.getComponent(selectedPin.pos[0], selectedPin.pos[1]);
    }
    else if (selectedPin.props.type == "plus-pin") {
        pinCord = powerBase.container.pins[0][selectedPin.props.pos];
    }
    else {
        pinCord = powerBase.container.pins[1][selectedPin.props.pos];
    }

    if (pinCord.type) {
        let index = 0;
        for (const name of Object.keys(pinCord.type.props)) {
            const newInput = document.createElement("input");
            newInput.placeholder = name[0].toUpperCase() + name.substring(1);
            addEventListenerToInputs(newInput, pinCord, index);

            inspector.appendChild(newInput);
            index++;
        }
    }
}


function addEventListenerToInputs(input, pinCord, index) {
    input.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            pinCord.type.props[getObjValueFromIndex(pinCord.type.props, index)] = input.value;
            board.updatePower();
            board.screenRefresh();
            input.value = '';
        }
    })
}

function getObjValueFromIndex(obj, index) {
    var keys = Object.keys(obj)
    return keys[index];
}
