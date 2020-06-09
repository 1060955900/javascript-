/*
单向链表有一个明显缺点：
我们可以很轻松访问和到底下一个节点，但是却回不到上个节点，如果想回到上个节点的话我们需要从头再来。
然后实际开发中我们经常要回到上个节点
*/
/*
这个时候双向链表就出来了：双向链表可以从头到尾，也可以从尾部到头部
也就是说它是双向的，一个节点可以向前连接的引用，也有向后的连接引用
可以很好的解决单向链表的问题。
但是双向链表的缺点就是实现比较复杂，相对于单向链表内存空间会更多些
但是这跟这些跟双向链表带来的好处比起来微不足道
双向链表的常见操作，与单向链表一致:
append(element): 在尾部添加一个新的项
insert(position, element):向链表特定位置插入元素
get(position): 获取对应位置的元素
indexOf(element): 返回元素在链表中的索引。如果没有就返回-1
updata(position, element): 修改链表某个元素
removeAt(position): 从链表特定位置的移除一项
remove(element): 从链表中移除一项
isEmpty(): 查看链表是否存在元素，有就返回true,无就返回false
size(): 返回链表的元素个数
toString(): 返回链表的所有元素
orderString(): 正序返回链表的所有元素
reverseOrderString(): 反向遍历返回链表的所有元素
* */
class DoubleLinkedList {
    constructor () {
        this.head = null
        this.tail = null
        this.length  = 0
    }
    append (element) {
        let newNode = new Node(element)
        if (this.length === 0) {
            this.head = newNode
            this.tail = newNode
        }else {
            newNode.prev = this.tail
            this.tail.next = newNode
            this.tail = newNode
        }
        this.length++
    }
    insert(position, data) {
        if (position < 0 || position >= this.length) return false
        let current = this.head,
            newNode = new Node(data),
            index = 0,
            prev;
        if (position === 0) {
            this.head.prev = newNode
            newNode.next = this.head
            this.head = newNode
        }else if (position === this.length-1){
            newNode.prev = this.tail
            this.tail.next = newNode
            this.tail = newNode
        }else {
            while (index++ < position) {
                // prev = current
                current = current.next
            }
            newNode.next = current
            newNode.prev = current.prev
            current.prev.next = newNode
            current.prev = newNode
        }
        this.length++
    }
    orderString () {
        let listString = '',
            current = this.head
        while (current) {
            listString += current.data + ' '
            current = current.next
        }
        return listString
    }
    reverseOrderString () {
        let listString = '',
            current = this.tail
        while (current) {
            listString += current.data + ' '
            current = current.prev
        }
        return listString
    }
    get (position) {
        if (position < 0 || position >= this.length) return null
        let index = 0,
            current = this.head
        if (this.length / 2 >= position) {
            while (index++ < position) {
                current = current.next
            }
        }else {
            while (index++ < this.length-position) {
                current = this.tail.prev
            }
        }

        return current.data
    }
    indexOf (data) {
        let index = 0,
            current = this.head
        while (current) {
            if (current.data === data) {
                return index
            }
            current = current.next
            index++
        }
        return -1
    }
    updata(position, element) {
        if (position < 0 || position >= this.length) return false
        let index = 0,
            current = this.head
        if (this.length / 2 >= position) {
            while (index++ < position) {
                current = current.next
            }
        }else {
            while (index++ < this.length-position) {
                current = this.tail.prev
            }
        }
        current.data = element
        return true
    }
    removeAt (position) {
        if (position < 0 || position >= this.length) return false
        let index = 0,
            current = this.head
        if (position === 0) {
            if (this.length === 1) {
                this.head = null
                this.tail = null
            }else {
                this.head.next.prev = null
                this.head = this.head.next
            }
        }else if (position === this.length-1) {
            current = this.tail
            this.tail.prev.next = null
            this.tail.prev = null
        }else {
            while (index++ < position) {
                current = current.next
            }
            current.prev.next = current.next
            current.next.prev = current.prev
            current.next = null
            current.prev = null
        }
        this.length--
        return current.data
    }
    remove (element) {
        let index = this.indexOf(element)
        return this.removeAt(index)
    }
    isEmpty () {
        return this.length === 0
    }
    size () {
        return this.length
    }
}

class Node {
    constructor(data) {
        this.data = data
        this.prev = null //上一个
        this.next = null //下一个
    }
}

let a = new DoubleLinkedList()
a.append('a')
a.append('b')
a.append('c')
a.append('d')
a.append('e')
a.append('f')
console.log(a.remove('e'))
console.log(a)