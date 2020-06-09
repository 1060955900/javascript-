const  color = {
    RED: 0,
    BLACK: 1
}
console.log(color.BLACK)
class Node {
    constructor(data, color) {
        this.key = data
        this.color = color
        this.right = null
        this.left = null
        this.parent = null
    }
}
class RBT {
    constructor() {
        this.root = null
    }
    left (node) {
        let chile = node.right
        node.right = chile.left
        if (node.parent) {
            if (node === node.parent.right) {
                node.parent.right = chile
            }else {
                node.parent.left = chile
            }
        }else {
            this.root = chile
            chile.parent = null
        }
        chile.left = node
        node.parent = chile
    }
    right (node) {
        const lchild = node.left;
        node.left = lchild.right;
        if (lchild.right) {
            lchild.right.parent = node;
        }
        lchild.parent = node.parent;
        if (!lchild.parent) {
            this.root = lchild;
        } else {
            if (node === node.parent.right) {
                node.parent.right = lchild;
            } else if (node === node.parent.left) {
                node.parent.left = lchild;
            }
        }
        lchild.right = node;
        node.parent = lchild;
    }
    insertNode (node, newNode) {
        let parent = null,
            current = node,
            isLeft = true
        while (current) {
            parent = current
            if (current.key > newNode.key) {
                isLeft = true
                current = current.left
            }else {
                isLeft = false
                current = current.right
            }
        }
        newNode.parent = parent
        isLeft?parent.left=newNode:parent.right=newNode
        this.balanceInsertion(newNode)
    }
    insert (key) {
        //情况一：插入时没有根节点，插入的元素为根节点
        let newNode = new Node(key, color["RED"])
        if (!this.root) {
            this.root = newNode
        }else {
            this.insertNode(this.root, newNode)
        }
        this.root.color = color.BLACK
    }
    balanceInsertion (node) {
        // 场景三：插入节点的父节点为黑色节点，无需修正
        while (node.parent != null && node.parent.color === color.RED) {
            let uncle = null;
            // 父节点是祖父节点左节点
            if (node.parent === node.parent.parent.left) {
                uncle = node.parent.parent.right;
                // 场景四：叔叔节点为红色
                if (uncle != null && uncle.color === color.RED) {
                    // 父节点、叔叔节点变成黑色，祖父节点变成红色，以祖父节点当作需要新节点继续调用修正方法；
                    node.parent.color = color.BLACK;
                    uncle.color = color.BLACK;
                    node.parent.parent.color = color.RED;
                    node = node.parent.parent;
                    continue;
                }
                // 场景五：叔叔节点为空节点或者是黑色节点；
                // 场景5.2 插入节点是父节点的右节点，先进行左旋转换到场景5.1
                if (node === node.parent.right) {
                    // 左旋之后，原插入节点的父节点变成新插入节点；
                    node = node.parent;
                    this.left(node);
                }
                // 场景5.1 插入节点是父节点的左节点；
                // 父节点变成黑色、祖父节点变成红色
                node.parent.color = color.BLACK;
                node.parent.parent.color = color.RED;
                // 对祖父节点右旋
                this.right(node.parent.parent);
            } else {
                // 父节点是祖父节点右子节点
                uncle = node.parent.parent.left;
                // 场景四：叔叔节点为红色
                if (uncle != null && uncle.color === color.RED) {
                    // 父节点、叔叔节点变成黑色，祖父节点变成红色，以祖父节点当作需要新节点继续调用修正方法；
                    node.parent.color = color.BLACK;
                    uncle.color = color.BLACK;
                    node.parent.parent.color = color.RED;
                    node = node.parent.parent;
                    continue;
                }
                // 场景5.4 插入节点是父节点的左节点，先进行右旋转换到场景5.3
                if (node === node.parent.left) {
                    // 右旋之后，原插入节点的父节点变成新插入节点；
                    node = node.parent;
                    this.right(node);
                }
                // 场景5.3插入节点是父节点的右节点；
                // 父节点变成黑色、祖父节点变成红色
                node.parent.color = color.BLACK;
                node.parent.parent.color = color.RED;
                // 对祖父节点左旋
                this.left(node.parent.parent);
            }
        }
    }
}

let a = new RBT()
a.insert(10)
a.insert(9)
a.insert(8)
a.insert(7)
a.insert(6)
a.insert(5)
a.insert(4)
a.insert(3)
a.insert(2)
a.insert(1)
console.log(a)