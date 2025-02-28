import Node from "./Node.js";
export default class Tree {
  #root;

  constructor(arr) {
    this.#root = this.#buildTree(arr);
  }

  get root() {
    return this.#root;
  }
  #buildTree(arr) {
    console.log("building tree");
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
  delete(value) {
    let helper = ({ current = this.#root, value, parent = this.#root }) => {
      if (current.value === value) {
        // case one: leaf nodes
        if (!current.left && !current.right) {
          if (parent.left?.value === current.value) {
            parent.left = null;
          } else {
            parent.right = null;
          }
        }
        //case two: one child
        if (current.right && !current.left) {
          if (parent.right.value === current.value) {
            parent.right = current.right;
          } else {
            parent.left = current.right;
          }
        } else if (current.left && !current.right) {
          if (parent.right.value === current.value) {
            parent.right = current.left;
          } else {
            parent.left = current.left;
          }
        } else if (current.left && current.right) {
          let nextBiggestNode = current.right;
          while (nextBiggestNode.left) {
            nextBiggestNode = nextBiggestNode.left;
          }
          let valueOfNextBiggestNode = nextBiggestNode.value;
          this.delete(valueOfNextBiggestNode);
          current.value = valueOfNextBiggestNode;
        }
        return;
      }
      // otherwise - traverse the tree or exit
      if (value > current.value && current.right) {
        helper({ current: current.right, value: value, parent: current });
      }
      if (value < current.value && current.left) {
        helper({ current: current.left, value: value, parent: current });
      }
      return;
    };
    helper({ value });
  }
  find(value) {
    let findNodeRecursively = (curr = this.#root) => {
      if (curr === null) {
        return null;
      }
      if (value === curr.value) {
        return curr;
      } else if (value > curr.value) {
        return findNodeRecursively(curr.right);
      } else if (value < curr.value) {
        return findNodeRecursively(curr.left);
      } else {
        throw Error("Some edge case is not being considered");
      }
    };
    let foundNode = findNodeRecursively();
    return foundNode;
  }
  levelOrder(callback) {
    if (typeof callback !== "function") {
      throw Error("Must provide function as callback");
    }
    // recursive
    let queue = [this.#root];
    let traverseLevelOrder = () => {
      if (queue.length === 0) return;
      let toVisit = queue.shift();
      callback(toVisit);
      if (toVisit.left) {
        queue.push(toVisit.left);
      }
      if (toVisit.right) {
        queue.push(toVisit.right);
      }
      traverseLevelOrder();
    };
    traverseLevelOrder();
  }
  inOrder(callback) {
    if (typeof callback !== "function") {
      throw Error("Must provide function as callback");
    }
    let helper = (root) => {
      if (root === null) {
        return;
      }
      helper(root.left);
      callback(root);
      helper(root.right);
    };
    helper(this.#root);
  }

  postOrder(callback) {
    if (typeof callback !== "function") {
      throw Error("Must provide function as callback");
    }
    let helper = (root) => {
      if (root === null) {
        return;
      }
      helper(root.left);
      helper(root.right);
      callback(root);
    };
    helper(this.#root);
  }
  preOrder(callback) {
    if (typeof callback !== "function") {
      throw Error("Must provide function as callback");
    }
    let helper = (root) => {
      if (root === null) {
        return;
      }
      callback(root);
      helper(root.left);
      helper(root.right);
    };
    helper(this.#root);
  }
  height(node) {
    let helper = (curr, height) => {
      if (!curr?.left && !curr?.right) {
        return height;
      }
      height++;
      return Math.max(helper(curr?.left, height), helper(curr?.right, height));
    };
    return helper(node, 0);
  }

  depth(node) {
    let depth = 0;
    let helper = (curr, node) => {
      if (curr.value === node.value) {
        return depth;
      } else if (node.value > curr.value) {
        depth++;
        return helper(curr.right, node);
      } else if (node.value < curr.value) {
        depth++;
        return helper(curr.left, node);
      }
    };
    return helper(this.#root, node);
  }
  isBalanced(node = this.root) {
    if (!node) return true;
    if (!this.isBalanced(node.left) || !this.isBalanced(node.right))
      return false;
    return Math.abs(this.height(node.left) - this.height(node.right)) < 2;
  }
  rebalance() {
    let allNodesInorder = [];
    this.inOrder((node) => allNodesInorder.push(node.value));
    this.#root = this.#buildTree(allNodesInorder);
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
