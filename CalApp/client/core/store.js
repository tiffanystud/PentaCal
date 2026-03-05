class Store {
    static allStates = [];
    static listeners = {};
    constructor(initialState) {
        this.state = initialState;
        this.lastState = null;
        Store.allStates.push(this.state)
    }
    getState() {
        return structuredClone(this.state);
    }
    setState(newState) {
        this.lastState = this.state;
        this.state = newState;
        this.notify();
    }
    subscribe(eventName, listener) {
        if (!Store.listeners[eventName]) Store.listeners[eventName] = [];
        Store.listeners[eventName].push(listener);
    }
    notify(eventName) {
        Store.listeners[eventName].forEach(listener => listener(this.state));
    }
}