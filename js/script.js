import ("./arduinoPartsCore.js");

let arduinoCanvas = document.getElementById("arduino-canvas");
let boardCanvas = document.getElementById("board-canvas");
let inspector = document.getElementById("inspector");

window.addEventListener("DOMContentLoaded", function () {
    arduinoCanvas = new Arduino(arduinoCanvas);
    boardCanvas = new Board(boardCanvas);
    // inspector = new Inspector(inspector);
});