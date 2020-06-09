// 栈的数据结构就是先进后出,是一种线性受限的结构
// 在JS中需要用数组来包装
/*
栈的常用的方法大概有：
push(ele):添加一个新元素到栈顶
*/

class Stack {
    constructor() {
        this.test = []
    }
    push (ele) {
        this.test.push(ele)
    }
    pop () {
        return this.test.pop()
    }
    peek () {
        return this.test[this.test.length-1]
    }
    isEmpty () {
        return this.test.length === 0
    }
    size () {
        return this.test.length
    }
    toString () {
        let item = [...this.test]
        item = item.reverse()
        return item.join('')
    }
}

function f(num) {
    let stack = new Stack()
    while (num > 0) {
        stack.push(num % 2)

        num = Math.floor(num/2)
    }
    return stack.toString()
}//把十进制转换成二进制

console.log(f(1000))