import { Pin } from "./pin.js";

const pin = new Pin(1, false);
console.log(pin)
pin.power()

// blink lamp
for(let i = 0; i < 10; i++){
    setTimeout(() => {
        pin.power()
    }, 1000);
}