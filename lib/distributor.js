export class GlobalEventDistributor {
  constructor() {
    this.stores = [];
  }

  registerStore(store) {
    this.stores.push(store);
  }

  dispatch(event) {
    this.stores.forEach(store => store.dispatch(event));
  }
}
