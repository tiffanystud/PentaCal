import createPubSub from "./pubsub2.js";

const isObject = val => val !== null && typeof val === 'object' && Array.isArray(val) === false;


export default function storeCon(initialState = {}){
    if(!isObject(initialState)){
        throw new Error("initialState must be object!");
    }
    let state = structuredClone(initialState);
    let lastState;
    let pubsub = createPubSub();

    function getState(){
        return structuredClone(state);
    }

    function getLastState(){
        return structuredClone(lastState);
    }

    function setState(value){
        if(!isObject(value)){
            throw new Error("value must be an object!");
        }
        let currentState = structuredClone(state);
        let nextState = Object.assign(structuredClone(currentState), structuredClone(value));
        
        state = nextState;
        lastState = currentState;
        pubsub.publish(currentState, nextState);
        return nextState;
    }

    function subscribe(callback, selector){
        return pubsub.subscribe(callback, selector);
    }

    return {
        getState,
        getLastState,
        setState,
        subscribe,
    }
    
}