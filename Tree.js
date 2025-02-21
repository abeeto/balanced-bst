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
        if (array[midPoint]) {
          let nodeToReturn = new Node(null, null, array[midPoint]);
          return nodeToReturn;
        }
        return null;
      }
      let left = helper(array.slice(0, midPoint));
      let right = helper(array.slice(midPoint + 1, array.length));
      let root = new Node(left, right, array[midPoint]);
      return root;
    };
    return helper(newArr);
  }
  insert(value) {
    let helper = ({ parent = this.#root, value }) => {
      if (parent.value === value) {
        return;
      }
      let toAdd = new Node(null, null, value);
      if (value < parent.value && parent.left === null) {
        parent.left = toAdd;
        return;
      } else if (value > parent.value && parent.right === null) {
        parent.right = toAdd;
        return;
      } else if (value < parent.value) {
        helper({ parent: parent.left, value: value });
      } else if (value > parent.value) {
        helper({ parent: parent.right, value: value });
      } else {
        throw Error("Invalid value!");
      }
    };
    helper({ value });
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

let tree = new Tree([100, 500, 20, 10, 30]);
tree.prettyPrint();
tree.insert(600);
tree.prettyPrint();
