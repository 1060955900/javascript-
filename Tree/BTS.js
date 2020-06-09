/*
insert(key): 向树中插入一个新的键
search(key): 在树中查找一个键，如果这个节点存在返回true,没有返回false
midOrderTraversal(): 通过中序遍历的方式遍历所有节点
preOrderTraversal()：通过先序遍历的方式遍历所有节点
postOrderTraverse()：通过后序遍历的方式遍历所有节点
min()：返回树中最小的键/值
max()：返回树中最大的键/值
remove(key)：从树中移除某个键
* */
class Node {
    constructor(key) {
        this.key = key
        this.left = null
        this.right = null
    }
}
class BTS {
    constructor() {
        this.root = null
    }
    insert(key) {
        let newNode = new Node(key)
        if (!this.root) {
            this.root = newNode
        }else {
            this.insertNode(this.root, newNode)
        }
    }
    insertNode (node, newNode) {
        if (node.key > newNode.key) {
            if (!node.left) {
                node.left = newNode
            }else {
                this.insertNode(node.left, newNode)
            }
        }else {
            if (!node.right){
                node.right = newNode
            }else {
                this.insertNode(node.right, newNode)
            }
        }
    }

    preOrderTraversal () {
        let arr = []
        this.preOrderTraversalNode(this.root, arr)
        return arr
    }
    preOrderTraversalNode (node, arr) {
         if (node) {
             arr.push(node.key)
             this.preOrderTraversalNode(node.left, arr)
             this.preOrderTraversalNode(node.right, arr)
         }
     }

    midOrderTraversal () {
        let arr = []
        this.midOrderTraversalNode(this.root, arr)
        return arr
    }
    midOrderTraversalNode (node, arr) {
        if (node) {
            this.midOrderTraversalNode(node.left, arr)
            arr.push(node.key)
            this.midOrderTraversalNode(node.right, arr)
        }
    }

    postOrderTraversal () {
        let arr = []
        this.postOrderTraversalNode(this.root, arr)
        return arr
    }
    postOrderTraversalNode (node, arr) {
        if (node) {
            this.postOrderTraversalNode(node.left, arr)
            this.postOrderTraversalNode(node.right, arr)
            arr.push(node.key)
        }
    }

    min () {
        let node = this.root,
            key = null
        while (node) {
            key = node.key
            node = node.left
        }
        return key
    }
    max () {
        let node = this.root,
            key = null
        while (node) {
            key = node.key
            node = node.right
        }
        return key
    }

    search (key) {
        let node = this.root
        while (node) {
            if (key < node.key) {
                node = node.left
            }else if (key > node.key) {
                node = node.right
            }else {
                return true
            }
        }
        return null
    }

    getPredecessor (node, dir) {
        let current = node.right,
            successorParent = node
        while (current.left) {
            successorParent = current
            current = current.left
        }
        if (current.right) {
            successorParent.left = current.right
            current.right = null
        }else if (!current.right && !current.left) {
            if (successorParent.left.key === current.key) {
                successorParent.left = null
            }else {
                successorParent.right = null
            }
            current.right = null
            current.left = null
        }
        return current
    }
    remove (key) {
        let current = this.root,
            parent = null,
            isLeftChild = true
        while (current.key !== key) {
            parent = current
            if (key < current.key) {
                isLeftChild = true
                current = current.left
            } else {
                isLeftChild = false
                current = current.right
            }
            if (!current) return false
        }

        if (!current.left && !current.right) {
            if (current === this.root) {
                this.root = null
            }else if (isLeftChild){
                parent.left = null
            }else {
                parent.right = null
            }
        }else if (!current.left || !current.right) {
            if (current === this.root) {
                if (isLeftChild) {
                    this.root = current.left || current.right
                }
            } else if (isLeftChild) {
                parent.left = current.right || current.left
            }else {
                parent.right = current.right || current.left
            }
        }else {
            let predecessor = this.getPredecessor(current, 'Successor')
            let rootChildLeft,rootChildRight;
            if (current === this.root) {
                rootChildLeft = this.root.left
                rootChildRight = this.root.right
                this.root = predecessor
                this.root.left = rootChildLeft
                this.root.right = rootChildRight
            }else if (isLeftChild) {
                predecessor.left = parent.left.left
                predecessor.right = parent.left.right
                parent.left = predecessor
            }else {
                predecessor.right = parent.right.right
                predecessor.left = parent.right.left
                parent.right = predecessor
            }
        }
    }
}
let a = new BTS()
a.insert(11)
a.insert(7)
a.insert(15)
a.insert(5)
a.insert(3)
a.insert(9)
a.insert(8)
a.insert(10)
a.insert(13)
a.insert(12)
a.insert(14)
a.insert(20)
a.insert(18)
a.insert(25)
a.insert(6)
a.insert(19)
console.log(a)