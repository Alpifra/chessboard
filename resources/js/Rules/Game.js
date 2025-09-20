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
                    clickedPiece = this.board.getPieceFromSquare(square),
                    selectedPiece = this.board.pieces.find(piece => piece.active)

                // TODO : refacto these if and add move
                // clicked on a piece
                if (clickedPiece) {

                    if (
                        clickedPiece.active ||
                        clickedPiece.color !== Game.toMove
                    ) {
                        clickedPiece.active = false
                        this.board.hideMoves(clickedPiece)

                        return
                    }

                    if (!selectedPiece) {

                        clickedPiece.active = true
                        this.board.showMoves(clickedPiece, clickedPiece.availableMoves)
                    } else if (
                        clickedPiece.color === Game.toMove &&
                        clickedPiece !== selectedPiece
                    ) {

                        clickedPiece.active = true
                        this.board.showMoves(clickedPiece, clickedPiece.availableMoves)
                        selectedPiece.active = false
                        this.board.hideMoves(selectedPiece)
                    }

                // clicked on an empty square
                } else {

                    if (selectedPiece?.availableMoves.includes(square)) {
                        selectedPiece.move(square)

                        if (Game.toMove === 'white') {
                            Game.toMove = 'black'
                        } else {
                            Game.toMove = 'white'
                        }
                    } else {
                        //clear the board
                        this.board.hideMoves(selectedPiece)
                        selectedPiece.active = false
                    }
                }

            }
        )
    }

}
