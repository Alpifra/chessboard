import { Board } from './Component/Board';
import { Piece } from './Component/Piece'

const setup = document.getElementById('setup')

setup.addEventListener('submit', (ev) => {
    ev.preventDefault()
    const formData = new FormData(setup)
    const xSquares = parseInt(formData.get('size'))
    const ySquares = xSquares
    const squares = xSquares * ySquares
    const board_container = document.querySelector('.board-container')
    const canvas = document.getElementById('chessboard')

    // change display
    board_container.classList.remove('d-none')
    setup.classList.add('d-none')

    //init board
    let board = new Board(canvas, xSquares, ySquares)
    board.createSquares()

    //init pieces
    let pieces = {
        white: {
            pawn: [],
            rook: [],
            knight: [],
            bishop: [],
            queen: [],
            king: [],
        },
        black: {
            pawn: [],
            rook: [],
            knight: [],
            bishop: [],
            queen: [],
            king: [],
        }
    }

    for (let square = 1; square <= squares; square++) {

        if ( square === 1 || square === 8 ) {
            let piece = new Piece('rook', board, square, 'black')
            pieces.black.pawn.push(piece)
            piece.render(board_container)
            continue
        } else if ( square === 2 || square === 7 ) {
            let piece = new Piece('bishop', board, square, 'black')
            pieces.black.bishop.push(piece)
            piece.render(board_container)
            continue
        } else if ( square === 3 || square === 6 ) {
            let piece = new Piece('knight', board, square, 'black')
            pieces.black.knight.push(piece)
            piece.render(board_container)
            continue
        } else if ( square === 4 ) {
            let piece = new Piece('queen', board, square, 'black')
            pieces.black.queen.push(piece)
            piece.render(board_container)
            continue
        } else if ( square === 5 ) {
            let piece = new Piece('king', board, square, 'black')
            pieces.black.king.push(piece)
            piece.render(board_container)
            continue
        } else if ( 9 <= square && square <= 16 ) {
            let piece = new Piece('pawn', board, square, 'black')
            pieces.black.pawn.push(piece)
            piece.render(board_container)
            continue
        } else if ( 49 <= square && square <= 56 ) {
            let piece = new Piece('pawn', board, square, 'white')
            pieces.white.pawn.push(piece)
            piece.render(board_container)
            continue
        } else if ( square === 57 || square === 64 ) {
            let piece = new Piece('rook', board, square, 'white')
            pieces.white.rook.push(piece)
            piece.render(board_container)
            continue
        } else if ( square === 58 || square === 63 ) {
            let piece = new Piece('bishop', board, square, 'white')
            pieces.white.bishop.push(piece)
            piece.render(board_container)
            continue
        } else if ( square === 59 || square === 62 ) {
            let piece = new Piece('knight', board, square, 'white')
            pieces.white.knight.push(piece)
            piece.render(board_container)
            continue
        } else if ( square === 60 ) {
            let piece = new Piece('queen', board, square, 'white')
            pieces.white.queen.push(piece)
            piece.render(board_container)
            continue
        } else if ( square === 61 ) {
            let piece = new Piece('king', board, square, 'white')
            pieces.white.king.push(piece)
            piece.render(board_container)
            continue
        }

    }

})

// temp for dev
document.getElementById('submitForm').click()
//