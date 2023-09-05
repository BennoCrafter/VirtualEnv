import ("./arduinoPartsCore.js");
import ("../Ui/Components/Scripts/componentHandler.js")

let arduinoCanvas = document.getElementById("arduino-canvas");
let boardCanvas = document.getElementById("board-canvas");
let inspector = document.getElementById("inspector");

window.addEventListener("DOMContentLoaded", function () {
    arduinoCanvas = new Arduino(arduinoCanvas);
    boardCanvas = new Board(boardCanvas);
    componentHanlder = new ComponentHandler();
    // inspector = new Inspector(inspector);
});