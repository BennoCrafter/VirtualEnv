// who wrote this bullshit? youreself lol
// aka. Ben lol
// gigachad move
// ik
// das lassen wir so, oder? 
// ja
import ("./Core/board.js");
import ("./Core/powerBase.js");
import ("./Ui/Inspector/inspector.js");

let  board = null;

window.addEventListener("DOMContentLoaded", function () {
    showComponentList();
    board = new Board(document.getElementById("env"));
    board.init();
    new Inspector(document.getElementById("inspector"));
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
