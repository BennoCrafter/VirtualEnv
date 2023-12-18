class Component {
    constructor (pos, type) {
        this.id = board.components.length;
        this.pos = pos;
        this.type = type;
        this.hasPowerCircle = false;
        this.build();
    }

    build() {
        board.components.push(this);
        board.placeComponent(this);
        this.update();
        console.log("asdasdasdasdaiuhgsdgasdhgahgsdhg: ", board.components, board.container.coordinates);
    }

    // IMPORTANT: update() only draws the image and the feets again and dosent delete them!
    update() { 
        const compImage = new Image();
        compImage.src = componentHandler.getCurrentComponent().imageFromTop;
        const that = this;

        console.log(powerBase.container.height)
        compImage.onload = function () {
            var xPos = Math.round((that.pos[0][1] + that.pos[1][1]) * 25) / 2;
            var yPos = Math.round(((that.pos[0][0] + that.pos[1][0]) * 25) / 2) - 25;
            console.log("Nuernberg: ", xPos, yPos, that, compImage);

            that.__drawFeets(xPos, yPos);
            board.overlayContext.drawImage(compImage, xPos, yPos, 25, 25);
        }
    }

    __drawFeets(xPos, yPos) {
        const values = {
            cellSize: 25,
            offsetBottom: [15, 10],
            offsetTop: [7, 18],
        }
        for (let i = 0; i < 2; i++) {
            board.overlayContext.beginPath();
            board.overlayContext.moveTo(this.pos[i][1] * values.cellSize + values.offsetBottom[i], this.pos[i][0] * values.cellSize + values.cellSize);
            console.log("I hate js: ", xPos, yPos)
            board.overlayContext.lineTo(xPos + values.offsetTop[i], yPos + values.cellSize);
            board.overlayContext.closePath();
    
            board.overlayContext.lineWidth = 2; 
            board.overlayContext.strokeStyle = "grey";
            board.overlayContext.stroke();
        }
    }
}

class Wire {
    constructor (pos, type) {
        this.id = board.components.length;
        this.pos = pos;
        this.type = type;
        this.color;
        this.build();
    }

    build() {
        board.components.push(this);
        board.placeWire(this);
        this.update();
    }

    // IMPORTANT: update() only draws the cabels again and dosent delete them!
    update() {
        console.log("got here: ", this)
        // TODO: Fix drawing Wires
        board.overlayContext.beginPath();
        board.overlayContext.moveTo(this.pos[0][1] * 25 + 0.5, this.pos[0][0] * 25 + 0.5);
        board.overlayContext.lineTo(powerBase.convertPinPosToPx(this.pos[1])[0], powerBase.convertPinPosToPx(this.pos[1])[1])
        board.overlayContext.closePath();
        
        board.overlayContext.lineWidth = 5; 
        board.overlayContext.strokeStyle = "grey";
        board.overlayContext.stroke();
    }
}