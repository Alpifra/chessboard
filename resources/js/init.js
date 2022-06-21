import { Board } from './Components/Board.js';

const setup = document.getElementById('setup')

setup.addEventListener('submit', (ev) => {
    ev.preventDefault()
    const formData = new FormData(setup)
    const squares = formData.get('size')
    const canvas = document.getElementById('chessboard')

    // change display
    canvas.classList.remove('d-none')
    setup.classList.add('d-none')

    //init board
    let board = new Board(canvas, squares, squares)
    board.createSquares()
})