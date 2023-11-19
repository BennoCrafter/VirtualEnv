window.addEventListener("DOMContentLoaded", function () {
    const board = new Board(document.getElementById("board"), 10, 10);
    board.placeComponent({
        pos: [0, 1],
        name: "asd"
    })
    board.getComponent(0, 1)
});
