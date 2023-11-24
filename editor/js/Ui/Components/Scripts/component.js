class Component {
    constructor (pos, type) {
        this.id = board.components.length;
        this.pos = pos;
        this.type = type;
        this.hasPowerCircle = false;
        this.build();
    }

    build() {
        board.components.push(this);
        board.placeComponent(this);
        return this;
    }
}

class Wire {
    constructor (pos, type) {
        this.id = board.components.length;
        this.pos = pos;
        this.type = type;
        this.build();
    }

    build() {
        board.components.push(this);
        console.log("asdasdasdasdaiuhgsdgasdhgahgsdhg: ", board.components)
        board.placeWire(this);
        return this;
    }
}