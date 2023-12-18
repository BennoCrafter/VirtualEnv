class Board {
    constructor(container, overlayCanvas, amountPinsX, amountPinsY) {
        this.container = container;
        this.overlayCanvas = overlayCanvas;
        this.overlayContext = this.overlayCanvas.getContext("2d");

        this.container.coordinates = [];
        this.components = [];
        this.amountPinsX = amountPinsX;
        this.amountPinsY = amountPinsY;
        this.setupGrid();
    }

    setupGrid() {
        for (let y = 0; y < this.amountPinsY; y++) {
            // creating a row element for each row on the board
            const newRow = document.createElement("row");
            this.container.coordinates.push([{ hasPower: false, hasGroundPower: false, type: null }]);
            for (let x = 0; x < this.amountPinsX; x++) {
                const newPin = document.createElement("div"); 
                newPin.classList.add("grid-square");
                newPin.pos = [x, y];
                addEventListenerToBoardPins(newPin);
                
                // appending Pin to row and cofigure Pin in the Cooridnates 
                newRow.appendChild(newPin);
                this.container.coordinates[y].push({ hasPower: false, hasGroundPower: false, type: null });
            }
            this.container.appendChild(newRow);
        }
    }
   
    getComponent(x, y) {
        return this.container.coordinates[x][y];
    }

    placeWire(wire) {
        this.container.coordinates[wire.pos[0][1]][wire.pos[0][0]].type = wire;
        powerBase.placeWire(wire);
        this.updatePower();
    }

    placeComponent(comp) {
        this.container.coordinates[comp.pos[0][1]][comp.pos[0][0]].type = comp;
        this.container.coordinates[comp.pos[1][1]][comp.pos[1][0]].type = comp;
        this.updatePower();
    }
    
    updatePower() {
        this.updatePowerPin();
        for (const comp of this.components) {
            this.updatePowerCircleComp(comp);
        }

    }

    updatePowerPin() {
        for (const comp of this.components) {
            if (comp.type === "Cable" || comp.type === "Jumper Wire") {
                if (comp.pos[1].props.type == "plus-pin") {
                    for (let xy = -2; xy <= 2; xy ++) {
                        try {
                            this.container.coordinates[comp.pos[0][0] + xy][comp.pos[0][1]].hasPower = true;
                            this.container.coordinates[comp.pos[0][0]][comp.pos[0][1] + xy].hasPower = true;
                        }catch(err) { /* ignore */ }
                    }
                }
                else {
                    for (let xy = -2; xy <= 2; xy ++) {
                        try {
                            this.container.coordinates[comp.pos[0][0] + xy][comp.pos[0][1]].hasGroundPower = true;
                            this.container.coordinates[comp.pos[0][0]][comp.pos[0][1] + xy].hasGroundPower = true;
                        }catch(err) { /* ignore */ }
                    }
                }
            }
        }
    }

    updatePowerCircleComp(comp) {
        if (comp && (comp.type != "Cable" && comp.type != "Jumper Wire") &&
            (this.container.coordinates[comp.pos[1][1]][comp.pos[1][0]].hasPower && this.container.coordinates[comp.pos[0][1]][comp.pos[0][0]].hasGroundPower)) {
            comp.hasPowerCircle = true;
        }
    }

}
