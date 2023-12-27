let board = null;
let powerBase = null;

window.addEventListener("DOMContentLoaded", function () {
    // creating the board and the powerbase
    board = new Board(document.getElementById("board"), document.getElementById("canvas-overlay"), 10, 25);
    powerBase = new PowerBase(document.getElementById("power-base"), 10, 4, 10);
});
