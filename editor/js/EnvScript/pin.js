import ("../script.js");

export class Pin {
    constructor(pinNumber, power=false){
        this._power = power;
        this.pinNumber = pinNumber;
    }

    power(){
        this._power = !this._power;
        console.log("i ammmm", this._power)
        this.update();
    }

    hasPower(){
        return this._power;
    }

    update(){
        //this.getJumperWire(pinNumber=1);
        board.setJumperWire(this.pinNumber, this._power)
        //this.getComponent(this.pinNumber);

        // refresh screen
    }
}
