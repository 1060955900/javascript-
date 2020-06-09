
class HashTable {
    constructor() {
        this.storage = []
        this.count = 0  //装载因子
        this.limit = 11  //存储的数组长度
    }

    hashFunc(str, size) {
        let hashCode = 0
        for (let i = 0; i < str.length; i++) {
            hashCode = 37 * hashCode + str.charCodeAt(i)
        }
        return hashCode % size
    }

    put(key, value) {
        let index = this.hashFunc(key, this.limit),
            bucket = this.storage[index]
        if (!bucket) {
            bucket = []
            this.storage[index] = bucket
            bucket.push([key, value])
            this.count++
            return true
        }
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value
                return true
            }
        }
        bucket.push([key, value])
        this.count++
        if (this.count > this.limit * 0.7) {
            let newLimit =  this.getPrime(this.limit * 2)
            this.resize(newLimit)
        }
    }

    gets (key) {
        let index = this.hashFunc(key, this.limit),
            bucket = this.storage[index]
        if (!bucket) return null
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i]
            }
        }
        return null
    }

    remove (key) {
        let index = this.hashFunc(key, this.limit),
            bucket = this.storage[index]
        if (!bucket) return null
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                let DeleteItem = bucket[i]
                bucket.splice(i, 1)
                if (bucket.length === 0) this.storage[index] = false
                this.count--
                if (this.limit > 7 && this.count < this.limit*0.3) {
                    let newLimit = this.getPrime(Math.floor(this.limit/2))
                    this.resize(newLimit)
                }
                return DeleteItem
            }
        }
        return null
    }

    isEmpty () {
        return this.count === 0
    }

    size () {
        return this.count
    }

    resize (newLimit) {
        let oldStorage = this.storage
        this.count = 0
        this.storage = []
        this.limit = newLimit
        for (let i = 0; i < oldStorage.length; i++) {
            let bucket = oldStorage[i]
            if (!bucket) continue
            for ( let j = 0; j < bucket.length; j++) {
                let tuple = bucket[j]
                this.put(tuple[0], tuple[1])
            }
        }
    }

    isPrime (num) {
        let item = parseInt(Math.sqrt(num))
        for (let i = 2; i <= item; i++) {
            if (item % i === 0) return false
        }
        return true
    }

    getPrime (num) {
        let prime = num
        while (this.isPrime(prime)) {prime++}
        return prime
    }
}

let a = new HashTable()
a.put('l', {name: 'l'})
a.put('q', {name: 'l'})
a.put('w', {name: 'l'})
a.put('e', {name: 'l'})
a.put('r', {name: 'l'})
a.remove('e')
a.remove('w')
console.log(a)