export class Move
{

    constructor(piece, canvas) {
        this.piece = piece
        this.canvas = canvas
    }

    init(ev) {
        let piece = this.piece
        let squares = [piece.square]

        if (piece.active) {
            piece.board.showMoves([])
            piece.active = false
            return
        }

        piece.active = !piece.active

        switch (piece.name) {
            case 'king':
                squares.push(...this.kingMoves(piece))
                break
            case 'queen':
                squares.push(...this.queenMoves(piece))
                break
            case 'rook':
                squares.push(...this.rookMoves(piece))
                break
            case 'bishop':
                squares.push(...this.bishopMoves(piece))
                break
            case 'knight':
                squares.push(...this.knightMoves(piece))
                break
            case 'pawn':
                squares.push(...this.pawnMoves(piece))
                break
            default:
                break
        }

        piece.board.showMoves(squares)
    }

    kingMoves(piece) {
        let squares = [],
            squareTopLeft = this.findRelativeSquarePosition(piece, +1, +1),
            squareTopRight = this.findRelativeSquarePosition(piece, +1, -1),
            squareBotLeft = this.findRelativeSquarePosition(piece, -1, +1),
            squareBotRight = this.findRelativeSquarePosition(piece, -1, -1),
            squareLeft = this.findRelativeSquarePosition(piece, +1, 0),
            squareRight = this.findRelativeSquarePosition(piece, -1, 0),
            squareTop = this.findRelativeSquarePosition(piece, 0, +1),
            squareBot = this.findRelativeSquarePosition(piece, 0, -1)

        if (!piece.getPieceFromSquare(squareTopLeft)) squares.push(squareTopLeft)
        if (!piece.getPieceFromSquare(squareTopRight)) squares.push(squareTopRight)
        if (!piece.getPieceFromSquare(squareBotLeft)) squares.push(squareBotLeft)
        if (!piece.getPieceFromSquare(squareBotRight)) squares.push(squareBotRight)
        if (!piece.getPieceFromSquare(squareLeft)) squares.push(squareLeft)
        if (!piece.getPieceFromSquare(squareRight)) squares.push(squareRight)
        if (!piece.getPieceFromSquare(squareTop)) squares.push(squareTop)
        if (!piece.getPieceFromSquare(squareBot)) squares.push(squareBot)

        return squares
    }

    queenMoves(piece) {
        return [...this.rookMoves(piece), ...this.bishopMoves(piece)]
    }

    rookMoves(piece) {
        let squares = [],
            continueLeft = true,
            continueRight = true,
            continueBack = true,
            continueFwd = true

        for (let index = 1; index < 8; index++) {
            let squareLeft = this.findRelativeSquarePosition(piece, -(index), 0),
                squareRight = this.findRelativeSquarePosition(piece, +(index), 0),
                squareBack = this.findRelativeSquarePosition(piece, 0, -(index)),
                squareFwd = this.findRelativeSquarePosition(piece, 0, +(index))

            if (
                !piece.getPieceFromSquare(squareLeft) &&
                continueLeft
            ) {
                squares.push(squareLeft)
            } else {
                continueLeft = false
            }

            if (
                !piece.getPieceFromSquare(squareRight) &&
                continueRight
            ) {
                squares.push(squareRight)
            } else {
                continueRight = false
            }

            if (
                !piece.getPieceFromSquare(squareBack) &&
                continueBack
            ) {
                squares.push(squareBack)
            } else {
                continueBack = false
            }

            if (
                !piece.getPieceFromSquare(squareFwd) &&
                continueFwd
            ) {
                squares.push(squareFwd)
            } else {
                continueFwd = false
            }
        }

        return squares
    }

    bishopMoves(piece) {
        let squares = [],
            continueTopLeft = true,
            continueTopRight = true,
            continueBotLeft = true,
            continueBotRight = true

        for (let index = 1; index < 8; index++) {
            let squareTopLeft = this.findRelativeSquarePosition(piece, -(index), -(index)),
                squareTopRight = this.findRelativeSquarePosition(piece, +(index), +(index)),
                squareBotLeft = this.findRelativeSquarePosition(piece, -(index), +(index)),
                squareBotRight = this.findRelativeSquarePosition(piece, +(index), -(index))

            if (
                !piece.getPieceFromSquare(squareTopLeft) &&
                continueTopLeft
            ) {
                squares.push(squareTopLeft)
            } else {
                continueTopLeft = false
            }

            if (
                !piece.getPieceFromSquare(squareTopRight) &&
                continueTopRight
            ) {
                squares.push(squareTopRight)
            } else {
                continueTopRight = false
            }

            if (
                !piece.getPieceFromSquare(squareBotLeft) &&
                continueBotLeft
            ) {
                squares.push(squareBotLeft)
            } else {
                continueBotLeft = false
            }

            if (
                !piece.getPieceFromSquare(squareBotRight) &&
                continueBotRight
            ) {
                squares.push(squareBotRight)
            } else {
                continueBotRight = false
            }
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

    pawnMoves(piece) {
        let squares = []

        if (piece.color === 'white') {
            let squareOne = this.findRelativeSquarePosition(piece, 0, -1),
                squareTwo = this.findRelativeSquarePosition(piece, 0, -2)

            if (!piece.getPieceFromSquare(squareOne)) {

                squares.push(squareOne)

                if (Object.keys(piece.moves).length === 0) {
                    squares.push(squareTwo)
                }
            }
        } else {
            let squareOne = this.findRelativeSquarePosition(piece, 0, +1),
                squareTwo = this.findRelativeSquarePosition(piece, 0, +2)

            if (!piece.getPieceFromSquare(squareOne)) {

                squares.push(squareOne)

                if (Object.keys(piece.moves).length === 0) {
                    squares.push(squareTwo)
                }
            }
        }

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
