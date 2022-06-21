export class Board {
    constructor(chessBoard, xNumber, yNumber) {

        this.chessBoard = chessBoard
        this.xNumber = xNumber
        this.yNumber = yNumber

    }

    createSquares = function () {

        const widthStep = this.chessBoard.width / this.xNumber
        const heightStep = this.chessBoard.height / this.yNumber
        const ctx = this.chessBoard.getContext('2d')
        const darkColor = '#141e30'
        const lightColor = '#a5beeb'

        let y = 0,
            caseNumb = this.yNumber

        // set that the board appear under the pieces
        ctx.globalCompositeOperation = 'destination-over'

        for (let i = 1; i <= this.yNumber; i++) {
            let x = 0

            for (let j = 1; j <= this.xNumber; j++) {

                let cell = (String.fromCharCode(j + 64) + caseNumb).toLowerCase()

                if ((i + j) % 2 === 0) {
                    //attribute the case number
                    ctx.font = '10px sans-serif'
                    ctx.fillStyle = darkColor
                    ctx.fillText(cell, (x + 5), (y + 12))

                    //color the case b-g
                    ctx.fillStyle = lightColor
                    ctx.fillRect(x, y, widthStep, heightStep)
                } else {
                    ctx.font = '10px sans-serif'
                    ctx.fillStyle = lightColor
                    ctx.fillText(cell, (x + 5), (y + 12))

                    ctx.fillStyle = darkColor
                    ctx.fillRect(x, y, widthStep, heightStep)
                }

                x = x + widthStep
            }
            caseNumb--
            y = y + heightStep
        }

    }
}