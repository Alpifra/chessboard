var createSquares = function (xNumber, yNumber) {

    var widthStep = chesssBoard.width / xNumber
    var heightStep = chesssBoard.height / yNumber

    var y = 0
    //definer a case number
    var caseNumb = yNumber

    // set that the board appear under the pieces
    ctx.globalCompositeOperation = 'destination-over'

    for (let i = 1; i <= yNumber; i++) {
        var x = 0

        for (let j = 1; j <= xNumber; j++) {

            if ((i + j) % 2 === 0) {
                //attribute the case number
                ctx.font = '10px sans-serif'
                ctx.fillStyle = darkColor
                ctx.fillText(((numberToAlphabet(j) + caseNumb).toLowerCase()), (x + 5), (y + 12))

                //color the case b-g
                ctx.fillStyle = lightColor
                ctx.fillRect(x, y, widthStep, heightStep)
            } else {
                ctx.font = '10px sans-serif'
                ctx.fillStyle = lightColor
                ctx.fillText(((numberToAlphabet(j) + caseNumb).toLowerCase()), (x + 5), (y + 12))

                ctx.fillStyle = darkColor
                ctx.fillRect(x, y, widthStep, heightStep)
            }

            x = x + widthStep
        }
        caseNumb--
        y = y + heightStep
    }

}

var numberToAlphabet = (val, tail = '') => {
    if (val <= 26) {
        return `${String.fromCharCode(val + 64)}${tail}`;
    }

    var remainder = val % 26 || 26;
    var division = Math.trunc(val / 26) - (remainder === 26 ? 1 : 0);

    return numberToAlphabet(division, `${String.fromCharCode(remainder + 64)}${tail}`);
}