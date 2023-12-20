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
            for (let x = 0; x < this.amountPinsX; x++) {
                const newPin = document.createElement("div"); 
                newPin.classList.add("grid-square");
                newPin.pos = [x, y];
                addEventListenerToPins(newPin);
                
                // appending Pin to row and cofigure Pin in the Cooridnates 
                newRow.appendChild(newPin);
            }
            this.container.appendChild(newRow);
        }
        
        // setup coordinate system
        for (let x = 0; x < this.amountPinsX; x++) {
            this.container.coordinates.push([]);
            
            for (let y = 0; y < this.amountPinsY; y++) {
                this.container.coordinates[x].push({ hasPower: false, hasGroundPower: false, type: null });
            }
        } 
    }
   
    getComponent(x, y) {
        return this.container.coordinates[x][y];
    }

    // places Wires on the board
    placeWire(wire) {
        this.getComponent(wire.pos[0][0], wire.pos[0][1]).type = wire;
        powerBase.placeWire(wire);
        this.updatePower();
    }

    // placed component on the board
    placeComponent(comp) {
        this.getComponent(comp.pos[0][0], comp.pos[0][1]).type = comp;
        this.getComponent(comp.pos[1][0], comp.pos[1][1]).type = comp;
        this.updatePower();
    }
    
    updatePower() {
        this.updatePowerPin();
        for (const comp of this.components) {
            this.updatePowerCircleComp(comp);
        }

    }

    // Updates ground- and pluspower for each grid on the board
    updatePowerPin() {
        for (const comp of this.components) {
            if (comp.type === "Cable" || comp.type === "Jumper Wire") {
                if (comp.pos[1].props.type == "plus-pin") {
                    for (let xy = -2; xy <= 2; xy++) {
                        try {
                            this.getComponent(comp.pos[0][0] + xy, comp.pos[0][1]).hasPower = true;
                            this.getComponent(comp.pos[0][0], comp.pos[0][1] + xy).hasPower = true;
                        }catch(err) { /* ignore */ }
                    }
                }
                else {
                    for (let xy = -2; xy <= 2; xy++) {
                        try {
                            this.getComponent(comp.pos[0][0] + xy, comp.pos[0][1]).hasGroundPower = true;
                            this.getComponent(comp.pos[0][0], comp.pos[0][1] + xy).hasGroundPower = true;
                        }catch(err) { /* ignore */ }
                    }
                }
            }
        }
    }

    updatePowerCircleComp(comp) {
        if (comp && (comp.type != "Cable" && comp.type != "Jumper Wire") &&
            (this.getComponent(comp.pos[1][0], comp.pos[1][1]).hasPower && this.getComponent(comp.pos[0][0], comp.pos[0][1]).hasGroundPower)) {
            comp.hasPowerCircle = true;
        }
    }

}
