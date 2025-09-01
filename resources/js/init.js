import { Board } from './Component/Board';
import { Piece } from './Component/Piece'
import { Game } from './Rules/Game'
import position from './position.json';

const setup = document.getElementById('setup')

setup.addEventListener('submit', (ev) => {
    ev.preventDefault()
    const formData = new FormData(setup)
    const xSquares = parseInt(formData.get('size'))
    const ySquares = xSquares
    const board_container = document.querySelector('.board-container')
    const canvas = document.getElementById('chessboard')

    // change display
    board_container.classList.remove('d-none')
    setup.classList.add('d-none')

    // init board
    let board = new Board(canvas, xSquares, ySquares)
    board.createSquares()

    // init black pieces
    position.black.pieces.map( (p) => {
        let piece = new Piece(p.name, board, p.square, 'black')
        board.pieces.push(piece)
        piece.render(board_container)
    })

    // init white pieces
    position.white.pieces.map( (p) => {
        let piece = new Piece(p.name, board, p.square, 'white')
        board.pieces.push(piece)
        piece.render(board_container)
    })

    new Game(board).init()

})

// temp for dev
document.getElementById('submitForm').click()
//
