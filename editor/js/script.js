import ("./Core/board.js");
import ("./Core/powerBase.js");
import ("./Ui/Inspector/inspector.js")

let boardCanvas = document.getElementById("board-canvas");
let inspector = document.getElementById("inspector");

window.addEventListener("DOMContentLoaded", function () {
    boardCanvas = new Board(boardCanvas);
    inspector = new Inspector(inspector);
});