export const resetCanvas = (ctx, width, height) => {
    ctx.fillStyle = '#071a52'
    ctx.fillRect(0, 0, width, height)
    ctx.strokeStyle = "#f0f0f0"
}

export const drawLineVector = (ctx, v) => {

    for(let i = 0; i < v.length - 1; i++){
        ctx.beginPath()
        ctx.moveTo(v[i].x, v[i].y)
        ctx.lineTo(v[i+1].x, v[i+1].y)
        ctx.stroke()
        ctx.closePath()
    }
}

export const drawLine2Point = (ctx, p1, p2) => {
    ctx.beginPath()
    ctx.moveTo(p1.x, p1.y)
    ctx.lineTo(p2.x, p2.y)
    ctx.stroke()
    ctx.closePath()
}