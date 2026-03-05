class Store {
    static allStates = [];
    constructor(initialState) {
        this.state = initialState;
        Store.allStates.push(this.state)
    }
    getState() {
        return structuredClone(this.state);
    }
    setState(newState) {
        this.state = newState;
    }
    subscribe() {

    }
    notify() {

    }
}