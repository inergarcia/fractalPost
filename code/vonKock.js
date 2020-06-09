const pi = Math.PI
import {drawLineVector} from './paint'

const getPoint = (a, b, t) => {
    return {
        x: a.x * (1 - t) + b.x * t,
        y: a.y * (1 - t) + b.y * t 
    }
}


const getCirPoint = (p, c, da) => {
    let dx = p.x - c.x
    let dy = p.y - c.y
    let r = Math.sqrt(dx*dx + dy*dy)
    let a = Math.atan2(dy, dx)
    a -= da

    let q = {
        x: c.x + r * Math.cos(a),
        y: c.y + r * Math.sin(a)
    }

    return q
}

export const vonKock1 = (ctx, a, b, n) => {
    let P = [a, a, a, a, b]
    
    P[1] = getPoint(P[0], P[4], 1.0/3.0)
    P[3] = getPoint(P[0], P[4], 2.0/ 3.0)
    P[2] = getCirPoint(P[3], P[1], pi / 3.0)
        
    if(n <= 1){
        drawLineVector(ctx, P, true)
    }else{
        for(let i = 0; i < P.length - 1; i++)
            vonKock1(ctx, P[i], P[i + 1], n-1)
    }
}

export const vonKock2 = (ctx, a, b, n) => {
    let P = [a, a, a, a, b]

    P[1] = {
        x: a.x + (b.x - a.x) / 3,
        y: a.y + (b.y - a.y) / 3
    }

    P[3] = {
        x: b.x + (a.x - b.x) / 3,
        y: b.y + (a.y - b.y) / 3
    }

    P[2] = {
        x: (P[1].x + P[3].x) * Math.cos(pi/3) + (P[3].y - P[1].y)*Math.sin(pi/3),
        y: (P[1].y + P[3].y) * Math.cos(pi/3) - (P[3].x - P[1].x)*Math.sin(pi/3)
    }

    if(n <= 1){
        drawLineVector(ctx, P)
    }else{
        for(let i = 0; i < P.length - 1; i++)
            vonKock2(ctx, P[i], P[i + 1], n-1)
    }
}