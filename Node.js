export default class Node {
  #left;
  #right;
  #value;
  constructor(left, right, value) {
    this.#value = value;
    this.#left = left;
    this.#right = right;
  }
  set left(node) {
    this.#left = node;
  }
  set right(node) {
    this.#right = node;
  }
  set value(value) {
    this.#value = value;
  }
  get value() {
    return this.#value;
  }
  get left() {
    return this.#left;
  }
  get right() {
    return this.#right;
  }
}
