import ("../Core/board.js ")

class Pin extends Board{
    constructor(pinNumber, power=false){
        super(document.getElementById("env"));
        this.power = power;
        this.pinNumber = pinNumber;
        this.update();
    }

    power(){
        this.power = !this.power;
        this.update();
    }

    update(){
        console.log(this.components);
    }
}

export { Pin };