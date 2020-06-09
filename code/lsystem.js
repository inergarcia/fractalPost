import Victor from 'victor'
import {drawLine2Point} from './paint'

// let axion = "F",
//     sentence = axion,
//     len = 1

// let rules = [
//     {
//         a: 'F',
//         b: 'F[+F]F[-F][F]'
//     }
// ]

const create_patron = (sentence, rules) => {
    let nextSentece = ''
    for(let i = 0; i < sentence.length; i++){
        let current = sentence.charAt(i)
        let found = false
        for(let r = 0; r < rules.length; r++){
            if(current === rules[r].a){
                found = true
                nextSentece += rules[r].b
                break
            }
        } 
        if(!found)
            nextSentece += current
    }

    return nextSentece
}

const interprete = (ctx, sentence, a, b, angle) => {
    let stack = []
    
    let l = {
        p1: a,
        p2: b
    }

    
    for(let i = 0; i < sentence.length; i++){
        let current = sentence.charAt(i)

        if(current === 'F'){
            drawLine2Point(ctx, l.p1, l.p2)
            let newp1 = l.p2
            let newp2 = new Victor(l.p2.x, l.p2.y).subtract(l.p1)
            newp2.add(l.p2)
            
            l = {
                p1: newp1,
                p2: newp2
            }
        }else if(current === '+'){
            let newp1 = l.p1
            let newp2 = new Victor(l.p2.x, l.p2.y).subtract(l.p1)
            newp2.rotate(angle)
            newp2.add(newp1)
            l = {
                p1: newp1,
                p2: newp2
            }
        }else if(current === '-'){
            let newp1 = l.p1
            let newp2 = new Victor(l.p2.x, l.p2.y).subtract(l.p1)
            newp2.rotate(-angle)
            newp2.add(newp1)
            l = {
                p1: newp1,
                p2: newp2
            }
        }else if(current === '['){
            stack.push(l)
        }else if(current === ']'){
            l = stack.pop()
        }
    }
}


export const Lsystem = (ctx, axion, rules, a, b, angle, factor_scale, n) => {
    let sentence = axion
    let scale = 1
    while(n--){
        sentence = create_patron(sentence, rules)
        scale *= factor_scale
    }
    
    let dir = new Victor(b.x, b.y).subtract(a) 
    dir.divide(new Victor(scale, scale))
    dir.add(a)
    interprete(ctx, sentence, a, dir, angle)
}