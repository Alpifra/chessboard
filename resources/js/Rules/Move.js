import { Game } from "./Game"

export class Move extends Game
{

    constructor(piece, canvas) {
        super(piece.board)
        this.piece = piece
        this.canvas = canvas
    }

    init(ev) {
        let piece = this.piece
        const squares = [piece.square]

        if (piece.active || Game.toMove !== piece.color) {
            piece.board.showMoves(piece, [])
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

        piece.availableMoves = squares
        piece.board.showMoves(piece, squares)
    }

    kingMoves(piece) {
        const squares = [],
            squareTopLeft = this.findRelativeSquarePosition(piece, +1, +1),
            squareTopRight = this.findRelativeSquarePosition(piece, +1, -1),
            squareBotLeft = this.findRelativeSquarePosition(piece, -1, +1),
            squareBotRight = this.findRelativeSquarePosition(piece, -1, -1),
            squareLeft = this.findRelativeSquarePosition(piece, +1, 0),
            squareRight = this.findRelativeSquarePosition(piece, -1, 0),
            squareTop = this.findRelativeSquarePosition(piece, 0, +1),
            squareBot = this.findRelativeSquarePosition(piece, 0, -1)

        if (
            !piece.board.getPieceFromSquare(squareTopLeft) ||
            piece.board.getPieceFromSquare(squareTopLeft).color !== piece.color
        ) {
            squares.push(squareTopLeft)
        }
        if (
            !piece.board.getPieceFromSquare(squareTopRight) ||
            piece.board.getPieceFromSquare(squareTopRight).color !== piece.color
        ) {
            squares.push(squareTopRight)
        }
        if (
            !piece.board.getPieceFromSquare(squareBotLeft) ||
            piece.board.getPieceFromSquare(squareBotLeft).color !== piece.color
        ) {
            squares.push(squareBotLeft)
        }
        if (
            !piece.board.getPieceFromSquare(squareBotRight) ||
            piece.board.getPieceFromSquare(squareBotRight).color !== piece.color
        ) {
            squares.push(squareBotRight)
        }
        if (
            !piece.board.getPieceFromSquare(squareLeft) ||
            piece.board.getPieceFromSquare(squareLeft).color !== piece.color
        ) {
            squares.push(squareLeft)
        }
        if (
            !piece.board.getPieceFromSquare(squareRight) ||
            piece.board.getPieceFromSquare(squareRight).color !== piece.color
        ) {
            squares.push(squareRight)
        }
        if (
            !piece.board.getPieceFromSquare(squareTop) ||
            piece.board.getPieceFromSquare(squareTop).color !== piece.color
        ) {
            squares.push(squareTop)
        }
        if (
            !piece.board.getPieceFromSquare(squareBot) ||
            piece.board.getPieceFromSquare(squareBot).color !== piece.color
        ) {
            squares.push(squareBot)
        }

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

            if (continueLeft) {
                if (!piece.board.getPieceFromSquare(squareLeft)) {
                    squares.push(squareLeft)
                } else if (piece.board.getPieceFromSquare(squareLeft).color === piece.color) {
                    continueLeft = false
                } else {
                    squares.push(squareLeft)
                    continueLeft = false
                }
            }

            if (continueRight) {
                if (!piece.board.getPieceFromSquare(squareRight)) {
                    squares.push(squareRight)
                } else if (piece.board.getPieceFromSquare(squareRight).color === piece.color) {
                    continueRight = false
                } else {
                    squares.push(squareRight)
                    continueRight = false
                }
            }

            if (continueBack) {
                if (!piece.board.getPieceFromSquare(squareBack)) {
                    squares.push(squareBack)
                } else if (piece.board.getPieceFromSquare(squareBack).color === piece.color) {
                    continueBack = false
                } else {
                    squares.push(squareBack)
                    continueBack = false
                }
            }

            if (continueFwd) {
                if (!piece.board.getPieceFromSquare(squareFwd)) {
                    squares.push(squareFwd)
                } else if (piece.board.getPieceFromSquare(squareFwd).color === piece.color) {
                    continueFwd = false
                } else {
                    squares.push(squareFwd)
                    continueFwd = false
                }
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
            const squareTopLeft = this.findRelativeSquarePosition(piece, -(index), -(index)),
                squareTopRight = this.findRelativeSquarePosition(piece, +(index), +(index)),
                squareBotLeft = this.findRelativeSquarePosition(piece, -(index), +(index)),
                squareBotRight = this.findRelativeSquarePosition(piece, +(index), -(index))

            if (continueTopLeft) {
                if (!piece.board.getPieceFromSquare(squareTopLeft)) {
                    squares.push(squareTopLeft)
                } else if (piece.board.getPieceFromSquare(squareTopLeft).color === piece.color) {
                    continueTopLeft = false
                } else {
                    squares.push(squareTopLeft)
                    continueTopLeft = false
                }
            }

            if (continueTopRight) {
                if (!piece.board.getPieceFromSquare(squareTopRight)) {
                    squares.push(squareTopRight)
                } else if (piece.board.getPieceFromSquare(squareTopRight).color === piece.color) {
                    continueTopRight = false
                } else {
                    squares.push(squareTopRight)
                    continueTopRight = false
                }
            }

            if (continueBotLeft) {
                if (!piece.board.getPieceFromSquare(squareBotLeft)) {
                    squares.push(squareBotLeft)
                } else if (piece.board.getPieceFromSquare(squareBotLeft).color === piece.color) {
                    continueBotLeft = false
                } else {
                    squares.push(squareBotLeft)
                    continueBotLeft = false
                }
            }

            if (continueBotRight) {
                if (!piece.board.getPieceFromSquare(squareBotRight)) {
                    squares.push(squareBotRight)
                } else if (piece.board.getPieceFromSquare(squareBotRight).color === piece.color) {
                    continueBotRight = false
                } else {
                    squares.push(squareBotRight)
                    continueBotRight = false
                }
            }
        }

        return squares
    }

    knightMoves(piece) {
        const squares = [],
            square1 = this.findRelativeSquarePosition(piece, -2, +1),
            square2 = this.findRelativeSquarePosition(piece, -2, -1),
            square3 = this.findRelativeSquarePosition(piece, +2, +1),
            square4 = this.findRelativeSquarePosition(piece, +2, -1),
            square5 = this.findRelativeSquarePosition(piece, -1, +2),
            square6 = this.findRelativeSquarePosition(piece, -1, -2),
            square7 = this.findRelativeSquarePosition(piece, +1, +2),
            square8 = this.findRelativeSquarePosition(piece, +1, -2)

        if (piece.board.getPieceFromSquare(square1)?.color !== piece.color) squares.push(square1)
        if (piece.board.getPieceFromSquare(square2)?.color !== piece.color) squares.push(square2)
        if (piece.board.getPieceFromSquare(square3)?.color !== piece.color) squares.push(square3)
        if (piece.board.getPieceFromSquare(square4)?.color !== piece.color) squares.push(square4)
        if (piece.board.getPieceFromSquare(square5)?.color !== piece.color) squares.push(square5)
        if (piece.board.getPieceFromSquare(square6)?.color !== piece.color) squares.push(square6)
        if (piece.board.getPieceFromSquare(square7)?.color !== piece.color) squares.push(square7)
        if (piece.board.getPieceFromSquare(square8)?.color !== piece.color) squares.push(square8)

        return squares
    }

    pawnMoves(piece) {
        const squares = []

        if (piece.color === 'white') {
            const squareOne = this.findRelativeSquarePosition(piece, 0, -1),
                squareTwo = this.findRelativeSquarePosition(piece, 0, -2),
                squareTopRight = this.findRelativeSquarePosition(piece, -1, -1),
                squareTopLeft = this.findRelativeSquarePosition(piece, -1, -1)

            if (!piece.board.getPieceFromSquare(squareOne)) {
                squares.push(squareOne)

                if (
                    Object.keys(piece.moves).length === 0 &&
                    !piece.board.getPieceFromSquare(squareTwo)
                ) {
                    squares.push(squareTwo)
                }
            }

            if (piece.board.getPieceFromSquare(squareTopRight)?.color === 'black') squares.push(squareTopRight)
            if (piece.board.getPieceFromSquare(squareTopLeft)?.color === 'black') squares.push(squareTopLeft)

        } else {
            const squareOne = this.findRelativeSquarePosition(piece, 0, +1),
                squareTwo = this.findRelativeSquarePosition(piece, 0, +2),
                squareTopRight = this.findRelativeSquarePosition(piece, +1, +1),
                squareTopLeft = this.findRelativeSquarePosition(piece, -1, +1)

            if (!piece.board.getPieceFromSquare(squareOne)) {
                squares.push(squareOne)

                if (
                    Object.keys(piece.moves).length === 0 &&
                    !piece.board.getPieceFromSquare(squareTwo)
                ) {
                    squares.push(squareTwo)
                }
            }

            if (piece.board.getPieceFromSquare(squareTopRight)?.color === 'white') squares.push(squareTopRight)
            if (piece.board.getPieceFromSquare(squareTopLeft)?.color === 'white') squares.push(squareTopLeft)
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
