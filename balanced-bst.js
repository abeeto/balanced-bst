import Tree from "./Tree.js";

const createRandomArray = (n) => {
  return Array.from({ length: n }, (v) => {
    return Math.floor(Math.random() * 100);
  });
};
let newRandomArray = createRandomArray(8);
let tree = new Tree(newRandomArray);
tree.prettyPrint();
console.log(tree.isBalanced());

console.log("INSERTING EIGHT NUMBERS OVER 100");
tree.insert(104);
tree.insert(105);
tree.insert(110);
tree.insert(200);
tree.insert(180);
tree.insert(175);
tree.insert(190);
tree.insert(140);

console.log("INLEVEL:");
let list = [];
tree.levelOrder((node) => list.push(node.value));
console.log(list.join());
list = [];
console.log("PREORDER:");
tree.preOrder((node) => list.push(node.value));
console.log(list.join());
list = [];
console.log("POSTORDER:");
tree.postOrder((node) => list.push(node.value));
console.log(list.join());
list = [];
console.log("INORDER:");
tree.inOrder((node) => list.push(node.value));
console.log(list.join());
list = [];
tree.prettyPrint();
console.log(`isBalanced: ${tree.isBalanced()}`);
tree.rebalance();
tree.prettyPrint();
console.log(`isBalanced: ${tree.isBalanced()}`);
