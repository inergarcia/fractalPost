import Victor from 'victor'
import {drawLine2Point} from './paint'

const Triangle = function(p1, p2, p3, tag) {
    this.p1 = p1
    this.p2 = p2
    this.p3 = p3
    this.tag = tag
    this.generated = false

    this.show = function(ctx){
        if(this.tag === 'root'){
            drawLine2Point(ctx, this.p1, this.p2)
            drawLine2Point(ctx, this.p2, this.p3)
            drawLine2Point(ctx, this.p3, this.p1)
        }else if(this.tag === 't1'){
            drawLine2Point(ctx, this.p2, this.p3)
        }else if(this.tag === 't2'){
            drawLine2Point(ctx, this.p3, this.p1)
        }else if(this.tag === 't3'){
            drawLine2Point(ctx, this.p1, this.p2)
        }
    }

    this.T1 = function() {
        let t1_p1 = new Victor(this.p1.x, this.p1.y)
        let t1_p2 = new Victor((this.p1.x + this.p2.x) / 2, (this.p1.y + this.p2.y) / 2)
        let t1_p3 = new Victor((this.p1.x + this.p3.x) / 2, (this.p1.y + this.p3.y) / 2)
        let t1 = new Triangle(t1_p1, t1_p2, t1_p3, 't1')
        return t1
    }

    this.T2 = function() {
        let t2_p1 = new Victor((this.p1.x + this.p2.x) / 2, (this.p1.y + this.p2.y) / 2)
        let t2_p2 = new Victor(this.p2.x, this.p2.y)
        let t2_p3 = new Victor((this.p2.x + this.p3.x) / 2, (this.p2.y + this.p3.y) / 2)
        let t2 = new Triangle(t2_p1, t2_p2, t2_p3, 't2')
        return t2
    }

    this.T3 = function() {
        let t3_p1 = new Victor((this.p1.x + this.p3.x) / 2, (this.p1.y + this.p3.y) / 2)
        let t3_p2 = new Victor((this.p2.x + this.p3.x) / 2, (this.p2.y + this.p3.y) / 2)
        let t3_p3 = new Victor(this.p3.x, this.p3.y)
        let t3 = new Triangle(t3_p1, t3_p2, t3_p3, 't3')
        return t3
    }
}

export const Sierpinski = (ctx, p1, p2, p3, n) => {
    let T = []
    let root = new Triangle(p1, p2, p3, 'root')
    T[0] = root

    while(n--){
        for(let i = T.length - 1; i >= 0; i--){
            if(!T[i].generated){
                T.push(T[i].T1())
                T.push(T[i].T2())
                T.push(T[i].T3())
                T[i].generated = true
            }
        }
    }

    for(let i = 0; i < T.length; i++){
        T[i].show(ctx)
    }
}
