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
        this.x = null
        this.y = null
        this.color = color
        this.active = false
        this.dead = false
        this.availableMoves = []
        this.moves = []
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

    setMoves() {
        const move = new Move(this, this.board.chessBoard)
        this.board.chessBoard.addEventListener('click', (ev) => {

            if (this.clickOnPiece(ev)) move.init(this)
        })
    }

    clickOnPiece(ev) {

        let halfWidth = this.element.width / 2,
            halfHeight = this.element.height / 2,
            widthMin = this.x - halfWidth,
            widthMax = this.x + halfWidth,
            heightMin = this.y - halfHeight,
            heightMax = this.y + halfHeight

        if (
            ev.layerX > widthMin && ev.layerX < widthMax &&
            ev.layerY > heightMin && ev.layerY < heightMax
        ) {
            return true
        }

        return false
    }

    move(square) {
        let position = this.calculatePosition(square)

        this.element.style.top = position.y + 'px'
        this.element.style.left = position.x + 'px'
        this.square = square
        this.moves.push(square)
    }

    render() {

        let position = this.calculatePosition(this.square)

        this.x = position.x
        this.y = position.y
        this.element = new Image()
        this.element.src = '/assets/img/piece/' + this.name + '_' + this.color[0] + '.svg'

        this.element.addEventListener("load", () => {
            this.board.ctx.drawImage(
                this.element,
                this.x - (this.element.width / 2),
                this.y - (this.element.height / 2)
            );
        });

        this.setMoves()
    }

}
