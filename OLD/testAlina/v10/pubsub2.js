const isObject = val => val !== null && typeof val === 'object' && Array.isArray(val) === false;

export default function createPubSub(){
    let callbackList = [];

    function publish(currentState, nextState){
        if(!isObject(currentState)){
            throw new Error("currentState must be an object");
        }
        if(!isObject(nextState)){
            throw new Error("nextState must be an object!");
        }
        
        callbackList.forEach(item =>{
            const currentValue = item.selector(currentState);
            const nextValue = item.selector(nextState);

            if(!Object.is(currentValue, nextValue)){
                item.callback(nextValue);
            }
        });
    }

    function subscribe(callback, selector){
        if (typeof callback !== 'function'){
            throw new Error("callback should be a function!")
        }
        if (typeof selector !== 'function'){
            throw new Error("selector should be a function!");
        }

        const subscriber = {callback, selector};
        callbackList.push(subscriber);

        return () => {
            callbackList = callbackList.filter(item => item !== subscriber);
        }
    }

    return {
        publish, 
        subscribe
    }
}