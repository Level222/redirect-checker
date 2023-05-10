export class PromiseExtensionListener {
  #handlers = new Set();

  constructor(eventType, ...options) {
    eventType.addListener(this.#eventHandler, ...options);
  }

  #eventHandler = (...args) => {
    for (const handler of this.#handlers) {
      handler(args);
    }
    this.#handlers.clear();
  };

  nextOccurs() {
    return new Promise((resolve) => {
      this.#handlers.add(resolve);
    });
  }
}
