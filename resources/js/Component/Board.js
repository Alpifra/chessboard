import { Square } from "./Square"

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
        this.squares = []
    }

    createSquares() {
        let y = 0,
            squareNumber = 1,
            square = null

        for (let i = 1; i <= this.yNumber; i++) {
            let x = 0

            for (let j = 1; j <= this.xNumber; j++) {

                if ((i + j) % 2 === 0) {
                    square = new Square(this.ctx, x, y, this.widthStep, this.heightStep, squareNumber, 'black')
                } else {
                    square = new Square(this.ctx, x, y, this.widthStep, this.heightStep, squareNumber, 'white')
                }

                square.render()
                this.squares.push(square)
                x = x + this.widthStep
                squareNumber++
            }
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

    hideMoves(piece) {
        // clear square canvas before drawing
        for (const square of piece.availableMoves) {

            let color = ''
            const position = piece.calculatePosition(square),
                x = position.x - (this.widthStep / 2),
                y = position.y - (this.heightStep / 2),
                rowOdd = Math.ceil(square / this.xNumber) % 2,
                colOdd = square % 2

            if (
                rowOdd === 0 && colOdd === 0 ||
                rowOdd !== 0 && colOdd === 0
            ) {
                color = 'white'
            } else {
                color = 'black'
            }

            const newSquare = new Square(this.ctx, x, y, this.widthStep, this.heightStep, square, color)

            this.ctx.clearRect(x, y, this.widthStep, this.heightStep)
            newSquare.render()
        }
    }

}
