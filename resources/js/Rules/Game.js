export class Game
{

    constructor(board) {
        this.board = board
        this.toMove = 'white'
    }

    init() {
        this.board.chessBoard.addEventListener(
            'click', (ev) => {
                let col = parseInt(ev.layerX / this.board.widthStep),
                    row = parseInt(ev.layerY / this.board.heightStep),
                    square = col + 1 + (this.board.xNumber * row),
                    selectedPiece = this.board.pieces.find((piece) => piece.active)

                if (
                    !selectedPiece ||
                    selectedPiece.color !== this.toMove
                ) {
                    return
                }

                if (selectedPiece.moves.includes(square)) {
                    selectedPiece.move(square)

                    if (this.toMove === 'white') {
                        this.toMove = 'black'
                    } else {
                        this.toMove = 'white'
                    }
                }

                //clear the board
                this.board.createSquares()
                selectedPiece.active = false
            }
        )
    }

}
