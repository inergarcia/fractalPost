export const queue = function() {
    this.q = []

    this.push = function(ele) {
        this.q.push(ele)
    }

    this.empty = function() {
        return this.q.length === 0
    }

    this.top = function() {
        if(!this.empty())
            return this.q[0]
        return null
    }

    this.pop = function() {
        if(!this.empty())
            return this.q.shift()
        return null
    }
}