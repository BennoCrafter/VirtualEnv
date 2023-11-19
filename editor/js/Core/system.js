export class System {

    constructor () {
        this.console = document.getElementById("console");
        this.alive = true;
    }

    print(out) {
        if (this.alive) {
            const newElement = document.createElement("span");
            newElement.innerText = out;

            this.console.appendChild(newElement);

            return newElement;
        }

        return null;
    }

    clear() {
        if (this.alive) {
            this.console.innerText = null;
        }
    }

    exit(exitStatus) {
        exitStatus = exitStatus % 2;
        if (exitStatus == 0) {
            this.print("Exit Console with exit status: " + exitStatus);
        }
        else {
            this.print("Error: Exit Console with exit status: " + exitStatus);
            console.error("Error: Exit Console with exit status: " + exitStatus);
        }

        this.alive = false;
    }

}