import ("./Core/board.js");
import ("./Core/powerBase.js");
import ("./Ui/Inspector/inspector.js")

window.addEventListener("DOMContentLoaded", function () {
    showComponentList();
    boardCanvas = new Board(document.getElementById("env"));
    inspector = new Inspector(document.getElementById("inspector"));
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