import ("../Ui/Components/Scripts/componentHandler.js")
import ("./powerBase.js");


class Board {
    constructor(canvas) {
        let powerBase = document.getElementById("powerBase-canvas");

        // init
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.componentHandler = new ComponentHandler();
        this.gridWidth = 10;
        this.gridHeight = 10;
        this.gridSize = [this.gridWidth, this.gridHeight];
        this.currentPos = [];
        this.allPlacedComponentsNames = []
        this.components = {}

        this.powerBase = new PowerBase(powerBase);

        this.canvas.addEventListener("mousedown", (event) => {
            var mouseX = event.clientX - canvas.getBoundingClientRect().left;
            var mouseY = event.clientY - canvas.getBoundingClientRect().top;
            
            var gridPosition = this.getGridPosition(this.canvas, this.gridSize, mouseX, mouseY);
            this.currentPos.push([gridPosition.col, gridPosition.row])
            try{
                console.log("placed:", this.componentHandler.getCurrentComponent().name, "at grid position:", gridPosition.col, gridPosition.row);
                // check if its a specical component
                if(this.componentHandler.getCurrentComponent().name == "Jumper Cable"){
                        
                }
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
//s
        this.powerBase.canvas.addEventListener("click", (event) => function () {
            this.powerBase.getPin(this.powerBase);
        });
        
        this.pixelGrid = [];
        this.setupCanvas();
    }

    newComponent(currentPos) {
        this.components[this.allPlacedComponentsNames[this.allPlacedComponentsNames.length - 1]] = { pos: currentPos, power: false }

        var cellSizeX = this.canvas.width / this.gridSize[0];
        var cellSizeY = this.canvas.height / this.gridSize[1];
        var img = new Image();

        img.src = this.componentHandler.getCurrentComponent().imageFromTop;
        const that = this;

        img.onload = function () {
            for (let i = 0; i < currentPos.length; i++) {

                
            }
            var xPos = Math.round(currentPos[0][0] * cellSizeX + currentPos[1][0] * cellSizeX) / 2;
            var yPos = Math.round(currentPos[0][1] * cellSizeY + currentPos[1][1] * cellSizeY) / 2;
            that.context.drawImage(img, xPos, yPos, cellSizeX, cellSizeY);

        };
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
}