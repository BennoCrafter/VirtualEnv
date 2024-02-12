let board = null;
let powerBase = null;
let compsLoaded = 0;

window.addEventListener("DOMContentLoaded", function () {
    // creating the board and the powerbase
    board = new Board(document.getElementById("board"), document.getElementById("canvas-overlay"), 25, 10);
    powerBase = new PowerBase(document.getElementById("power-base"), 10, 10, 10);
});
