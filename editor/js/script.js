let board = null;

window.addEventListener("DOMContentLoaded", function () {
    board = new Board(document.getElementById("board"), 10, 10);
    new PowerBase(document.getElementById("power-base"), 10, 4);
    console.log(board.getComponent(0, 1));
});
