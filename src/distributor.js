export class GlobalEventDistributor {
    constructor() {
        this.stores = [];
    }

    registerStore(store) {
        this.stores.push(store);
    }

    dispatch(event) {
        this.stores.forEach((store) => {
            store.dispatch(event)
            setTimeout(()=>store.dispatch({type:'REFRESH'}))
        });
    }

    getState() {
        let state = {};
        this.stores.forEach((store) => {
            let currentState = store.getState();
            state[currentState.namespace] = currentState
        });
        
        return state
    }
}