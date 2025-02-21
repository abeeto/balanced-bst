import Node from "./Node.js";
class Tree {
  #root;

  constructor(arr) {
    this.#root = this.#buildTree(arr);
  }

  get root() {
    return this.#root;
  }

  #buildTree(arr) {
    let newArr = Array.from(new Set(arr));
    newArr.sort((a, b) => a - b);
    let helper = (array) => {
      let midPoint = Math.floor(array.length / 2);
      if (midPoint === 0) {
        let nodeToReturn = new Node(null, null, array[midPoint]);
        return nodeToReturn;
      }
      let left = helper(array.slice(0, midPoint));
      let right = helper(array.slice(midPoint + 1, array.length));
      let root = new Node(left, right, array[midPoint]);
      return root;
    };
    return helper(newArr);
  }

  prettyPrint(node = this.#root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}

let tree = new Tree([100, 98, 50, 65, 32, 23, 48, 20, 3, 4]);
tree.prettyPrint();
