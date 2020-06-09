import Victor from 'victor'
import {queue} from './queue'
import {drawLine2Point, drawLineVector} from './paint'

const mP = (p1, p2) => {

    return new Victor(
        (p1.x + p2.x + p1.y - p2.y) / 2, 
        (p2.x - p1.x + p1.y + p2.y) / 2)
}

export const dragon_dfs = (ctx, a, b, n) => {
    let P = [a, a, b]
        
    if(n == 0){
        drawLineVector(ctx, P)
    }else{
        P[1] = mP(P[0], P[2])
        for(let i = 0; i < P.length - 1; i++)
            dragon_dfs(ctx, P[i], P[i + 1], n-1)
    }
}

let Q = new queue();


export const dragon_bfs = (ctx, a, b, n) => {
    let line = {
        p1: a,
        p2: b
    }

    if(!n){
        drawLine2Point(ctx, line.p1, line.p2)
    }else{
        Q.push(line)
        let N = Math.pow(2, n) - 1

        while(N){
            let l = Q.top()
            Q.pop()

            let l1 = {
                p1: l.p1,
                p2: mP(l.p1, l.p2)
            } 
        
            let l2 = {
                p1: l.p2,
                p2: mP(l.p1, l.p2)
            }
            Q.push(l1)
            Q.push(l2)
            N--
        }

        N = Math.pow(2, n)

        while(N){
            drawLine2Point(ctx, Q.top().p1, Q.top().p2)
            Q.pop()
            N--
        }
    }
}