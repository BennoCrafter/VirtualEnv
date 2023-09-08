import ("../Ui/Components/Scripts/componentHandler.js")
import ("./powerBase.js");


class Board {
    constructor(canvas) {
        let powerBase = document.getElementById("powerBase-canvas");

        // init
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.componentHandler = new ComponentHandler();
        this.powerBase = new PowerBase(powerBase);

        // settings
        this.gridWidth = 30;
        this.gridHeight = 10;
        this.powerRadius = 2

        // calculations
        this.gridSize = [this.gridWidth, this.gridHeight];
        this.canvas.width = this.gridWidth * 25;
        this.canvas.height = this.gridHeight * 25;
        this.cellSizeX = this.canvas.width / this.gridSize[0];
        this.cellSizeY = this.canvas.height / this.gridSize[1];
        
        this.allPlacedComponentsNames = [];
        this.currentPos = [];
        this.components = {};
        this.jumperWires = {};
        this.powerPos = []




        this.canvas.addEventListener("mousedown", (event) => {
            var mouseX = event.clientX - canvas.getBoundingClientRect().left;
            var mouseY = event.clientY - canvas.getBoundingClientRect().top;
            
            var gridPosition = this.getGridPosition(this.canvas, this.gridSize, mouseX, mouseY);
            this.currentPos.push([gridPosition.col, gridPosition.row])
            try{
                console.log("placed:", this.componentHandler.getCurrentComponent().name, "at grid position:", gridPosition.col, gridPosition.row);
            } catch{
                console.warn("No Component selected!")
                console.warn("but it would be placed on: " + gridPosition.col, gridPosition.row);
            }
            if (this.currentPos.length == 2){
                    // new component added to board
                    // todo make only one name (no doubles)
                    this.allPlacedComponentsNames.push(this.componentHandler.getCurrentComponent().name)
                    this.newComponent(this.currentPos)
                    // reset list
                    this.currentPos = [];
                }
        }); 

        this.powerBase.canvas.addEventListener("click", (event) => {
            this.powerBase.getPin(event);
            if (this.componentHandler.getCurrentComponent().name == "Jumper Wire"){
                this.allPlacedComponentsNames.push(this.componentHandler.getCurrentComponent().name + this.allPlacedComponentsNames.length)
                this.last_index_value = this.allPlacedComponentsNames[this.allPlacedComponentsNames.length-1]
                
                this.jumperWires[this.last_index_value] = { gridPos: this.currentPos[0], pinNumber: this.powerBase.currPin.number, power: false } 
                // if selected pin is mass pin
                this.jumperWires[this.last_index_value].power = true
                let xPos = this.currentPos[0][0] * this.cellSizeX;
                let yPos = this.currentPos[0][1] * this.cellSizeY;
                console.log(xPos, yPos)
                console.log(this.currentPos)
                console.log(this.powerBase.currPin.y)
                this.drawWire(xPos, yPos, this.powerBase.currPin.x, this.powerBase.currPin.y, 'blue', 3);
                this.updatePower()
                this.updateComponents()
                this.currentPos = [];
            }

            
        });
        this.pixelGrid = [];

        this.setupCanvas();

    }

    newComponent(currentPos) {
        this.components[this.allPlacedComponentsNames[this.allPlacedComponentsNames.length - 1] + this.allPlacedComponentsNames.length] = { pos: currentPos, power: false }
    
        var cellSizeX = this.canvas.width / this.gridSize[0];
        var cellSizeY = this.canvas.height / this.gridSize[1];
        var img = new Image();
    
        img.src = this.componentHandler.getCurrentComponent().imageFromTop;
        const that = this;
        img.onload = function () {
            var xPos = Math.round(currentPos[0][0] * cellSizeX + currentPos[1][0] * cellSizeX) / 2;
            var yPos = Math.round((currentPos[0][1] * cellSizeY + currentPos[1][1] * cellSizeY) / 2) - cellSizeY;
            that.context.drawImage(img, xPos, yPos, cellSizeX, cellSizeY);
            
            // draw Feets Wires
            that.context.beginPath();
            that.context.moveTo(xPos + 6, yPos + cellSizeY);
            that.context.lineTo(currentPos[0][0] * cellSizeX + (cellSizeX / 2), currentPos[0][1] * cellSizeY + cellSizeY);
            that.context.strokeStyle = "lightgray";
            that.context.stroke();

            that.context.beginPath();
            that.context.moveTo(xPos + cellSizeX - 6, yPos + cellSizeY);
            that.context.lineTo(currentPos[1][0] * cellSizeX + cellSizeX - (cellSizeX / 2), currentPos[1][1] * cellSizeY + cellSizeY);
            that.context.strokeStyle = "lightgray";
            that.context.stroke();
        };
        this.debug()
    }

    setupCanvas() {
        var cellSizeX = this.canvas.width / this.gridSize[0];
        var cellSizeY = this.canvas.height / this.gridSize[1];   

        for (var x = 0; x <= this.canvas.width; x += cellSizeX) {
            this.context.moveTo(x, 0);
            this.context.lineTo(x, this.canvas.height);
        }

        for (var y = 0; y <= this.canvas.height; y += cellSizeY) {
            this.context.moveTo(0, y);
            this.context.lineTo(this.canvas.width, y);
        }

        this.context.strokeStyle = "lightgray";
        this.context.stroke();
    }

    getGridPosition(canvas, gridSize, mouseX, mouseY) {
        // Calculate the gridpos
        var cellSizeX = canvas.width / gridSize[0];
        var cellSizeY = canvas.height / gridSize[1];
        var col = Math.floor(mouseX / cellSizeX);
        var row = Math.floor(mouseY / cellSizeY);
        
        return { col: col, row: row };
    }

    debug(){
        console.log("COMPONENTS:")
        console.log(this.components)
        console.log("COMPONENT NAMES:")
        console.log(this.allPlacedComponentsNames)
    }

    updatePower(){
        // reset power positions
        this.powerPos = []    
        console.log(this.jumperWires)
        // get all jumper Wires
        Object.entries(this.jumperWires).forEach(([key, jumperWire]) => {
            if (jumperWire.power == true){
                for (let i = 1; i <= this.powerRadius; i++) {
                    this.powerPos.push([jumperWire.gridPos[0], jumperWire.gridPos[1] + i]); // top
                    this.powerPos.push([jumperWire.gridPos[0], jumperWire.gridPos[1] - i]); // down
                    this.powerPos.push([jumperWire.gridPos[0] + i, jumperWire.gridPos[1]]); // right
                    this.powerPos.push([jumperWire.gridPos[0] - i, jumperWire.gridPos[1]]); // left
                  }
                console.log(this.powerPos)
            }
          });
    }

    updateComponents(){
        Object.entries(this.components).forEach(([name, comp]) => {
            const hasPower = this.powerPos.some(pos => {
                return pos[0] === comp.pos[0][0] && comp.pos[0][1] === comp.pos[0][1] || pos[0] === comp.pos[1][0] && comp.pos[1][1] === comp.pos[1][1]
              });
            if (hasPower){
                comp.power = true
            }else{
                comp.power = false
            }
        })
        this.debug()
    }

    drawWire(startX, startY, endX, endY, lineColor, lineWidth) {
        const midpointX = (this.canvas.width + this.powerBase.canvas.width) / 2;
        const midpointY = this.canvas.height;
    
        this.context.strokeStyle = lineColor;
        this.context.lineWidth = lineWidth;
        this.context.beginPath();
        this.context.moveTo(startX, startY);
        this.context.lineTo(midpointX, midpointY);
        this.context.stroke();
    
        this.powerBase.context.strokeStyle = lineColor;
        this.powerBase.context.lineWidth = lineWidth;
        this.powerBase.context.beginPath();
        this.powerBase.context.moveTo(midpointX, midpointY);
        this.powerBase.context.lineTo(endX - this.powerBase.canvas.width, endY - this.powerBase.canvas.height);
        this.powerBase.context.stroke();
    }
    


}