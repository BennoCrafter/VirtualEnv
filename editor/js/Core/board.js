class Board {
    constructor(container, amountPinsX, amountPinsY) {
        this.container = container;
        this.container.coordinates = [];
        this.amountPinsX = amountPinsX;
        this.amountPinsY = amountPinsY;
        this.setupGrid();
    }

    setupGrid() {
        for (let y = 0; y < this.amountPinsY; y++) {
            const newRow = document.createElement("row");
            for (let x = 0; x < this.amountPinsX; x++) {
                const newPin = document.createElement("div"); 
                newPin.classList.add("grid-square");
                newPin.pos = [x, y];
                addEventListenerToBoardPins(newPin); 
                newRow.appendChild(newPin);
                this.container.coordinates.push(null);
            }
            this.container.appendChild(newRow);
        }
    }
   
    getComponent(x, y) {
        if (this.container.coordinates[(y * this.amountPinsY) + x] != null) {
            return this.container.children[y].children[x];
        }

        return null;
    }

    placeComponent(comp) {
        this.container.coordinates[(comp.pos[1] * this.amountPinsY) + comp.pos[0]] = comp;
        console.log(this.container.coordinates);
    }

}
