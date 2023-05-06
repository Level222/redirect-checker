export class PromiseExtensionListener {
  #handlers = new Set();

  constructor(eventType, ...options) {
    eventType.addListener(this.#eventHandler, ...options);
  }

  #eventHandler = (event) => {
    for (const handler of this.#handlers) {
      handler(event);
    }
    this.#handlers.clear();
  };

  nextOccurs() {
    return new Promise((resolve) => {
      this.#handlers.add(resolve);
    });
  }
}
