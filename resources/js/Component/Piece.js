import { Board } from "./Board"
import { Move } from "../Rules/Move"

export class Piece extends Board
{

    constructor(name, board, square, color = 'white') {
        super(board.chessBoard, board.xNumber, board.yNumber)
        this.name = name
        this.element = null
        this.board = board
        this.square = square
        this.color = color
        this.active = false
        this.dead = false
        this.availableMoves = []
        this.moves = []
    }

    toElement()  {
        let element = document.createElement('img')
        let position = this.calculatePosition(this.square)

        element.src = '/assets/img/piece/' + this.name + '_' + this.color[0] + '.svg'
        element.classList.add('piece', 'piece-' + this.square, this.name, this.color)
        element.style.top = position.y + 'px'
        element.style.left = position.x + 'px'

        this.element = element

        return element
    }

    calculatePosition(square) {
        let row = Math.ceil(square / this.board.yNumber)
        let col = square - ( (row - 1) * this.board.xNumber)
        let square_width = this.board.chessBoard.width / this.board.xNumber
        let position = {
            x: col * square_width - (square_width / 2),
            y: row * square_width - (square_width / 2)
        }

        return position
    }

    setMoves(element, canvas) {
        const move = new Move(this, canvas)
        element.addEventListener('click', () => move.init())
    }

    move(square) {
        let position = this.calculatePosition(square)

        this.element.classList.replace('piece-' + this.square, 'piece-' + square)
        this.element.style.top = position.y + 'px'
        this.element.style.left = position.x + 'px'
        this.square = square
        this.moves.push(square)
    }

    getPieceFromSquare(square) {
        return this.board.pieces.find(piece => piece.square === square)
    }

    render(canvas) {
        const element = this.toElement()
        this.setMoves(element, canvas)
        canvas.appendChild(element)
    }

}
