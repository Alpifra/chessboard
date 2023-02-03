export class Move
{

    constructor(piece, canvas) {
        this.piece = piece
        this.canvas = canvas
    }

    init(ev) {
        let squares = []
        let piece = this.piece

        if (piece.active) {
            piece.board.showMoves([])
            piece.active = false
            return
        }

        piece.active = !piece.active

        switch (piece.name) {
            case 'pawn':
                squares = this.pawnMoves(piece)
                break
            case 'rook':
                squares = this.rookMoves(piece)
                break
            case 'bishop':
                squares = this.bishopMoves(piece)
                break
            case 'knight':
                squares = this.knightMoves(piece)
                break
            case 'queen':
                squares = this.queenMoves(piece)
                break
            case 'king':
                squares = this.kingMoves(piece)
                break
            default:
                break
        }

        piece.board.showMoves(squares)
    }

    pawnMoves(piece) {
        let squares = []

        if (piece.color === 'white') {
            squares.push( this.findRelativeSquarePosition(piece, 0, -1) )
            if (Object.keys(piece.moves).length === 0) {
                squares.push( this.findRelativeSquarePosition(piece, 0, -2) )
            }
        } else {
            squares.push( this.findRelativeSquarePosition(piece, 0, +1) )
            if (Object.keys(piece.moves).length === 0) {
                squares.push( this.findRelativeSquarePosition(piece, 0, +2) )
            }
        }

        return squares
    }

    rookMoves(piece) {
        let squares = []
        for (let index = 1; index < 8; index++) {
            squares.push( this.findRelativeSquarePosition(piece, -(index), 0) )
            squares.push( this.findRelativeSquarePosition(piece, +(index), 0) )
            squares.push( this.findRelativeSquarePosition(piece, 0, -(index)) )
            squares.push( this.findRelativeSquarePosition(piece, 0, +(index)) )
        }

        return squares
    }

    bishopMoves(piece) {
        let squares = []
        for (let index = 1; index < 8; index++) {
            squares.push( this.findRelativeSquarePosition(piece, -(index), -(index)) )
            squares.push( this.findRelativeSquarePosition(piece, +(index), +(index)) )
            squares.push( this.findRelativeSquarePosition(piece, -(index), +(index)) )
            squares.push( this.findRelativeSquarePosition(piece, +(index), -(index)) )
        }

        return squares
    }

    knightMoves(piece) {
        let squares = []
        squares.push( this.findRelativeSquarePosition(piece, -2, +1) )
        squares.push( this.findRelativeSquarePosition(piece, -2, -1) )
        squares.push( this.findRelativeSquarePosition(piece, +2, +1) )
        squares.push( this.findRelativeSquarePosition(piece, +2, -1) )
        squares.push( this.findRelativeSquarePosition(piece, -1, +2) )
        squares.push( this.findRelativeSquarePosition(piece, -1, -2) )
        squares.push( this.findRelativeSquarePosition(piece, +1, +2) )
        squares.push( this.findRelativeSquarePosition(piece, +1, -2) )

        return squares
    }

    queenMoves(piece) {
        return [...this.rookMoves(piece), ...this.bishopMoves(piece)]
    }

    kingMoves(piece) {
        let squares = []
        squares.push(this.findRelativeSquarePosition(piece, +1, +1))
        squares.push(this.findRelativeSquarePosition(piece, +1, -1))
        squares.push(this.findRelativeSquarePosition(piece, -1, +1))
        squares.push(this.findRelativeSquarePosition(piece, -1, -1))
        squares.push(this.findRelativeSquarePosition(piece, +1, 0))
        squares.push(this.findRelativeSquarePosition(piece, -1, 0))
        squares.push(this.findRelativeSquarePosition(piece, 0, +1))
        squares.push(this.findRelativeSquarePosition(piece, 0, -1))

        return squares
    }

    findRelativeSquarePosition(from, xMove, yMove) {
        let position = from.board.findSquarePosition(from.square)

        if ( // out of board possibilities
            position.row + yMove > 8 ||
            position.row + yMove <= 0 ||
            position.column + xMove > 8 ||
            position.column + xMove <= 0
            ) {
            return 0
        }

        return from.square + (8 * yMove) + xMove
    }

}