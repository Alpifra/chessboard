export class Game
{

    static toMove = 'white'

    constructor(board) {
        this.board = board
    }

    init() {
        this.board.chessBoard.addEventListener(
            'click', (ev) => {
                let col = parseInt(ev.layerX / this.board.widthStep),
                    row = parseInt(ev.layerY / this.board.heightStep),
                    square = col + 1 + (this.board.xNumber * row),
                    selectedPiece = this.board.pieces.find((piece) => piece.active)

                if (!selectedPiece) return

                if (selectedPiece.color !== Game.toMove) {
                    this.board.hideMoves()
                    selectedPiece.active = false

                    return
                }

                if (selectedPiece.availableMoves.includes(square)) {
                    selectedPiece.move(square)

                    if (Game.toMove === 'white') {
                        Game.toMove = 'black'
                    } else {
                        Game.toMove = 'white'
                    }
                }

                //clear the board
                this.board.hideMoves()
                selectedPiece.active = false
            }
        )
    }

}
