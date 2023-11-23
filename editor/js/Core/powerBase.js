class PowerBase {
    constructor (container, amountPlusPins, amountGrondPins) {
        this.container = container;
        this.container.pins = [[], []];
        this.amountPins = [amountPlusPins, amountGrondPins]
        this.cellSize = 15;
        this.setupPins();
    }

    setupPins() { // guck dc, hab btw git commit gemacht
        let index = 0;
        for (let currentPinType = "plus-pin"; index < 2; currentPinType = "ground-pin") {
            for (let pin = 0; pin < this.amountPins[index]; pin++) {
                const newPin = document.createElement(currentPinType);
                this.setupPinProps(newPin, currentPinType, pin);
                this.setupPinStyle(newPin, index);
                addEventListenerToPowerBasePins(newPin);
                newPin.innerHTML = `<br>${pin + 1}`;
    
                this.container.appendChild(newPin);
                this.container.pins[index].push({ container: newPin, type: null });
            }
            index++;
        }

        console.log(this.container.pins);
    }
    
    setupPinStyle(pin, index) {
        pin.classList.add("power-base-pin");
        pin.style.width = `${this.cellSize}px`
        pin.style.height = `${this.cellSize}px`
        pin.style.marginTop = `${this.cellSize + ((this.container.style.height.split("px")[0] - (this.cellSize * 4)) * index)}px`;
        pin.style.marginLeft = pin.style.width;
    }

    setupPinProps(pin, type, pos) {
        pin.props = {
            pos: pos,
            type: type
        }
    }

    placeWire(wire) {
        const typeIndex = {"plus-pin": 0, "ground-pin": 1};
        this.container.pins[typeIndex[wire.pos[1].props.type]][wire.pos[1].props.pos].type = wire;
        console.log(this.container.pins);
    }
}