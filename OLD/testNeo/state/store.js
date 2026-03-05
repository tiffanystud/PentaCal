function createStore(initialState) {
    let state = initialState;
    let lastState;
    const listeners = {};

    function getListeners() {
        return listeners;
    }

    function getLastState() {
        return lastState;
    }

    function getState() {
        return state;
    }

    function setState(newState, funcs = []) {
        lastState = state;
        state = newState;
        if (funcs.length !== 0) {
            funcs.forEach((x) => {
                listeners[x](state);
            });
        } else {
            for (let key in listeners) {
                listeners[key](state);
            }
        }
    }

    function subscribe(name, listener) {
        listeners[name] = listener;
    }

    return {
        getState,
        getLastState,
        getListeners,
        setState,
        subscribe
    };
}