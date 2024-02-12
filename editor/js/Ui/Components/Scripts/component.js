function createComponent(pos, type) {
    switch (type) {
        case "LED":
            new LED(pos, type);
            break;
        case "Resistor":
            new Resistor(pos, type);
            break;
        case "Button":
            new Button(pos, type);
            break;
        case "Display":
            new Display(pos, type);
            break;
        default:
            new Component(pos, type);
            break;
    }

    // updating Inspector
    updateInspector();
}

class Component {
    constructor (pos, type) {
        this.id = board.components.length;
        this.pos = pos;
        this.type = type;
        this.props = {}
        this.hasPowerCircle = false;
        this.imageFromTop = componentHandler.getCurrentComponent().imageFromTop;
        this.build();
    }

    build() {
        board.components.push(this);
        board.placeComponent(this);
    }

    // IMPORTANT: update() only draws the image and the feets again and dosent delete them!
    update() {
        const compImage = new Image();
        compImage.src = this.imageFromTop;

        compImage.onload = () => {
            var xPos = Math.round((this.pos[0][0] + this.pos[1][0]) * 25) / 2;
            var yPos = Math.round(((this.pos[0][1] + this.pos[1][1]) * 25) / 2) - 25;
            this.__drawFeets(xPos, yPos);
            board.bufferContext.drawImage(compImage, xPos, yPos, 25, 25);

            if (compsLoaded >= board.components.length - 1) {
                board.overlayContext.clearRect(0, 0, board.overlayCanvas.width, board.overlayCanvas.height);
                board.overlayContext.drawImage(board.bufferCanvas, 0, 0);
            }
            compsLoaded++;
        }
    }

    __drawFeets(xPos, yPos) {
        const values = {
            cellSize: 25,
            offsetBottom: [15, 10],
            offsetTop: [7, 18],
        }
        for (let i = 0; i < 2; i++) {
            board.bufferContext.beginPath();
            board.bufferContext.moveTo(this.pos[i][0] * values.cellSize + values.offsetBottom[i], this.pos[i][1] * values.cellSize + (values.cellSize / 1.2));
            board.bufferContext.lineTo(xPos + values.offsetTop[i], yPos + values.cellSize);
            board.bufferContext.closePath();
    
            board.bufferContext.lineWidth = 2; 
            board.bufferContext.strokeStyle = "grey";
            board.bufferContext.stroke();
        }
    }
}

class LED extends Component {
    constructor (pos, type) {
        super(pos, type);

        this.props = {
            color: "red",
            size: 15,
        }
    }

    build() {
        board.components.push(this);
        board.placeComponent(this);
    }

    // IMPORTANT: update() only draws the image and the feets again and dosent delete them!
    update() { 
        const compImage = new Image();
        compImage.src = this.imageFromTop;

        compImage.onload = () => {
            var xPos = Math.round((this.pos[0][0] + this.pos[1][0]) * 25) / 2;
            var yPos = Math.round(((this.pos[0][1] + this.pos[1][1]) * 25) / 2) - 25;
            this.__drawFeets(xPos, yPos);
            if (this.hasPowerCircle && this.props.size > 0 && 
                    board.getComponent(this.pos[0][0], this.pos[0][1]).powerStrenght - 
                    board.getComponent(this.pos[0][0], this.pos[0][1]).resistance > 0) {
                board.bufferContext.shadowColor = this.props.color;
                board.bufferContext.shadowBlur = this.props.size;
                for (let i = 0; i < board.getComponent(this.pos[0][0], this.pos[0][1]).powerStrenght - 
                        board.getComponent(this.pos[0][0], this.pos[0][1]).resistance; i++) {
                    board.bufferContext.drawImage(compImage, xPos, yPos, 25, 25);
                }
                board.bufferContext.shadowColor = 'transparent';
                board.bufferContext.shadowBlur = 0;
                board.bufferContext.globalAlpha = 1;
            }
            else {
                board.bufferContext.drawImage(compImage, xPos, yPos, 25, 25);
            }

            if (compsLoaded >= board.components.length - 1) {
                board.overlayContext.clearRect(0, 0, board.overlayCanvas.width, board.overlayCanvas.height);
                board.overlayContext.drawImage(board.bufferCanvas, 0, 0);
            }
            compsLoaded++;
        }
    }

}

class Resistor extends Component {
    constructor(pos, type) {
        super(pos, type);
        this.props = {
            resistance: 2,
        }
    }

    build() {
        board.components.push(this);
        board.placeComponent(this);
    }
}

class Button extends Component {
    constructor(pos, type) {
        super(pos, type);
        this.props = {
            action: null,
        }
    }

    setAction(callback) {
        this.props.action = callback;
    }

    callAction() {
        this.props.action();
    }
}

class Display extends Component {
    constructor (pos, type) {
        super(pos, type);

        this.props = {
            value: "Hi!",
            fontSize: 24,
        }
    }

    build() {
        board.components.push(this);
        board.placeComponent(this);
    }

    update() {
        const compImage = new Image();
        compImage.src = this.imageFromTop;

        compImage.onload = () => {
            const width = 25 * (this.pos[1][0] - this.pos[0][0] + 1);  // + 1 is a necessery bias
            const height = 25 * (this.pos[1][1] - this.pos[0][1] + 1); 
            const xPos = this.pos[0][0] * 25;
            const yPos = this.pos[0][1] * 25;

            board.bufferContext.drawImage(compImage, xPos, yPos, width, height);
            this.drawText(xPos, yPos, width, height);

            if (compsLoaded >= board.components.length - 1) {
                board.overlayContext.clearRect(0, 0, board.overlayCanvas.width, board.overlayCanvas.height);
                board.overlayContext.drawImage(board.bufferCanvas, 0, 0);
            }
            compsLoaded++;
        }
    }

    drawText(xPos, yPos, width, height) {
        board.bufferContext.font = `${this.props.fontSize}px serif`;
        board.bufferContext.strokeStyle = "white";
        board.bufferContext.fillText(this.props.value, xPos, yPos + this.props.fontSize, width, height);
    }

    __drawFeets() {};
}

class Wire {
    constructor (pos, type) {
        this.id = board.wires.length;
        this.pos = pos;
        this.type = type;
        if (this.pos[1].props.type == "plus-pin") {
            this.userWantsPower = false;
        }
        else {
            this.userWantsPower = true;
        }
        this.props = {
            color: "blue",
            strenght: 5,
        }
        this.build();
    }

    build() {
        board.wires.push(this);
        board.placeWire(this);
        this.update();
    }

    // IMPORTANT: update() only draws the cabels again and dosent delete them!
    update() {
        board.bufferContext.beginPath();
        board.bufferContext.moveTo(this.pos[0][0] * 25, this.pos[0][1] * 25);
        board.bufferContext.lineTo(powerBase.convertPinPosToPx(this.pos[1])[0], powerBase.convertPinPosToPx(this.pos[1])[1])
        board.bufferContext.closePath();
        
        board.bufferContext.lineWidth = 5; 
        board.bufferContext.strokeStyle = this.props.color;
        board.bufferContext.stroke();

        // if no component is placed draw the buffer
        if (board.components.length == 0) {
            board.overlayContext.clearRect(0, 0, board.overlayCanvas.width, board.overlayCanvas.height);
            board.overlayContext.drawImage(board.bufferCanvas, 0, 0);
        }
    }
}