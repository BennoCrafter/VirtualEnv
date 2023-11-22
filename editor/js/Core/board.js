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
            this.container.coordinates.push([null]);
            for (let x = 0; x < this.amountPinsX; x++) {
                const newPin = document.createElement("div"); 
                newPin.classList.add("grid-square");
                newPin.pos = [x, y];
                addEventListenerToBoardPins(newPin);
                
                // appending Pin to row and cofigure Pin in the Cooridnates 
                newRow.appendChild(newPin);
                this.container.coordinates[y].push(null);
            }
            this.container.appendChild(newRow);
        }
    }
   
    getComponent(x, y) {
        return this.container.coordinates[x][y];
    }

    placeComponent(comp) {
        this.container.coordinates[comp.pos[0][0]][comp.pos[0][1]] = comp;
        this.container.coordinates[comp.pos[1][0]][comp.pos[1][1]] = comp;

        console.log(this.container.coordinates);
    }

}
