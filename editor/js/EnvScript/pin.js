class Pin {
    constructor (num) {
        this.num = num;
        this.comp = powerBase.container.pins["plus-pin"][num - 1];
        this.ref = board.getComponent(this.comp.type.pos[0][0], this.comp.type.pos[0][1]).type;
    }

    write(high = true) {
        if (high) {
            this.comp.type.userWantsPower = true;
            board.getComponent(this.comp.type.pos[0][0], this.comp.type.pos[0][1]).type.userWantsPower = true;
        }
        else {
            this.comp.type.userWantsPower = false;
            board.getComponent(this.comp.type.pos[0][0], this.comp.type.pos[0][1]).type.userWantsPower = false;
        } 
        board.updatePower()
        board.screenRefresh()
    }

}