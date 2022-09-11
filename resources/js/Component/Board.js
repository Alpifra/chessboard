export class Board
{

    constructor(chessBoard, xNumber, yNumber) {
        this.chessBoard = chessBoard
        this.xNumber = xNumber
        this.yNumber = yNumber
        this.heightStep = chessBoard.height / yNumber
        this.widthStep = chessBoard.width / xNumber
        this.ctx = chessBoard.getContext('2d')
    }

    createSquares() {
        const darkColor = '#a10f2c'
        const lightColor = '#a5beeb'

        let y = 0,
            caseNumb = this.yNumber

        for (let i = 1; i <= this.yNumber; i++) {
            let x = 0

            for (let j = 1; j <= this.xNumber; j++) {

                let cell = (String.fromCharCode(j + 64) + caseNumb).toLowerCase()

                if ((i + j) % 2 === 0) {
                    //attribute the case number
                    this.ctx.font = '10px sans-serif'
                    this.ctx.fillStyle = darkColor
                    this.ctx.fillText(cell, (x + 5), (y + 12))

                    //color the case b-g
                    this.ctx.fillStyle = lightColor
                    this.ctx.fillRect(x, y, this.widthStep, this.heightStep)
                } else {
                    this.ctx.font = '10px sans-serif'
                    this.ctx.fillStyle = lightColor
                    this.ctx.fillText(cell, (x + 5), (y + 12))

                    this.ctx.fillStyle = darkColor
                    this.ctx.fillRect(x, y, this.widthStep, this.heightStep)
                }

                x = x + this.widthStep
            }
            caseNumb--
            y = y + this.heightStep
        }
    }

    findSquarePosition(square) {
        let squareCol = square % this.xNumber
        let squareRow = Math.ceil(square / this.yNumber)
        squareCol === 0 ? squareCol = 8 : null

        return {row: squareRow, column: squareCol}
    }

    highLightSquare(squares) {
        //clear the board
        this.createSquares()
        console.log(squares);
        
        squares.map( (square) => {

            let positions = this.findSquarePosition(square)
            let x = (positions.column - 1) * this.heightStep
            let y = (positions.row - 1) * this.widthStep
            
            
            this.ctx.fillStyle = '#3d922bbf'
            this.ctx.fillRect(x, y, this.widthStep, this.heightStep)
        })
    }
    
}