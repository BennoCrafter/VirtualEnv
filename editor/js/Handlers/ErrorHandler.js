class Message {
    destroyMessage() {
        delete this;
    }
}

class Error extends Message {
    constructor (message) {
        
    }
}

class Warning extends Message {
    constructor (message) {
        
    }
}

class BufferMessage extends Message {
    constructor (message) {

    }
}