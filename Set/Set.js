
/*
  集合：
  通常是由一组无序的，不能重复的元素构成
  与我们数学的集合类似。但是数学的集合范围会更大些，也允许集合中出现元素重复。
  在计算机中，集合通常表示结构中的元素时不能重复的
  其实也算是一个特殊的数组：
  特殊之处就在于里面的元素没有顺序，也不能重复
  没有顺序就不能通过下标值进行访问，不能重复就是表示相同的对象只能在集合中存在一份
 */
/*
  集合常用的方法：
  add(value): 向集合添加一个新的项
  remove(value): 从集合移除某一项
  has(value): 如何在集合中返回true,没有返回false
  clear(): 移除集合所有的项
  size()：返回集合元素的个数
  values(): 返回一个包含集合所有集合元素的数组
* */

/*
集合间的通常操作：
并集：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合
交集：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合
差集：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合
子集：验证一个给定的集合是否是另一个集合的子集。
* */
class Set {
    constructor() {
        this.items = {}
    }
    add (value) {
        if (this.has(value)) return false
        this.items[value] = value
        return true
    }
    has (value) {
        return this.items.hasOwnProperty(value)
    }
    remove (value) {
        if (!this.has(value)) return false
        delete this.items[value]
        return true
    }
    clear () {
        this.items = {}
    }
    size () {
        return Object.keys(this.items).length
    }
    values () {
        return Array.from(Object.keys(this.items))
    }

    //集合间的操作
    // 并集
    union (otherSet) {
        let unionSet = new Set()
        let value = this.values()
        for (let i = 0; i < value.length; i++) {
            unionSet.add(value[i])
        }
        value = otherSet.values()
        for (let j = 0; j < value.length; j++) {
            unionSet.add(value[j])
        }
        return unionSet
    }

    // 交集
    intersection (otherSet) {
        let intersections = new Set(),
            value = this.values()
        for (let i = 0; i < value.length; i++) {
            if (otherSet.has(value[i])) intersections.add(value[i])
        }
        return intersections
    }

    // 差集
    differenceSet (otherSet) {
        let difference = new Set(),
            value = this.values()
        for (let i = 0; i < value.length; i++) {
            if (!otherSet.has(value[i])) difference.add(value[i])
        }
        return difference
    }

    // 子集
    subSet (otherSet) {
        let value = this.values()
        for (let i = 0; i < value.length; i++) {
            if (!otherSet.has(value[i])) return false
        }
        return true
    }
}



