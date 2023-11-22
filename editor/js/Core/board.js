class Board {
    constructor(container, amountPinsX, amountPinsY) {
        this.container = container;
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
            this.container.coordinates.push([{ hasPower: false, isPowerCircle: false, type: null }]);
            for (let x = 0; x < this.amountPinsX; x++) {
                const newPin = document.createElement("div"); 
                newPin.classList.add("grid-square");
                newPin.pos = [x, y];
                addEventListenerToBoardPins(newPin);
                
                // appending Pin to row and cofigure Pin in the Cooridnates 
                newRow.appendChild(newPin);
                this.container.coordinates[y].push({ hasPower: false, isPowerCircle: false, type: null });
            }
            this.container.appendChild(newRow);
        }
    }
   
    getComponent(x, y) {
        return this.container.coordinates[x][y];
    }

    placeWire(wire) {
        this.container.coordinates[wire.pos[0][0]][wire.pos[0][1]].type = wire;
        powerBase.placeWire(wire);
    }

    placeComponent(comp) {
        this.container.coordinates[comp.pos[0][0]][comp.pos[0][1]].type = comp;
        this.container.coordinates[comp.pos[1][0]][comp.pos[1][1]].type = comp;

        console.log(this.container.coordinates);
    }


}
