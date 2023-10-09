import { Pin } from "./pin.js";
import { sleep } from "./HelperFunctions/sleep.js"
import { System } from "../Core/system.js";

async function run() {
    const pin = new Pin(1, false);
    const sys = new System;
    console.log(pin)
    //pin.power()
    for (let i = 0; i < 10; i++) {
        pin.power(); 
        await sleep(1000); 
        
        sys.print("asd");
    }

    await sleep(1000);
    sys.clear();
    sys.exit(5);

}

document.getElementById("run-button").addEventListener("click", run);
