const isObject = val => val !== null && typeof val === 'object' && Array.isArray(val) === false;

class PubSub{
    #callbackList;
    constructor(){
        this.#callbackList = [];
    }

    publish(currentState, nextState){
        if(!isObject(currentState)){
            throw new Error("currentState must be an object");
        }
        if(!isObject(nextState)){
            throw new Error("nextState must be an object!");
        }

        this.#callbackList.forEach(item => {
            const currentValue = item.currentState;
            const nextValue = item.nextState;
            if(!isEqual(currentValue, nextValue)){
                item.callback(nextValue);
            }
        });
    }

    subscribe(callback, selector){
        if(typeof callback !== 'function'){
            throw new Error("callback should be a function!");
        }
        if (typeof selector !== 'function'){
            throw new Error("selector should be a function!");
        }
        const subscriber = { callback, selector};
        this.#callbackList.push(subscriber);

        return () => {
            this.#callbackList.filter(item => item !== subscriber);
        }
    }

}
//----- subscribe returnerar en funktion för att unsubscriba om man vill! ----- ///
//const unsubscribe = pubSub(myCallback, mySelector);
//unsubscribe();