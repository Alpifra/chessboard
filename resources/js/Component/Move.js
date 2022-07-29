export class Move
{

    constructor(piece, canvas) {
        this.piece = piece
        this.canvas = canvas
    }

    init(ev) {
        if (this.piece.name === 'pawn') {
            this.showMoves(this.piece, [this.piece.square * 1, this.piece.square * 2])
        }
    }

    showMoves(selectedPiece, allowedMoves) {
        selectedPiece.board.highLightSquare(this.piece.square)
    }

}