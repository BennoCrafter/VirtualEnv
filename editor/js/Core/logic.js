class Logic {
  constructor() {
    // this.pins = []
    // example pins

    // example board
    /*
        {} {} {} {hasPower: false, type: wire, resistance: 0} {} {}
        {} {} {} {hasPower: false, type: wire, resistance: 0} {} {}
        {} {} {} {hasPower: false, type: wire, resistance: 0} {} {}
        {} {} {} {hasPower: false, type: lamp, resistance: 1} {} {}
        */
    this.pins = [];
    this.boardSizeX = 6;
    this.boardSizeY = 6;
    this.generatePins(6, 6);

    this.generateExampleBoard();
    this.updateBoardState();
    console.log(this.pins);
  }

  generatePins(sizeX, sizeY) {
    for (let i = 0; i < sizeX * sizeY; i++) {
      // for now no resistance
      this.pins.push({ hasPower: false, isPowerCircle: false, type: null });
    }
  }

  generateExampleBoard() {
    // sample power block +
    this.setPin(12, "powerSupply", true);
    // sample power block -
    this.setPin(18, "powerSupply", false, true);

    // simple lamp
    this.setPin(13, "wire");
    this.setPin(14, "wire");
    this.setPin(15, "lamp");
    this.setPin(16, "wire");
    this.setPin(17, "wire");

    // board view
    // ---X---
    // W--X--W
  }

  setPin(pinNum, type, powerState = false, isPowerCircle = false) {
    this.pins[pinNum].hasPower = powerState;
    this.pins[pinNum].type = type;
    this.pins[pinNum].isPowerCircle = isPowerCircle;
  }

  updateBoardState(){
    for (let i = 0; i < 2; i++) {
        for (let pinNum = 0; pinNum+1 < this.pins.length; pinNum++) {
            this.checkPower(pinNum)
            this.checkPowerCircle(pinNum)
      }
  }
}

  checkPower(pinNum) {
      let currPin = this.pins[pinNum];
      if (currPin.hasPower && currPin.type!== null) {
        // set the power of the right pin from current pin to true
        if (pinNum <= this.pins.length - 1 && this.pins[pinNum++].type!== null) {
            this.pins[pinNum++].hasPower = true;
        }
        // set the power of the left pin from current pin to true
        if (pinNum >= 1 && this.pins[pinNum--].type!== null) {
          this.pins[pinNum--].hasPower = true;
        }
        // set the power of the top pin from current pin to true
        if (pinNum >= this.boardSizeX && this.pins[pinNum - this.boardSizeX].type!== null) {
          this.pins[pinNum - this.boardSizeX].hasPower = true;
        }
        // set the power of the bottom pin from current pin to true
        if (pinNum < (this.pins.length - this.boardSizeX) && this.pins[pinNum + this.boardSizeX].type!== null) {
          this.pins[pinNum + this.boardSizeX].hasPower = true;
        }
    }
  }
  
  checkPowerCircle(pinNum) { 
      let currPin = this.pins[pinNum];
      if (currPin.isPowerCircle && currPin.type!== null) {
        if (pinNum <= this.pins.length - 1 && this.pins[pinNum++].type!== null) {
            this.pins[pinNum++].isPowerCircle = true;
        }
        // set the power of the left pin from current pin to true
        if (pinNum >= 1 && this.pins[pinNum--].type!== null) {
          this.pins[pinNum--].isPowerCircle = true;
        }
        // set the power of the top pin from current pin to true
        if (pinNum >= this.boardSizeX && this.pins[pinNum - this.boardSizeX].type!== null) {
          this.pins[pinNum - this.boardSizeX].isPowerCircle = true;
        }
        // set the power of the bottom pin from current pin to true
        if (pinNum < (this.pins.length - this.boardSizeX) && this.pins[pinNum + this.boardSizeX].type!== null) {
          this.pins[pinNum + this.boardSizeX].isPowerCircle = true;
        }
    }
  }
}

// example usage for nodejs

let log = new Logic();
