import ("../Ui/Components/Scripts/componentHandler.js")

class Board {
    constructor(canvas) {
        // init
        this.canvas = canvas;
        this.componentHanlder = new ComponentHandler();
        this.gridWidth = 3;
        this.gridHeight = 3;
        this.gridSize = [this.gridWidth, this.gridHeight];
        this.currentPos = [];
        this.pins = {};

        this.canvas.addEventListener("mousedown", (event) => {
            var mouseX = event.clientX - canvas.getBoundingClientRect().left;
            var mouseY = event.clientY - canvas.getBoundingClientRect().top;
            
            var gridPosition = this.getGridPosition(this.canvas, this.gridSize, mouseX, mouseY);
            this.currentPos.push([gridPosition.row, gridPosition.col])
            try{
                console.log("placed:", this.componentHanlder.getCurrentComponent().name, "at grid position:", gridPosition.col, gridPosition.row);

            } catch{
                console.warn("No Component selected!")
                console.warn("but its placed on: " + gridPosition.col, gridPosition.row);
            }

            if (this.currentPos.length == 2){


                // reset list
                console.log("reseting currentPositions list...")
                this.currentPos = [];
            }
        }); 
        this.setupPins()

        console.log(this.pins);
        
        this.pixelGrid = [];
        this.setupCanvas();
    }

    setupPins(){
        for (let i=0; i < this.gridSize[0] * this.gridSize[1]; i++){
            this.pins[i] = {
                
                pinComponent: undefined,
                componentPos1: undefined,
                componentPos2: undefined,
                pinType1: "grid",
                pinType2: "grid",
            }
        }
    }

    setupCanvas() {
        var context = this.canvas.getContext("2d");
        var cellSizeX = this.canvas.width / this.gridSize[0];
        var cellSizeY = this.canvas.height / this.gridSize[1];   

        for (var x = 0; x <= this.canvas.width; x += cellSizeX) {
            context.moveTo(x, 0);
            context.lineTo(x, this.canvas.height);
        }

        for (var y = 0; y <= this.canvas.height; y += cellSizeY) {
            context.moveTo(0, y);
            context.lineTo(this.canvas.width, y);
        }

        context.strokeStyle = "lightgray";
        context.stroke();
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