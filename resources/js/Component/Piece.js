import { Board } from "./Board"
import { Move } from "../Rules/Move"

export class Piece extends Board {

    constructor(name, board, square, color = 'white', active = false, dead = false, moves = {}) {
        super(board.chessBoard, board.xNumber, board.yNumber)
        this.name = name
        this.board = board
        this.square = square
        this.color = color
        this.active = active
        this.dead = dead
        this.moves = moves
    }

    toElement()  {
        let element = document.createElement('img')
        let position = this.calculatePosition()

        element.src = '/assets/img/piece/' + this.name + '_' + this.color[0] + '.svg'
        element.classList.add('piece', 'piece-' + this.square, this.name, this.color)
        element.style.top = position.y + 'px'
        element.style.left = position.x + 'px'

        return element
    }

    calculatePosition() {
        let row = Math.ceil(this.square / this.board.yNumber)
        let col = this.square - ( (row - 1) * this.board.xNumber)
        let square_width = this.board.chessBoard.width / this.board.xNumber
        let position = {
            x: col * square_width - (square_width / 2),
            y: row * square_width - (square_width / 2)
        }

        return position
    }

    setMoves(element, canvas) {
        const Moves = new Move(this, canvas)
        element.addEventListener('click', () => Moves.init())
    }

    render(canvas) {
        const element = this.toElement()
        this.setMoves(element, canvas)
        canvas.appendChild(element)
    }

}