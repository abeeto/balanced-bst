export default class Node {
  #left;
  #right;
  #value;
  constructor(left, right, value) {
    this.#value = value;
    this.#left = left;
    this.#right = right;
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
