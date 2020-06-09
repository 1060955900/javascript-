/*
链表：也是线性结构
链表的每个元素由一个存储元素本身的节点和指向下一元素的引用组成。（类似火车，有个火车头，火车头连接下个车厢，以此类推）
优点：与数组相比内存空间不必须是连续的，可以充分利用计算机内存，实现灵活的内存动态管理
链表不必在创建时就确定大小，并且大小可以无限延伸下去
链表在插入和删除数据时，时间复杂度可以是O(1)，相对数组效率更高些
* */
/*
常见的操作：
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
*/
class LinkedList {
   constructor() {
       this.head = null
       this.length = 0
   }
   append (data) {
       let newNode = new Node(data)
       if (this.length === 0) {
           this.head = newNode
       }else {
           let current = this.head
           while (current.next) {
               current = current.next
           }
           current.next = newNode
       }
       this.length++
   }
   toString () {
       let current = this.head,
           listString = ''
       while (current) {
           listString += current.data + ' '
           current = current.next
       }
       return listString
   }
   insert (position, data) {
       if (position < 0) return false
       let newNode = new Node(data)
       if (position === 0) {
           newNode.next = this.head
           this.head = newNode
       }else {
           let current = this.head
           let index = 0
           let previous
           while (index++ < position) {
               previous = current
               current = current.next
           }
           newNode.next = current
           previous.next = newNode
       }
       this.length++
   }
   get (position) {
       if (position < 0 || position >= this.length) return false
       let current = this.head,
           index = 0
       while (index++ < position) {
           current = current.next
       }
       return current.data
   }
   indexOf (element) {
       let current = this.head,
           index = 0
       while (current) {
           if (current.data === element) {
               return index
           }
           current = current.next
           index++
       }
       return -1
   }
   updata (position, element) {
       if (position < 0 || position >= this.length) return false
       let current = this.head,
           index = 0
       while (index++ < position) {
           current = current.next
       }
       current.data = element
       return true
   }
   removeAt (position) {
       if (position < 0 || position >= this.length) return null
       let current = this.head
       if (position === 0) {
           this.head = this.head.next
       }else {
           let index = 0,
               previous
           while (index++ < position) {
               previous = current
               current = current.next
           }
           previous.next = current.next
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
    constructor(dat) {
        this.data = dat
        this.next = null
    }
}
let a = new LinkedList()
a.append('a')
a.append('b')
a.append('c')
a.append('d')
a.insert(1, 'g')
a.remove('a')
console.log(a)