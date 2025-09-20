export class Square
{

    constructor(ctx, x, y, width, height, number, color = 'white') {
        this.ctx = ctx
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.number = number
        this.color = color
        this.attacked = false
    }

    render() {
        const darkColor = '#a10f2c',
            lightColor = '#a5beeb'

        let row = Math.ceil(this.number / 8),
            col = this.number - (row * 8),
            cell = (String.fromCharCode(row + 64) + col).toLowerCase()

        // clear square canvas before drawing
        this.ctx.clearRect(this.x, this.y, this.width, this.height)

        if ((row + col) % 2 === 0) {

            this.ctx.fillStyle = lightColor
            this.ctx.fillRect(this.x, this.y, this.width, this.height)

            this.ctx.font = '10px sans-serif'
            this.ctx.fillStyle = darkColor
            this.ctx.fillText(cell, (this.x + 5), (this.y + 12))
            this.ctx.fillStyle = 'yellow' // TODO: to remove after debug
            this.ctx.fillText(this.number, (this.x + 65), (this.y + 12)) // TODO: to remove after debug
        } else {
            this.ctx.fillStyle = darkColor
            this.ctx.fillRect(this.x, this.y, this.width, this.height)

            this.ctx.font = '10px sans-serif'
            this.ctx.fillStyle = lightColor
            this.ctx.fillText(cell, (this.x + 5), (this.y + 12))
            this.ctx.fillStyle = 'yellow' // TODO: to remove after debug
            this.ctx.fillText(this.number, (this.x + 65), (this.y + 12)) // TODO: to remove after debug
        }
    }

}
