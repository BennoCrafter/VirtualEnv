class PowerBase {
    constructor(canvas) {
        // initilize canvas props
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        // moved to board.js
        // this.canvas.addEventListener("click", this.getPin.bind(this));
    
        // setup slots that can be changes due the inspector
        this.slots = 10;
        this.massPins = 2;
        this.pinSize = 12;
        this.pins = [];
        this.currPin = null;

        // draw arudino
        this.setupCanvas();
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
                    type: "default-pin",
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
                    type: "mass-pin",
                });
            }

            if (i >= 9) {
                lastPositionX += 30;
            } else {
                lastPositionX += 20;
            }
        }
    }

    getPin(event) {
        console.log("hi");
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
                this.currPin = pin;
                console.log(this.currPin);
                return pin;
            }
        }
    }
}