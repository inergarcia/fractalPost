import Victor from 'victor'
import {drawLine2Point} from './paint'

const Branch = function(start, end, al, ar, divl, divr) {
    this.start = start
    this.end = end
    this.left_angle = al
    this.right_angle = ar
    this.divl = divl
    this.divr = divr
    this.completed = false

    this.show = function(ctx) {
        drawLine2Point(ctx, this.start, this.end)
    }

    this.branchA = function() {
        let dir = new Victor(this.end.x, this.end.y).subtract(this.start) 
        dir.rotate(this.right_angle)
        dir.divide(new Victor(this.divr, this.divr))
        dir.add(this.end)

        let right = new Branch(this.end, dir, this.left_angle, this.right_angle, this.divl, this.divr)
        return right
    }

    this.branchB = function() {
        let dir = new Victor(this.end.x, this.end.y).subtract(this.start) 
        dir.rotate(this.left_angle)
        dir.divide(new Victor(this.divl, this.divl))
        dir.add(this.end)
        
        let left = new Branch(this.end, dir, this.left_angle, this.right_angle, this.divl, this.divr)
        return left
    }
}

export const generateTree = (ctx, p1, p2, al, ar, divl, divr, n) => {
    let T = []
    let root = new Branch(p1, p2, al, ar, divl, divr)
    T[0] = root    

    while(n--){
        for(let i = T.length - 1; i >= 0; i--){
            if(!T[i].completed){
                T.push(T[i].branchA())
                T.push(T[i].branchB())
            }
            T[i].completed = true
        }
    }

    for(let i = 0; i< T.length; i++){
        T[i].show(ctx)
    }
}
