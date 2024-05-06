const inspector = document.getElementById("inspector");

function updateInspector() {
    inspector.innerHTML = ""; // Clear previous content
    
    // Finding the coordinate where the pin is placed
    let pinCord;
    if (selectedPin.classList.contains("grid-square")) {
        pinCord = board.getComponent(selectedPin.pos[0], selectedPin.pos[1]);
    } else {
        pinCord = powerBase.container.pins[selectedPin.props.type][selectedPin.props.pos];
    }

    if (pinCord.type) {
        let index = 0;
        for (const name of Object.keys(pinCord.type.props)) {
            const newInput = document.createElement("input");
            newInput.placeholder = name[0].toUpperCase() + name.substring(1);
            addEventListenerToInputs(newInput, pinCord, index);

            inspector.appendChild(newInput); // Append the new input element to the inspector
            index++;
        }
    }

    /*
    inspector.innerHTML = `
        ${inspector.innerHTML}
        <br><br>
        <button onclick="deleteSelectedComp()">Delete Component</button>
    `;
    */
}

function deleteSelectedComp() {
    // Reset power if a component gets deleted
    for (let wire of board.wires) {
        wire.userWantsPower = false;
    }
    board.updatePower();
    
    const comp = selectedPin.coordinate.type;
    if (comp instanceof Wire) {
        board.getComponent(comp.pos[0][0], comp.pos[0][1]).type = null;
        comp.pos[1].coordinate = null;
        board.wires.splice(comp.id, 1);
    } else {
        board.getComponent(comp.pos[0][0], comp.pos[0][1]).type = null;
        board.getComponent(comp.pos[1][0], comp.pos[1][1]).type = null;
        board.components.splice(comp.id, 1);
    }

    // Refresh the screen
    board.screenRefresh();
}

function addEventListenerToInputs(input, pinCord, index) {
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            pinCord.type.props[getObjValueFromIndex(pinCord.type.props, index)] = input.value;
            board.updatePower();
            board.screenRefresh();
            input.value = ''; // Clear the input field after handling the Enter key
        }
    });
}

function getObjValueFromIndex(obj, index) {
    var keys = Object.keys(obj);
    return keys[index];
}
