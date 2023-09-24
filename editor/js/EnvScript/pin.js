import ("../Core/board.js ")

export class Pin extends Board{
    constructor(pinNumber, power=false){
        super(document.getElementById("env"));
        this._power = power;
        this.pinNumber = pinNumber;
    }

    power(){
        this._power = !this._power;
        this.update();
    }

    hasPower(){
        return this._power;
    }

    update(){
        //this.getJumperWire(pinNumber=1);
        this.setJumperWire(this.pinNumber, this._power)
        //this.getComponent(this.pinNumber);

        // refresh screen
        this.screenRefresh();
        console.log(this.components);
    }
}
