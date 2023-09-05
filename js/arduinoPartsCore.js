class Arduino {
    constructor(canvas) {
        // initilize canvas props
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.canvas.addEventListener("click", this.checkPin.bind(this));

        // setup slots that can be changes due the inspector
        this.slots = 10;
        this.massPins = 2;
        this.pinSize = 12;
        this.pins = [];

        // draw arudino
        this.setupCanvas();
        this.setupDecoration();
    }

    setupCanvas() {
        let lastPositionX = 10;
        const pinY = 40;

        // set context props
        this.context.fillStyle = "#00A36C";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.context.fillStyle = "black";
        this.context.strokeStyle = "black";
        this.context.font = "20px Arial";

        // setup the "default" pins
        for (let i = 0; i < this.slots; i++) {
            if (i < 14) {
                this.context.fillText((i + 1).toString(), lastPositionX, 30);
                this.context.strokeRect(lastPositionX, pinY, this.pinSize, this.pinSize);
                this.pins.push({
                    x: lastPositionX,
                    y: pinY,
                    number: i + 1,
                });
            }

            if (i >= 9) {
                lastPositionX += 30;
            } else {
                lastPositionX += 20;
            }
        }

        // setup Mass Pins
        this.setupMassPins();
    }

    setupMassPins() {
        let lastPositionX = 10;
        const pinY = this.canvas.height - 50;

        for (let i = 0; i < this.massPins; i++) {
            if (i < 14) {
                this.context.fillText((i + 1).toString(), lastPositionX, this.canvas.height - 20);
                this.context.strokeRect(lastPositionX, pinY, this.pinSize, this.pinSize);
                this.pins.push({
                    x: lastPositionX,
                    y: pinY,
                    number: i + 1,
                });
            }

            if (i >= 9) {
                lastPositionX += 30;
            } else {
                lastPositionX += 20;
            }
        }
    }

    setupDecoration() {
        // draw usb input
        const usbImage = new Image();
        usbImage.src = "USB-input.png";

        usbImage.onload = function () {
            this.context.drawImage(usbImage, 0, this.canvas.height / 2);
        }
    }

    checkPin(event) {
        const mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
        const mouseY = event.clientY - this.canvas.getBoundingClientRect().top;

        for (let i = 0; i < this.pins.length; i++) {
            const pin = this.pins[i];
            if (
                mouseX >= pin.x &&
                mouseX <= pin.x + this.pinSize &&
                mouseY >= pin.y &&
                mouseY <= pin.y + this.pinSize
            ) {
                console.log("Klick auf Pin: " + pin.number);
                return pin.number;
            }
        }
    }
}

class Board {
    constructor(canvas) {
        this.canvas = canvas;
        this.gridSize = 10; // value^2 is the amount of grids
        this.canvas.addEventListener("click", (event) => {
            var mouseX = event.clientX - canvas.getBoundingClientRect().left;
            var mouseY = event.clientY - canvas.getBoundingClientRect().top;
            
            var gridPosition = this.getGridPosition(this.canvas, this.gridSize, mouseX, mouseY);
            console.log("gridpos:", gridPosition.col, gridPosition.row);
        });
        
        this.pixelGrid = [];
        this.setupCanvas();
    }

    setupCanvas() {
        var context = this.canvas.getContext("2d");
        var cellSize = this.canvas.width / this.gridSize;

        for (var x = 0; x <= this.canvas.width; x += cellSize) {
            context.moveTo(x, 0);
            context.lineTo(x, this.canvas.height);
        }

        for (var y = 0; y <= this.canvas.height; y += cellSize) {
            context.moveTo(0, y);
            context.lineTo(this.canvas.width, y);
        }

        context.strokeStyle = "lightgray";
        context.stroke();
    }

    getGridPosition(canvas, gridSize, mouseX, mouseY) {
        // Calculate the gridpos
        var cellSize = canvas.width / gridSize;
        var col = Math.floor(mouseX / cellSize);
        var row = Math.floor(mouseY / cellSize);
        
        return { col: col, row: row };
    }
}