class Dictionary {
    constructor() {
        this.items = {}
        this.length = 0
    }
    set (key, value) {
        if (!this.has(key)) {
            this.items[key] = value
            this.length++
        }else {
            return false
        }
    }
    has (key) {
        return this.items.hasOwnProperty(key)
    }
    remove (key) {
        if (!this.has(key)) return false
        delete this.items[key]
        this.length--
        return true
    }
    get (key) {
        if (!this.has(key)) return false
        return this.items[key]
    }
    clear () {
        this.items = []
        this.length = 0
        return true
    }
    keys () {
        return Array.from(Object.keys(this.items))
    }
    values () {
        return Array.from(Object.values(this.items))
    }

}
