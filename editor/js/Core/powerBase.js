class PowerBase {
    constructor(canvas) {
        // initilize canvas props
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        // moved to board.js
        // this.canvas.addEventListener("click", this.getPin.bind(this));
    
        // setup slots that can be changes due the inspector
        this.defaultPins = 10;
        this.massPins = 5;
        this.groundPins = 5;
        this.pinSize = 14;
        this.pins = [];
        this.currPin = null;
        this.currPinNum = 0
        // determine width and height
        this.width = 350
        this.height = 200

        // diffrent
        this.dx = 100
        this.dy = 200
        // draw arudino
        this.setupCanvas();
    }

    setupCanvas() {
        let lastPositionX = 10;
        const pinY = 40;

        // set context props
        this.context.fillStyle = "#00A36C";
        this.context.fillRect(this.dx, this.dy, this.width, this.height);

        this.context.fillStyle = "black";
        this.context.strokeStyle = "black";
        this.context.font = "20px Arial";

        // setup the "default" pins
        for (let i = this.currPinNum; i < this.defaultPins; i++) {
            if (i < 14) {
                this.context.fillText((i + 1).toString(), lastPositionX + this.dx, 30 + this.dy);
                this.context.strokeRect(lastPositionX + this.dx, pinY + this.dy, this.pinSize, this.pinSize);
                this.pins.push({
                    x: lastPositionX + this.dx,
                    y: pinY + this.dy,
                    number: i + 1,
                    type: "default-pin",
                });
            }

            if (i >= 9) {
                lastPositionX += 30;
            } else {
                lastPositionX += 30;
            }
            this.currPinNum = i;
        }

        // setup Mass Pins
        this.setupMassPins();
        this.setupGroundPins()
    }
    setupMassPins() {
        let lastPositionX = 10;
        const pinY = this.height - 130;

        for (let i = this.currPinNum; i < this.massPins + this.defaultPins; i++) {
            this.context.fillText((i + 1).toString(), lastPositionX + this.dx, this.height - 95 + this.dy);
            this.context.strokeRect(lastPositionX + this.dx, pinY + this.dy, this.pinSize, this.pinSize);
            this.pins.push({
                x: lastPositionX + this.dx,
                y: pinY + this.dy,
                number: i + 1,
                type: "mass-pin",
            });

            lastPositionX += 30;
            this.currPinNum = i;

        }
    }

    setupGroundPins(){
        let lastPositionX = 10;
        const pinY = this.height - 80
        for (let i = this.currPinNum; i < this.groundPins + this.defaultPins + this.massPins; i++) {
                this.context.fillText((i + 1).toString(), lastPositionX + this.dx, this.height - 45 + this.dy);
                this.context.strokeRect(lastPositionX + this.dx, pinY + this.dy, this.pinSize, this.pinSize);
                this.pins.push({
                    x: lastPositionX + this.dx,
                    y: pinY + this.dy,
                    number: i + 1,
                    type: "ground-pin",
                });

             lastPositionX += 30;
            this.currPinNum = i;

        }
    }
    getPin(event) {
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
                this.currPin["pos"] = {x: pin.x, y: pin.y}
                return pin;
            }
        }
    }
}