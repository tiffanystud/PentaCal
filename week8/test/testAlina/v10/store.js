import PubSub from "PubSub.js";

const isObject = val => val !== null && typeof val === 'object' && Array.isArray(val) === false;

class Store{
    #internalState;
    #pubSub;
    constructor(initialState = {}){
        if(!isObject(initialState)){
            throw new Error("initialState must be object!");
        }
        this.#internalState = initialState;
        this.#pubSub = new PubSub();
    }

    get state(){
        return structuredClone(this.#internalState);
    }

    set state(value){
        return false;
    }

    setState(value){
        if(!isObject(value)){
            throw new Error("value must be an object!");
        }

        const currentState = structuredClone(this.#internalState);
        const nextState = Object.assign(structuredClone(currentState), structuredClone(value));
        this.#internalState = nextState;
        this.#pubSub.publish(currentState, nextState);
        return nextState;
    }

    subscribe(callback, selector){
        return this.#pubSub.subscribe(callback, selector);
    }
}