import { Pin } from "./pin.js";
import { sleep } from "./HelperFunctions/sleep.js"

async function run() {
    const pin = new Pin(1, false);
    console.log(pin)

    //pin.power()
    for (let i = 0; i < 10; i++) {
        pin.power(); 
        await sleep(1000); 
    }

}

document.getElementById("run-button").addEventListener("click", run);