class Component {
    constructor (pos, type) {
        this.id = board.components.length;
        this.pos = pos;
        this.type = type;
        this.hasPowerCircle = false;
        this.imageFromTop = componentHandler.getCurrentComponent().imageFromTop;
        this.props = {
            color: "red",
            size: 15
        }
        this.build();
    }

    build() {
        board.components.push(this);
        board.placeComponent(this);
        this.update();
    }

    // IMPORTANT: update() only draws the image and the feets again and dosent delete them!
    update() { 
        const compImage = new Image();
        compImage.src = this.imageFromTop;
        const that = this;

        compImage.onload = function () {
            var xPos = Math.round((that.pos[0][0] + that.pos[1][0]) * 25) / 2;
            var yPos = Math.round(((that.pos[0][1] + that.pos[1][1]) * 25) / 2) - 25;
            that.__drawFeets(xPos, yPos);
            if (that.hasPowerCircle && that.props.size > 0 && 
                    board.getComponent(that.pos[0][0], that.pos[0][1]).powerStrenght - 
                    board.getComponent(that.pos[0][0], that.pos[0][1]).resistance > 0) {
                board.bufferContext.shadowColor = that.props.color;  
                board.bufferContext.shadowBlur = that.props.size;
                for (let i = 0; i < board.getComponent(that.pos[0][0], that.pos[0][1]).powerStrenght - 
                board.getComponent(that.pos[0][0], that.pos[0][1]).resistance; i++) {
                    board.bufferContext.drawImage(compImage, xPos, yPos, 25, 25);
                }
                board.bufferContext.shadowColor = 'transparent';
                board.bufferContext.shadowBlur = 0;
                board.bufferContext.globalAlpha = 1;
            }
            else {
                board.bufferContext.drawImage(compImage, xPos, yPos, 25, 25);
            }

            if (that.id >= board.components.length - 1) {
                board.overlayContext.clearRect(0, 0, board.overlayCanvas.width, board.overlayCanvas.height);
                board.overlayContext.drawImage(board.bufferCanvas, 0, 0);
            }
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

class Wire {
    constructor (pos, type) {
        this.id = board.components.length;
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