class EventListenerHandler{
    constructor(canvas){
        this.canvas = canvas;
        this.boardWith = 525 
        this.boardHeight = 175
    }
    getMousePos(event){
        var mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
        var mouseY = event.clientY - this.canvas.getBoundingClientRect().top;   
       return mouseX, mouseY
    }

    boardListener(){
        this.canvas.addEventListener("mousedown", (event) => {
            const mousePos = this.getMousePos(event);
            const mouseX = mousePos[0];
            const mouseY = mousePos[1];
            // same thing like by powerBaseListener
            if(mouseX < this.boardWidth && mouseY < this.boardHeight){
                var gridPosition = this.getGridPosition(this.gridSize, mouseX, mouseY);
                this.currentPos.push([gridPosition.col, gridPosition.row]);
                try{
                    console.log("placed:", this.componentHandler.getCurrentComponent().name, "at grid position:", gridPosition.col, gridPosition.row);
                } catch{
                    console.warn("No Component selected!");
                    console.warn("but it would be placed on: " + gridPosition.col, gridPosition.row);
                }
                if (this.currentPos.length == 2){
                        // new component added to board
                        this.allPlacedComponentsNames.push(this.componentHandler.getCurrentComponent().name + this.allPlacedComponentsNames.length);
                        this.newComponent(this.currentPos);
                        // reset list
                        this.currentPos = [];
                    }
            }

        }); 
    }

    powerBaseListener(){
        this.canvas.addEventListener("mousedown", (event) => {  
            const mousePos = this.getMousePos(event);
            const mouseX = mousePos[0];
            const mouseY = mousePos[1];
            // todo make it so, so u can import the dx and dy also from powerBase (maybe with settings.json file)
            if (mouseX > 100 && mouseY > 200){
                this.powerBase.getPin(event);
                if (this.componentHandler.getCurrentComponent().name == "Jumper Wire"){
                    this.allPlacedComponentsNames.push(this.componentHandler.getCurrentComponent().name + this.allPlacedComponentsNames.length);
                    this.last_index_value = this.allPlacedComponentsNames[this.allPlacedComponentsNames.length-1];
                    
                    this.jumperWires[this.last_index_value] = { gridPos: this.currentPos[0], pinNumber: this.powerBase.currPin.number, power: false };
                    // if selected pin is mass pin
                    this.jumperWires[this.last_index_value].power = true;
                    let xPos = this.currentPos[0][0] * this.cellSizeX;
                    let yPos = this.currentPos[0][1] * this.cellSizeY;
                    console.log(xPos, yPos)
                    console.log(this.currentPos)
                    console.log(this.powerBase.currPin.y)
                    this.drawWire(xPos, yPos, this.powerBase.currPin.x + this.powerBase.pinSize/2, this.powerBase.currPin.y + this.powerBase.pinSize/2, 'blue', 5);
                    this.updatePower();
                    this.updateComponents();
                    // reseting
                    this.componentHandler.currentComp = null;
                    this.currentPos = [];
                }
            }
            
        });
    }


}