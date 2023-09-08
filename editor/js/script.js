import ("./Core/board.js");
import ("./Core/powerBase.js");
import ("./Ui/Inspector/inspector.js")

let boardCanvas = document.getElementById("board-canvas");
let inspector = document.getElementById("inspector");

window.addEventListener("DOMContentLoaded", function () {
    showComponentList();
    boardCanvas = new Board(boardCanvas);
    inspector = new Inspector(inspector);
});

function showComponentList(isTrue = true) {
    if (isTrue) {
        document.getElementById("inspector").style.display = "none";
        document.getElementById("component-list").style.display = "block";
    }
    else {
        document.getElementById("component-list").style.display = "none";
        document.getElementById("inspector").style.display = "block";
    }
}