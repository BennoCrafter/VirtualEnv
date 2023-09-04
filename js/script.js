import ("./board.js")

let boardCanvas = document.getElementById("board-canvas");
let cabels = document.getElementById("cabels");

window.addEventListener("DOMContentLoaded", function () {
    boardCanvas = new Board(boardCanvas);
});