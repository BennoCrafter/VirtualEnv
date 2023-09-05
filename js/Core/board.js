import ("../Ui/Components/Scripts/componentHandler.js")

class Board {
    constructor(canvas) {
        // init
        this.canvas = canvas;
        this.componentHanlder = new ComponentHandler();
        this.gridSize = 10; // value^2 is the amount of grids

        this.canvas.addEventListener("click", (event) => {
            var mouseX = event.clientX - canvas.getBoundingClientRect().left;
            var mouseY = event.clientY - canvas.getBoundingClientRect().top;
            
            var gridPosition = this.getGridPosition(this.canvas, this.gridSize, mouseX, mouseY);
            console.log("placed:", this.componentHanlder.getCurrentComponent().name, "at grid position:", gridPosition.col, gridPosition.row);
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