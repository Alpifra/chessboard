export class Board
{

    constructor(chessBoard, xNumber, yNumber) {
        this.chessBoard = chessBoard
        this.xNumber = xNumber
        this.yNumber = yNumber
        this.heightStep = chessBoard.height / yNumber
        this.widthStep = chessBoard.width / xNumber
        this.ctx = chessBoard.getContext('2d')
        this.pieces = []
    }

    createSquares() {
        const darkColor = '#a10f2c'
        const lightColor = '#a5beeb'

        let y = 0,
            caseNumb = this.yNumber,
            debugNumb = 1

        for (let i = 1; i <= this.yNumber; i++) {
            let x = 0

            for (let j = 1; j <= this.xNumber; j++) {

                let cell = (String.fromCharCode(j + 64) + caseNumb).toLowerCase()

                if ((i + j) % 2 === 0) {
                    //color the case b-g
                    this.ctx.fillStyle = lightColor
                    this.ctx.fillRect(x, y, this.widthStep, this.heightStep)

                    //attribute the case number
                    this.ctx.font = '10px sans-serif'
                    this.ctx.fillStyle = darkColor
                    this.ctx.fillText(cell, (x + 5), (y + 12))
                    this.ctx.fillStyle = 'yellow' // TODO: to remove after debug
                    this.ctx.fillText(debugNumb, (x + 65), (y + 12)) // TODO: to remove after debug
                } else {
                    this.ctx.fillStyle = darkColor
                    this.ctx.fillRect(x, y, this.widthStep, this.heightStep)

                    this.ctx.font = '10px sans-serif'
                    this.ctx.fillStyle = lightColor
                    this.ctx.fillText(cell, (x + 5), (y + 12))
                    this.ctx.fillStyle = 'yellow' // TODO: to remove after debug
                    this.ctx.fillText(debugNumb, (x + 65), (y + 12)) // TODO: to remove after debug
                }

                x = x + this.widthStep
                debugNumb++
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

    getPieceFromSquare(square) {
        return this.pieces.find(piece => piece.square === square)
    }

    showMoves(piece, squares) {
        //clear the board
        this.createSquares()

        squares.map( (square) => {

            const positions = this.findSquarePosition(square),
                x = (positions.column - 1) * this.heightStep,
                y = (positions.row - 1) * this.widthStep,
                pieceOnSquare = this.getPieceFromSquare(square)
            let color = '#44a72f85'

            if (pieceOnSquare) {
                if (pieceOnSquare.color === piece.color) {
                    color = '#efb242d1'
                } else {
                    color = '#e94848c4'
                }
            }

            this.ctx.fillStyle = color
            this.ctx.fillRect(x, y, this.widthStep, this.heightStep)
        })
    }

}
