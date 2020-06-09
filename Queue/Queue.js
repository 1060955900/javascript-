/*
队列特点是先进先出
* */
class Queue {
    constructor() {
        this.items = []
    }
    enpush (ele) {
        this.items.push(ele)
    }
    dequeue () {
        return this.items.shift()
        //这里要使用数组实现是用性能问题的，因为你数组删除第一个元素以后，数组的其他所有元素都要罗一个位置。最好是用链表来实现
    }
    front () {
        return this.items[0]
    }
    isEmpty () {
        return this.items.length === 0
    }
    size () {
        return this.items.length
    }
    toString () {
        return this.items.join('')
    }
}

/*
原游戏击鼓传花游戏：参加者先围成一圈，当击鼓者开始击鼓时，花就开始传，当鼓停时，花到谁手，谁就是"幸运者"，
就要表演节目。表演后，花就从这个"幸运者"开始传，节目依此进行直到最后一个人胜利
更改：一堆人围成一圈，开始数数，数到某个数字的人淘汰，最后剩下的一个人就算是胜利，请问如何知道是那个有位置上的人胜利？
*/
function f(list, num) {
    let queue = new Queue()
    for (let i = 0; i < list.length; i++) {
        queue.enpush(list[i])
    }
    while (queue.size() > 1) {
        for (let j = 0; j < num-1; j++) {
            queue.enpush(queue.dequeue())
        }
        queue.dequeue()
    }
    return queue.front()
}


/*
优先级队列，在开发中，很多时候需要考虑优先级。
实现优先级队列需要考虑：
1、封装元素和优先级放在一起
2、添加元素时，将新插入元素的优先级和队列中已经存在的元素优先级进行比较，以获取自己正取的位置
* */
class PriorityQueue {
    constructor () {
        this.items = []
    }
    enqueue (element, priority) {
        let queueelement = new QueueElement(element, priority)
        if (this.items.length === 0) {
            this.items.push(queueelement)
        } else {
            let added = false
            for (let i = 0; i < this.items.length; i++) {
                if (queueelement.priority < this.items[i].priority) {
                    this.items.splice(i, 0, queueelement)
                    added = true
                    break
                }
            }
            if (!added) this.items.push(queueelement)
        }
    }
    toString () {
        return this.items
    }
}
class QueueElement {
    constructor(element, priority) {
        this.element = element
        this.priority = priority
    }
}
