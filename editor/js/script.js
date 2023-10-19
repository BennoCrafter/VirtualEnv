// who wrote this bullshit? youreself lol
// aka. Ben lol
// gigachad move
// ik
// das lassen wir so, oder? 
// ja
import ("./Core/board.js");
import ("./Core/powerBase.js");
import ("./Ui/Inspector/inspector.js");

let isTextEditorShown = true;
let board = null;

window.addEventListener("DOMContentLoaded", function () {
    showComponentList();
    board = new Board(document.getElementById("env"));
    board.init();
    new Inspector(document.getElementById("inspector"));
});

window.addEventListener("keydown", (event) => {
    if (event.key === "Q" || event.key === "q") {
        showComponentList();
    }
    if (event.key === "W" || event.key === "w") {
        showComponentList(false);
    }
    if (event.altKey) {
        switchTextEditor();
    }
});

function showComponentList(isTrue = true, isFalse = false) {
    if (isTrue) {
        document.getElementById("inspector").style.display = "none";
        document.getElementById("component-list").style.display = "block";
    }
    else  {
        document.getElementById("inspector").style.display = "block";
        document.getElementById("component-list").style.display = "none";

    }
}

function switchTextEditor() {
    isTextEditorShown = !isTextEditorShown;

    if (isTextEditorShown) {
        document.getElementById("text-editor").style.display = "block";
        document.getElementById("header-button").innerText = "Hide Text-Editor";
    }
    else {
        document.getElementById("text-editor").style.display = "none";
        document.getElementById("header-button").innerText = "Show Text-Editor";
    }
}
