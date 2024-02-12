class Board {
    constructor(container, overlayCanvas, amountPinsX, amountPinsY) {
        this.container = container;
        this.overlayCanvas = overlayCanvas;
        this.overlayContext = this.overlayCanvas.getContext("2d");
        this.bufferCanvas = document.getElementById("buffer-canvas");
        this.bufferContext = this.bufferCanvas.getContext("2d");

        this.container.coordinates = [];
        this.components = [];
        this.wires = [];
        this.amountPinsX = amountPinsX;
        this.amountPinsY = amountPinsY;
        this.setupGrid();
    }

    setupGrid() {
        // setup coordinate system
        for (let x = 0; x < this.amountPinsX; x++) {
            this.container.coordinates.push([]);
            
            for (let y = 0; y < this.amountPinsY; y++) {
                this.container.coordinates[x].push({ hasPower: false, hasGroundPower: false, powerStrenght: 12, resistance: 0, type: null });
            }
        } 

        for (let x = 0; x < this.amountPinsX; x++) {
            // creating a row element for each row on the board
            const newRow = document.createElement("row");
            for (let y = 0; y < this.amountPinsY; y++) {
                const newPin = document.createElement("div"); 
                newPin.classList.add("grid-square");
                newPin.pos = [x, y];
                newPin.coordinate = this.getComponent(x, y);
                addEventListenerToPins(newPin);
                
                // appending Pin to row
                newRow.appendChild(newPin);
            }
            this.container.appendChild(newRow);
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
        updateInspector();
        this.screenRefresh();
    }

    // placed component on the board
    placeComponent(comp) {
        this.getComponent(comp.pos[0][0], comp.pos[0][1]).type = comp;
        this.getComponent(comp.pos[1][0], comp.pos[1][1]).type = comp;
        this.updatePower();
        updateInspector();
        this.screenRefresh();
    }
    
    updatePower() {
        this.updateWires();
        this.updateResistors();
        for (const comp of this.components) {
            this.updatePowerCircleComp(comp);
        }

    }

    // Updates ground- and pluspower for each wire
    updateWires() {
        for (const wire of this.wires) {
            if (wire.pos[1].props.type == "plus-pin" && wire.userWantsPower) {
                for (let xy = -2; xy <= 2; xy++) {
                    try {
                        this.getComponent(wire.pos[0][0] + xy, wire.pos[0][1]).hasPower = true;
                        this.getComponent(wire.pos[0][0], wire.pos[0][1] + xy).hasPower = true;
                    }catch(err) { /* ignore */ }
                }
            }
            else if (wire.userWantsPower) {
                for (let xy = -2; xy <= 2; xy++) {
                    try {
                        this.getComponent(wire.pos[0][0] + xy, wire.pos[0][1]).hasGroundPower = true;
                        this.getComponent(wire.pos[0][0], wire.pos[0][1] + xy).hasGroundPower = true;
                    }catch(err) { /* ignore */ }
                }
            }

            if (wire.userWantsPower) {
                for (let xy = -2; xy <= 2; xy++) {
                    try {
                        this.getComponent(wire.pos[0][0] + xy, wire.pos[0][1]).powerStrenght = wire.props.strenght;
                        this.getComponent(wire.pos[0][0], wire.pos[0][1] + xy).powerStrenght = wire.props.strenght;
                    }catch(err) { /* ignore */ }
                }
            }
            else {
                /*
                if (wire.pos[1].props.type == "plus-pin") {
                    for (let xy = -2; xy <= 2; xy++) {
                        try {
                            this.getComponent(wire.pos[0][0] + xy, wire.pos[0][1]).hasPower = false;
                            this.getComponent(wire.pos[0][0], wire.pos[0][1] + xy).hasPower = false;
                        }catch(err) { /* ignore */ /*}
                    }
                }
                else {
                    for (let xy = -2; xy <= 2; xy++) {
                        try {
                            this.getComponent(wire.pos[0][0] + xy, wire.pos[0][1]).hasGroundPower = false;
                            this.getComponent(wire.pos[0][0], wire.pos[0][1] + xy).hasGroundPower = false;
                        }catch(err) { /* ignore */ /*}
                    }
                }
                */
                for (let xy = -2; xy <= 2; xy++) {
                    try {
                        this.getComponent(wire.pos[0][0] + xy, wire.pos[0][1]).powerStrenght = 0;
                        this.getComponent(wire.pos[0][0], wire.pos[0][1] + xy).powerStrenght = 0;
                    }catch(err) { /* ignore */ }
                }
            }
        }
    }

    updateResistors() {
        for (const comp of this.components) {
            if (comp.type == "Resistor") {
                for (let xy = -2; xy <= 2; xy++) {
                    try {
                        this.getComponent(comp.pos[1][0] + xy, comp.pos[1][1]).resistance = comp.props.resistance;
                        this.getComponent(comp.pos[1][0], comp.pos[1][1] + xy).resistance = comp.props.resistance;
                    }catch(err) { /* ignore */ }
                }
            }
        }
    }

    // Checking if a comp is in a PowerCircle
    updatePowerCircleComp(comp) {
        if (this.getComponent(comp.pos[0][0], comp.pos[0][1]).hasPower && 
            this.getComponent(comp.pos[1][0], comp.pos[1][1]).hasGroundPower) {
            comp.hasPowerCircle = true;
        }
    }

    screenRefresh() {
        this.bufferContext.clearRect(0, 0, this.bufferCanvas.width, this.bufferCanvas.height);
        compsLoaded = 0;
        for (const wire of this.wires) {
            wire.update();
        }
        for (const comp of this.components) {
            comp.update();
        }

        if (this.wires.length === 0 && this.components.length === 0) {
            this.overlayContext.clearRect(0, 0, this.overlayCanvas.width, this.overlayCanvas.height);
            this.overlayContext.drawImage(this.bufferCanvas, 0, 0);
        }
    }

}
