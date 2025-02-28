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
tree.insert(104);
tree.insert(105);
tree.insert(110);
tree.insert(200);
tree.insert(180);
tree.insert(175);
tree.insert(190);
tree.insert(140);

console.log("INLEVEL:");
tree.levelOrder((node) => console.log(node.value));
console.log("PREORDER:");
tree.preOrder((node) => console.log(node.value));
console.log("POSTORDER:");
tree.postOrder((node) => console.log(node.value));
console.log("INORDER:");
tree.inOrder((node) => console.log(node.value));

console.log(tree.isBalanced());
tree.prettyPrint();
tree.rebalance();
tree.prettyPrint();
console.log(tree.isBalanced());
