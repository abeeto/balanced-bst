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
  delete(value) {
    let helper = ({ current = this.#root, value, parent = this.#root }) => {
      if (current.value === value) {
        // time to delete - deal with all the cases here
        if (current.left && current.right) {
          if (current.value < parent.value) {
            parent.left = current.right;
            parent.left.left = current.left;
          } else {
            parent.right = current.left;
            parent.right.right = current.right;
          }
        } else if (current.left || current.right) {
          if (current.left) {
            current.value = current.left.value;
            current.left = null;
          } else {
            current.value = current.right.value;
            current.right = null;
          }
        } else if (!current.left && !current.right) {
          // no children - i.e. leaf node:
          if (parent.right?.value === current.value) {
            parent.right = null;
          } else {
            parent.left = null;
          }
        } else {
          throw Error("I must have not taken a case into account");
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
    let helper = () => {
      if (queue.length === 0) return;
      let toVisit = queue.shift();
      callback(toVisit);
      if (toVisit.left) {
        queue.push(toVisit.left);
      }
      if (toVisit.right) {
        queue.push(toVisit.right);
      }
      helper();
    };
    helper();
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

let tree = new Tree([50, 70, 40, 43, 80]);
tree.prettyPrint();
tree.insert(48);
tree.insert(78);
tree.insert(100);
tree.insert(41);
tree.prettyPrint();
tree.levelOrder((node) => console.log(node.value));
