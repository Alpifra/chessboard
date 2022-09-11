export class Move
{

    constructor(piece, canvas) {
        this.piece = piece
        this.canvas = canvas
    }

    init(ev) {
        let squares = []
        let piece = this.piece

        squares.push(piece.square)

        if (piece.active) {
            this.showMoves(this.piece, [])
            piece.active = false
            return
        }
        
        piece.active = !piece.active

        if (piece.name === 'pawn') {
            if (piece.color === 'white') {
                squares.push( piece.square - piece.board.yNumber )
                if (Object.keys(piece.moves).length === 0) {
                    squares.push( piece.square - (2 * piece.board.yNumber) )
                }
            } else {
                squares.push( piece.square + piece.board.yNumber )
                if (Object.keys(piece.moves).length === 0) {
                    squares.push( piece.square + (2 * piece.board.yNumber) )
                }
            }
        }
        this.showMoves(this.piece, squares)
    }

    showMoves(selectedPiece, allowedMoves) {
        selectedPiece.board.highLightSquare(allowedMoves)
    }

}