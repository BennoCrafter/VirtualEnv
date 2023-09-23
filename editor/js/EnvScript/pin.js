import ("../Core/board.js ")

class Pin extends Board{
    constructor(pinNumber, power=false){
        super(document.getElementById("env"));
        this.power = power;
        this.pinNumber = pinNumber;
    }

    power(){
        this.power = !this.power;
        this.update();
    }

    update(){
        this.getComponent(this.pinNumber);

        // refresh screen
        this.screenRefresh();
        console.log(this.components);
    }
}

export { Pin };