class Pin {
    constructor (num) {
        this.num = num;
        this.comp = powerBase.container.pins[0][num - 1];
    }

    write(high = true) {
        if (high) {
            this.comp.type.userWantsPower = true;
            board.getComponent(this.comp.type.pos[0][0], this.comp.type.pos[0][1]).type.userWantsPower = true;
            board.updatePower();
            board.screenRefresh();
        }
        else {
            this.comp.type.userWantsPower = false;
            board.getComponent(this.comp.type.pos[0][0], this.comp.type.pos[0][1]).type.userWantsPower = false;
            board.updatePower();
            board.screenRefresh();
        }
    }
}