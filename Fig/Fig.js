
/*
这里使用邻接表实现图的表示方式,
注意这里要引入字典和队列的那个类
* */
class Fig {
    constructor() {
        this.vertexes = []
        this.edges = new Dictionary()
    }
    addVertex (v) {
        this.vertexes.push(v)
        this.edges.set(v, [])
    }
    addEdge (v1, v2) {
        this.edges.get(v1).push(v2)
        this.edges.get(v2).push(v1)
    }
    toString () {
        let resString = ''
        this.vertexes.forEach(item => {
            resString += item + '-->'
            let vEdge = this.edges.get(item)
            for (let j = 0; j < vEdge.length; j++) {
                resString += vEdge[j] + ' '
            }
            resString += '\n'
        })
        return resString
    }
    initializeColor () {
        let color = []
        this.vertexes.forEach(item => {
            color[item] = 'white'
        })
        return color
    }
    bfs (v, callback) {
        let color = this.initializeColor(),
            queue = new Queue()
        queue.enpush(v)
        while (!queue.isEmpty()) {
            let vs = queue.dequeue(),
                vList = this.edges.get(vs)
            color[vs] = 'gray'
            for (let i = 0; i < vList.length; i++) {
                let other = vList[i]
                if (color[other] === 'white') {
                    color[other] = 'gray'
                    queue.enpush(other)
                }
            }
            callback(vs)
            color[vs] = 'black'
        }
    }
    dfs (v, callback) {
        let color = this.initializeColor()
        this.dfsVisit(v, color, callback)
    }
    dfsVisit (v, color, callback) {
        color[v] = 'gray'
        callback(v)
        let vLsit = this.edges.get(v)
        for (let i = 0; i < vLsit.length; i++) {
            let other = vLsit[i]
            if (color[other] === 'white') this.dfsVisit(other, color, callback)
        }
        color[v] = 'black'
    }
}
let t = new Fig()
let myFig = ['A','B','C','D','E','F','G','H','I']
myFig.forEach(item => {
    t.addVertex(item)
})
t.addEdge('A', 'B')
t.addEdge('A', 'C')
t.addEdge('A', 'D')
t.addEdge('C', 'D')
t.addEdge('C', 'G')
t.addEdge('D', 'G')
t.addEdge('D', 'H')
t.addEdge('B', 'E')
t.addEdge('B', 'F')
t.addEdge('E', 'I')
let rel = ''
t.dfs(t.vertexes[0], function (v) {
    rel += v + ' '
})
console.log(rel)



