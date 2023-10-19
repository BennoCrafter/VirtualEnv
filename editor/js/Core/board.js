import ("../Ui/Components/Scripts/componentHandler.js")
import ("./powerBase.js");

class Board{
    constructor(canvas) {
        // init
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.context.save();

        // settings
        this.gridWidth = 30;
        this.gridHeight = 10;
        this.powerRadius = 2;
        this.lineWidth = 1;

        // options for lightattribute
        this.lightBlurOptions = ["rectangle", "circle", "none"];
        this.lightBlurOption = this.lightBlurOptions[0];

        // calculations
        this.gridSize = [this.gridWidth, this.gridHeight];
        this.boardWidth = this.gridWidth * 17.5;
        this.boardHeight = this.gridHeight * 17.5;
        this.cellSizeX = this.boardWidth / this.gridSize[0];
        this.cellSizeY = this.boardHeight / this.gridSize[1];
        this.allPlacedComponentsNames = [];
        this.currentPos = [];
        this.components = {};
        this.jumperWires = {};
        this.powerPos = [];

        this.connections = {};


        this.pixelGrid = [];

    }

    init() {
        this.componentHandler = new ComponentHandler();
        this.powerBase = new PowerBase(this.canvas);

        this.boardListener();
        this.powerBaseListener();
        this.setupCanvas(this.lineWidth);
    }

    boardListener(){
        this.canvas.addEventListener("mousedown", (event) => {
            var mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
            var mouseY = event.clientY - this.canvas.getBoundingClientRect().top;   
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
                        this.newComponent(this.currentPos);
                        // reset list
                        this.currentPos = [];
                    }
            }

        }); 
    }

    powerBaseListener(){
        this.canvas.addEventListener("mousedown", (event) => {  
            var mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
            var mouseY = event.clientY - this.canvas.getBoundingClientRect().top;   
            if (mouseX > 100 && mouseY > 200){
                this.powerBase.getPin(event);
                if (this.componentHandler.getCurrentComponent().name == "Jumper Wire"){
                    this.allPlacedComponentsNames.push(this.componentHandler.getCurrentComponent().name + this.allPlacedComponentsNames.length);
                    this.last_index_value = this.allPlacedComponentsNames[this.allPlacedComponentsNames.length-1];
                    
                    this.jumperWires[this.last_index_value] = { gridPos: this.currentPos[0], pinNumber: this.powerBase.currPin.number, pinPos: this.powerBase.currPin.pos, color: "blue", power: false, type: this.powerBase.currPin.type };
                    // if selected pin is mass pin
                    if(this.powerBase.currPin.type == "mass-pin"){
                        this.jumperWires[this.last_index_value].power = true;
                    }
                    this.drawAllWires()
                    this.updatePower();
                    this.updateComponents();
                    // reseting
                    this.componentHandler.currentComp = null;
                    this.currentPos = [];
                }
            }
            
        });
    }


    newComponent(currentPos) {
        this.allPlacedComponentsNames.push(this.componentHandler.getCurrentComponent().name + this.allPlacedComponentsNames.length);
        
        this.components[this.allPlacedComponentsNames[this.allPlacedComponentsNames.length - 1]] = { pos: currentPos, power: false, imageFromTop: this.componentHandler.getCurrentComponent().imageFromTop, type: this.componentHandler.getCurrentComponent().type}
    
        this.updateComponents()

        this.debug()
    }   

    setupCanvas(lineWidth) {
        var cellSizeX = this.boardWidth / this.gridSize[0];
        var cellSizeY = this.boardHeight / this.gridSize[1];   

        for (var x =-0; x <= this.boardWidth; x += cellSizeX) {
            this.context.moveTo(x, 0);
            this.context.lineTo(x, this.boardHeight);
        }

        for (var y=0; y <= this.boardHeight; y += cellSizeY) {
            this.context.moveTo(0, y);
            this.context.lineTo(this.boardWidth, y);
        }

        this.context.lineWidth = lineWidth;
        this.context.shadowBlur = 0;
        this.context.strokeStyle = "lightgrey";
        this.context.stroke();
    }

    getGridPosition(gridSize, mouseX, mouseY) {
        // Calculate the gridpos
        var cellSizeX = this.boardWidth / gridSize[0];
        var cellSizeY = this.boardHeight / gridSize[1];
        var col = Math.floor(mouseX / cellSizeX);
        var row = Math.floor(mouseY / cellSizeY);
        
        return { col: col, row: row };
    }

    debug(){
        console.log("COMPONENTS:")
        console.log(this.components)
        console.log(this.jumperWires)
        console.log("COMPONENT NAMES:")
        console.log(this.allPlacedComponentsNames)
    }

    updatePower() {
        // reset power positions
        this.powerPos = [];
        // get all jumper Wires
        Object.entries(this.jumperWires).forEach(([key, jumperWire]) => {
            if (jumperWire["power"]) {
                for (let i = 1; i <= this.powerRadius; i++) {
                    this.powerPos.push([jumperWire.gridPos[0], jumperWire.gridPos[1] + i]); // top
                    this.powerPos.push([jumperWire.gridPos[0], jumperWire.gridPos[1] - i]); // down
                    this.powerPos.push([jumperWire.gridPos[0] + i, jumperWire.gridPos[1]]); // right
                    this.powerPos.push([jumperWire.gridPos[0] - i, jumperWire.gridPos[1]]); // left
                }
            }
        });

    }
    

    updateComponents() {
        Object.entries(this.components).forEach(([name, comp]) => {
            // pPos example: [4,12]
            let found = false;
            for (const pPos of this.powerPos) {
              if (JSON.stringify(comp.pos[0]) === JSON.stringify(pPos)) {
                found = true;
                break;
              }else if (JSON.stringify(comp.pos[0]) === JSON.stringify(pPos)){
                found = true;
                break;
                }
            }
            if (found) {
                comp.power = true;
            }else{
                comp.power = false;
            }
        })
        this.screenRefresh();
    }
    

    updateLED(comp){
        if (comp.type == "led"){
            var xPos = Math.round(comp.pos[0][0] * this.cellSizeX + comp.pos[1][0] * this.cellSizeX) / 2;
            var yPos = Math.round((comp.pos[0][1] * this.cellSizeY + comp.pos[1][1] * this.cellSizeY) / 2) - this.cellSizeY;
            if (comp.power) {
                this.updateLightBlur(xPos, yPos);
            }else{
                this.removeLightBlur(xPos, yPos);

            }
        }
    }
    drawWire(startX, startY, endX, endY, lineColor, lineWidth) {   
        this.context.shadowBlur = 0; 
        this.context.strokeStyle = lineColor;
        this.context.lineWidth = lineWidth;
        this.context.beginPath();
        this.context.moveTo(startX, startY);
        this.context.lineTo(endX, endY);
        this.context.stroke();

    }
    
    drawAllWires(){
        Object.entries(this.jumperWires).forEach(([name, wire]) =>{
            let xPos = wire.gridPos[0] * this.cellSizeX;
            let yPos = wire.gridPos[1] * this.cellSizeY;
            this.drawWire(xPos, yPos, wire.pinPos.x + this.powerBase.pinSize/2, wire.pinPos.y + this.powerBase.pinSize/2, wire.color, 5);
        })    
    }
    
    drawFeets(xPos, yPos, cellSizeX, cellSizeY, currentPos) {
        this.context.lineWidth = 3;
        this.context.shadowBlur = 0;
        // draw Feets Wires
        this.context.beginPath();
        this.context.moveTo(xPos + 6, yPos + cellSizeY);
        this.context.lineTo(currentPos[0][0] * cellSizeX + (cellSizeX / 2), currentPos[0][1] * cellSizeY + cellSizeY);
        this.context.strokeStyle = "lightgray";
        this.context.stroke();

        this.context.beginPath();
        this.context.moveTo(xPos + cellSizeX - 6, yPos + cellSizeY);
        this.context.lineTo(currentPos[1][0] * cellSizeX + cellSizeX - (cellSizeX / 2), currentPos[1][1] * cellSizeY + cellSizeY);
        this.context.strokeStyle = "lightgray";
        this.context.stroke();
    }

    updateLightBlur(xPos, yPos) {
        switch (this.lightBlurOption) {
            case "rectangle":
                this.context.shadowBlur = 20;
                this.context.shadowColor = "red";
                this.context.strokeStyle = "rgba(255, 0, 0, 0)";
                this.context.strokeRect(xPos, yPos, this.cellSizeX, this.cellSizeY);
                break; 
            case "circle":
                this.context.beginPath();
                this.context.arc(xPos, yPos, 50, 0, Math.PI * 2);
                this.context.fillStyle = "rgba(255, 0, 0.5)"; 
                this.context.shadowBlur = 20; 
                this.context.shadowColor = "red"; 
                this.context.fill();
                this.context.closePath();
                break;
            case "none":
                // ignore
                break;
            
            default:
                console.error("Unvalid lightblur selected");
                break;
        }

        this.context.restore()

    }

    removeLightBlur(xPos, yPos) {
        this.context.shadowBlur = 0;
        this.context.fillStyle = "white";
        this.context.clearRect(xPos - this.cellSizeX, yPos - this.cellSizeY, this.cellSizeX * 3, this.cellSizeY * 3);
        this.setupCanvas(this.lineWidth);
    }

    screenRefresh() {
        let componentsLoaded = 0;
        this.setupCanvas(this.lineWidth);
        Object.entries(this.components).forEach(([name, comp]) => {
            var img = new Image();
            img.src = comp.imageFromTop;
            const that = this; 
                
            img.onload = function () {
                var xPos = Math.round(comp.pos[0][0] * that.cellSizeX + comp.pos[1][0] * that.cellSizeX) / 2;
                var yPos = Math.round((comp.pos[0][1] * that.cellSizeY + comp.pos[1][1] * that.cellSizeY) / 2) - that.cellSizeY;
                    
                that.updateLED(comp);
                that.context.drawImage(img, xPos, yPos, that.cellSizeX, that.cellSizeY);
                that.drawFeets(xPos, yPos, that.cellSizeX, that.cellSizeY, comp.pos);     
                    
                componentsLoaded++;   
                if (componentsLoaded >= Object.keys(that.components).length) {
                    console.log("asd");
                    that.drawAllWires();
                }
            }

        });
        this.drawAllWires();
    }

    /*
    useless func
    updateComponent(comp) {
        var xPos = Math.round(comp.pos[0][0] * this.cellSizeX + comp.pos[1][0] * this.cellSizeX) / 2;
        var yPos = Math.round((comp.pos[0][1] * this.cellSizeY + comp.pos[1][1] * this.cellSizeY) / 2) - this.cellSizeY;
            
        // Clear old component
        this.context.shadowBlur = 0;
        this.context.clearRect(xPos, yPos, this.cellSizeX, this.cellSizeY);

        const img = new Image();
        img.src = comp.imageFromTop;

        const that = this;

        img.onload = function () {
            that.updateLED(comp);
            that.context.drawImage(img, xPos, yPos, that.cellSizeX, that.cellSizeY);
            that.drawFeets(xPos, yPos, that.cellSizeX, that.cellSizeY, comp.pos);
        }
    }
    */

    getComponent(pos1) {
        Object.entries(this.components).forEach((comp) => {
            if ((comp.pos[0][0] / this.cellSizeX == pos[0] && comp.pos[0][1] / this.cellSizeY == pos[1])
            || (comp.pos[1][0] / this.cellSizeX == pos[0] && comp.pos[1][1] / this.cellSizeY == pos[1])) {
                return comp;
            }
        });
        return console.error("Cant find Component from Position: " + pos);
    }

    getJumperWire(pinNumber){

    }

    setJumperWire(pinNumber, power){
        Object.entries(this.jumperWires).forEach(([name, jWire]) => {
            if(jWire["pinNumber"] == pinNumber){
                jWire["power"] = power; 
            }
        });
        this.updatePower()
        this.updateComponents()
        this.debug()
    }

    // todo doesnt work
    // getMousePos(event){
    //     var mouseX = event.clientX - this.canvas.getBoundingClientRect().left;
    //     var mouseY = event.clientY - this.canvas.getBoundingClientRect().top;   
    //    return mouseX, mouseY
    // }

}

