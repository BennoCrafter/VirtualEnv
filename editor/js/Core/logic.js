
class Logic {
  constructor(x, y) {
    this.pins = [];
    this.boardSizeX = x;
    this.boardSizeY = y;
    this.generatePins(x, y);
    //this.generateExampleBoard();
    this.updateBoardState();
    console.log(this.pins);
  }

  generatePins(sizeX, sizeY) {
    for (let y = 0; y < sizeY; y++) {
      for (let x = 0; x < sizeX; x++) {
        this.pins.push({ hasPower: false, isPowerCircle: false, type: null });
      }
    }
  }

  generateExampleBoard() {
    this.setPin(0, 0, "powerSupply", true);
    this.setPin(2, 0, "powerSupply", false, true);

    this.setPin(0, 1, "wire");
    this.setPin(0, 2, "wire");
    this.setPin(0, 3, "lamp");
    this.setPin(0, 4, "wire");
    this.setPin(0, 5, "wire");
    this.setPin(1, 5, "wire");
    this.setPin(2, 5, "wire");
    this.setPin(2, 4, "wire");
    this.setPin(2, 3, "wire");
    this.setPin(2, 2, "wire");
    this.setPin(2, 1, "wire");
  }

  setPin(x, y, type, powerState = false, isPowerCircle = false) {
    const index = y * this.boardSizeX + x;
    this.pins[index].hasPower = powerState;
    this.pins[index].type = type;
    this.pins[index].isPowerCircle = isPowerCircle;
  }

  updateBoardState() {
    for (let iteration = 0; iteration < this.boardSizeX * this.boardSizeY; iteration++) {
      for (let y = 0; y < this.boardSizeY; y++) {
        for (let x = 0; x < this.boardSizeX; x++) {
          const index = y * this.boardSizeX + x;
          const currentPin = this.pins[index];

          if (currentPin.hasPower && currentPin.type !== null) {
            this.propagatePower(x, y);
          }

          if (currentPin.isPowerCircle && currentPin.type !== null) {
            this.propagatePowerCircle(x, y);
          }
        }
      }
    }
  }

  propagatePower(x, y) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newX = x + i;
        const newY = y + j;
  
        if (i !== 0 || j !== 0) {
          if (this.isValidPosition(newX, newY)) {
            const neighborIndex = newY * this.boardSizeX + newX;
            this.pins[neighborIndex].hasPower = true;
          }
        }
      }
    }
  }
  
  propagatePowerCircle(x, y) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newX = x + i;
        const newY = y + j;
  
        if (i !== 0 || j !== 0) {
          if (this.isValidPosition(newX, newY)) {
            const neighborIndex = newY * this.boardSizeX + newX;
            this.pins[neighborIndex].isPowerCircle = true;
          }
        }
      }
    }
  }
  

  isValidPosition(x, y) {
    return x >= 0 && x < this.boardSizeX && y >= 0 && y < this.boardSizeY;
  }
}

// example usage for node.js
let log = new Logic(10, 10);