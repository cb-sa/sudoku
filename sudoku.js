var state = [
    [
        undefined, undefined, undefined,
        undefined, undefined, undefined,
        undefined, undefined, undefined
    ], [
        undefined, undefined, undefined,
        undefined, undefined, undefined,
        undefined, undefined, undefined
    ], [
        undefined, undefined, undefined,
        undefined, undefined, undefined,
        undefined, undefined, undefined
    ],
    [
        undefined, undefined, undefined,
        undefined, undefined, undefined,
        undefined, undefined, undefined
    ], [
        undefined, undefined, undefined,
        undefined, undefined, undefined,
        undefined, undefined, undefined,
    ], [
        undefined, undefined, undefined,
        undefined, undefined, undefined,
        undefined, undefined, undefined
    ],
    [
        undefined, undefined, undefined,
        undefined, undefined, undefined,
        undefined, undefined, undefined
    ], [
        undefined, undefined, undefined,
        undefined, undefined, undefined,
        undefined, undefined, undefined
    ], [
        undefined, undefined, undefined,
        undefined, undefined, undefined,
        undefined, undefined, undefined
    ]
]

var selectedCell = 'e4'

const board = document.getElementById('game')

var settings = document.getElementById('settings')

const boardIdLUT = [
    ['a0', 'a1', 'a2', 'b0', 'b1', 'b2', 'c0', 'c1', 'c2'],
    ['a3', 'a4', 'a5', 'b3', 'b4', 'b5', 'c3', 'c4', 'c5'],
    ['a6', 'a7', 'a8', 'b6', 'b7', 'b8', 'c6', 'c7', 'c8'],
    ['d0', 'd1', 'd2', 'e0', 'e1', 'e2', 'f0', 'f1', 'f2'],
    ['d3', 'd4', 'd5', 'e3', 'e4', 'e5', 'f3', 'f4', 'f5'],
    ['d6', 'd7', 'd8', 'e6', 'e7', 'e8', 'f6', 'f7', 'f8'],
    ['g0', 'g1', 'g2', 'h0', 'h1', 'h2', 'i0', 'i1', 'i2'],
    ['g3', 'g4', 'g5', 'h3', 'h4', 'h5', 'i3', 'i4', 'i5'],
    ['g6', 'g7', 'g8', 'h6', 'h7', 'h8', 'i6', 'i7', 'i8']
]

const abc = 'abcdefghijklmnopqrstuvwxyz'

function duplicateExists(arr) {
    return new Set(arr).size !== arr.length
}
//https://stackoverflow.com/questions/49215358/checking-for-duplicate-strings-in-javascript-array

function updateNumbers(count) {
    for (let i = 0; i < 9; i++) {
        if (count[i] == 9) {
            document.getElementById(i+1).classList.add('completed')
            document.getElementById(i+1).classList.remove('overfilled')
        } else if (count[i] > 9) {
            document.getElementById(i+1).classList.add('overfilled')
            document.getElementById(i+1).classList.remove('completed')
        } else {
            document.getElementById(i+1).classList.remove('completed')
            document.getElementById(i+1).classList.remove('overfilled')
        }
    }
}

function initSettings() {
    var flagContradictions = document.getElementById('flagContradictions').checked
    var showNumbersAmount = document.getElementById('showNumbersAmount').checked

    document.getElementById('flagContradictions').addEventListener('change', (event) => {
        flagContradictions = event.target.checked

        if (flagContradictions) {
            verifyNumbers()
        } else {
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    let cellId = abc[i]+String(j)
        
                    document.getElementById(cellId).style.color = ''
                }
            }
        }
        
    })

    document.getElementById('showNumbersAmount').addEventListener('change', (event) => {
        showNumbersAmount = event.target.checked

        if (showNumbersAmount) {
            document.getElementById('numbers').style.display = '';
        } else {
            document.getElementById('numbers').style.display = 'none'
        }
    })

    if (showNumbersAmount) {
        document.getElementById('numbers').style.display = '';
    } else {
        document.getElementById('numbers').style.display = 'none'
    }
}

function verifyNumbers() {
    let count = [0, 0, 0, 0, 0, 0, 0, 0, 0]

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let cellId = abc[i]+String(j)

            if (!document.getElementById(cellId).value == ''){
                count[Number(document.getElementById(cellId).value)-1]++
                if (flagContradictions) {
                    if (!cellCandiates(cellId).includes(document.getElementById(cellId).value) && !document.getElementById(cellId).hasAttribute('readonly')) {
                        document.getElementById(cellId).style.color = 'red'
                    } else {
                        document.getElementById(cellId).style.color = ''
                    }
                }
            }
        }
    }
    updateNumbers(count)
    

    // Win detection
    gameWon = true

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let cellId = abc[i]+String(j)
            if (!document.getElementById(cellId).value == ''){
                count[Number(document.getElementById(cellId).value)-1]++
                if (!cellCandiates(cellId).includes(document.getElementById(cellId).value) && !document.getElementById(cellId).hasAttribute('readonly')) {
                    gameWon = false
                }
            } else {
                gameWon = false
            }
        }
    }

    if (gameWon) {
        if (confirm('You won!\nNew game?')) {
            fillBoard(51)
        }
    }
}

function updateSelectedCell(newCell) {
    document.getElementById(selectedCell).style.border = ''
    document.getElementById(selectedCell).style.height = ''
    document.getElementById(selectedCell).style.width = ''

    document.getElementById(newCell).style.border = '0.1em solid CornflowerBlue'
    document.getElementById(newCell).style.height = '1.8em'
    document.getElementById(newCell).style.width = '1.8em'

    selectedCell = newCell
    document.getElementById(selectedCell).focus()
}

for (let i = 0; i < 9; i++) {
    let newBox = document.createElement('div')
    newBox.className = 'box'
    for (let j = 0; j < 9; j++) {
        let newCell = document.createElement('input')
        let cellId = abc[i]+String(j)

        newCell.className = 'cell'
        newCell.id = cellId
        newBox.appendChild(newCell)

        newCell.addEventListener('click', (event) => {
            console.log(event.target.id)

            updateSelectedCell(event.target.id)
        })
    }
    board.appendChild(newBox)
}

for (let i = 0; i < 10; i++) {
    let numberButton = document.getElementById(String(i))
    numberButton.addEventListener('click', (event) => {
        console.log(event.target.id)
        
        if (!document.getElementById(selectedCell).readOnly) {
            document.getElementById(selectedCell).value = ((event.target.id == 0) ? '' : event.target.id)
            verifyNumbers()
        }
    })
}

board.addEventListener('input', (event) => {
    if (event.data != null && event.data.match(/^[1-9]$/)) {
        event.target.value = event.data
    }
    const regexNotDigit = /([^1-9])/gi
    event.target.value = event.target.value.replaceAll(regexNotDigit, '')

    verifyNumbers()
})

initSettings()

function removeItem(item, array) {
    let index = array.indexOf(item)
    if (index > -1) {
        array.splice(index, 1)
    }

    return array
}
//https://stackoverflow.com/questions/5767325/how-can-i-remove-a-specific-item-from-an-array-in-javascript

function randomId() {
    randomBox = abc[Math.floor(Math.random() * 9)]
    randomCell = Math.floor(Math.random() * 9)

    return randomBox+String(randomCell)
}

function cell2Coord(cellId) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (boardIdLUT[i][j] == cellId) {
                return [i,j]
            } 
        }
    }
}

function coord2Cell(x, y) {
    return boardIdLUT[x][y]
}

function shiftSelectedUp() {
    cellCoord = cell2Coord(selectedCell)

    updateSelectedCell(coord2Cell(cellCoord[0]-1, cellCoord[1]))
}

function shiftSelectedRight() {
    cellCoord = cell2Coord(selectedCell)

    updateSelectedCell(coord2Cell(cellCoord[0], cellCoord[1]+1))
}

function shiftSelectedDown() {
    cellCoord = cell2Coord(selectedCell)

    updateSelectedCell(coord2Cell(cellCoord[0]+1, cellCoord[1]))
}

function shiftSelectedLeft() {
    cellCoord = cell2Coord(selectedCell)

    updateSelectedCell(coord2Cell(cellCoord[0], cellCoord[1]-1))
}

function cellCandiates(cellId) {
    let candiates = ['1','2','3','4','5','6','7','8','9']
    let box = cellId[0]
    let boxId = cellId[1]

    // Remove candiates already present within cell
    for (let i = 0; i < 9; i++) {
        let compCell = document.getElementById(box+String(i))

        if (cellId !== compCell.id) {
            if (candiates.includes(compCell.value)) {
                candiates = removeItem(compCell.value, candiates)
            }
        }
    }

    //Remove candiates in bands (horizontal)
    
    const band1 = ['a','b','c']
    const band2 = ['d','e','f']
    const band3 = ['g','h','i']

    let bands = []

    if (band1.includes(box)) {
        bands = removeItem(box, band1)
    } else if (band2.includes(box)) {
        bands = removeItem(box, band2)
    } else if (band3.includes(box)) {
        bands = removeItem(box, band3)
    }

    let boxY = (boxId-boxId%3)

    for (let i = 0; i < bands.length; i++) {
        for (let j = 0; j < 3; j++) {
            compCell = document.getElementById(bands[i]+String(boxY+j))

            if (candiates.includes(compCell.value)) {
                candiates = removeItem(compCell.value, candiates)
            }
        }
    }

    //Remove candiates in stacks (vertical)

    const stack1 = ['a','d','g']
    const stack2 = ['b','e','h']
    const stack3 = ['c','f','i']

    let stacks = []

    if (stack1.includes(box)) {
        stacks = removeItem(box, stack1)
    } else if (stack2.includes(box)) {
        stacks = removeItem(box, stack2)
    } else if (stack3.includes(box)) {
        stacks = removeItem(box, stack3)
    }

    let boxX = boxId%3

    for (let i = 0; i < stacks.length; i++) {
        for (let j = 0; j < 3; j++) {
            compCell = document.getElementById(stacks[i]+String(boxX+(j*3)))

            if (candiates.includes(compCell.value)) {
                candiates = removeItem(compCell.value, candiates)
            }
        }
    }

    return candiates
}

function board2List() {
    let returnArray =  [
        [
            undefined, undefined, undefined,
            undefined, undefined, undefined,
            undefined, undefined, undefined
        ], [
            undefined, undefined, undefined,
            undefined, undefined, undefined,
            undefined, undefined, undefined
        ], [
            undefined, undefined, undefined,
            undefined, undefined, undefined,
            undefined, undefined, undefined
        ],
        [
            undefined, undefined, undefined,
            undefined, undefined, undefined,
            undefined, undefined, undefined
        ], [
            undefined, undefined, undefined,
            undefined, undefined, undefined,
            undefined, undefined, undefined,
        ], [
            undefined, undefined, undefined,
            undefined, undefined, undefined,
            undefined, undefined, undefined
        ],
        [
            undefined, undefined, undefined,
            undefined, undefined, undefined,
            undefined, undefined, undefined
        ], [
            undefined, undefined, undefined,
            undefined, undefined, undefined,
            undefined, undefined, undefined
        ], [
            undefined, undefined, undefined,
            undefined, undefined, undefined,
            undefined, undefined, undefined
        ]
    ]
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let cellId = abc[i]+String(j)

            returnArray[i][j] = document.getElementById(cellId).value
            return returnArray
        }
    }
}

function list2Board(array) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let cellId = abc[i]+String(j)

            document.getElementById(cellId).value = array[i][j]
        }
    }
}



function fillBoard(cluesRemoved) {

    //Empty board before
    for (let k = 0; k < 9; k++) {
        for (let l = 0; l < 9; l++) {
            document.getElementById(abc[k]+String(l)).value = ''
        }
    }

    let iterations = 0
    let validBoard = false

    boardLoop:
    while (validBoard == false) {
        iterations += 1

        console.log(iterations)
        //Loop through board filling in candidates
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let cellId = abc[i]+String(j)
                let candiates = cellCandiates(cellId)

                if (candiates.length !== 0) {
                    //Fill cell
                    let newValue = candiates[Math.floor(Math.random()*candiates.length)]
                    document.getElementById(cellId).value = newValue
                    document.getElementById(cellId).readOnly = true

                } else {
                    //Cell cannot be filled, reset and try again
                    for (let k = 0; k < 9; k++) {
                        for (let l = 0; l < 9; l++) {
                            document.getElementById(abc[k]+String(l)).value = ''
                        }
                    }
                    continue boardLoop
                }
            }
        }

        console.log('Valid board found!')
        validBoard = true
        hideSettings()
    }

    //Board is now filled

    state = board2List()

    for (let i = 0; i < cluesRemoved; i++) {
        let cellId = randomId()

        document.getElementById(cellId).value = ''
        document.getElementById(cellId).readOnly = false
    }

}

function displaySettings() {
    settings.showModal()    
}

function hideSettings() {
    settings.close()
}

settings.addEventListener('click', (event) => {
    if (event.target.dataset.safe != 'true') {
        hideSettings();
    }
});

updateSelectedCell('e4')

fillBoard(51)

board.addEventListener('keydown', (event) => {
    if (event.code == 'ArrowUp') {
        shiftSelectedUp()
    } else if (event.code == 'ArrowRight') {
        shiftSelectedRight()
    } else if (event.code == 'ArrowDown') {
        shiftSelectedDown()
    } else if (event.code == 'ArrowLeft') {
        shiftSelectedLeft()
    }
})

//Arrow keys to move around

/*

a0 a1 a2 b0 b1 b2 c0 c1 c2
a3 a4 a5 b3 b4 b5 c3 c4 c5
a6 a7 a8 b6 b7 b8 c6 c7 c8
d0 d1 d2 e0 e1 e2 f0 f1 f2
d3 d4 d5 e3 e4 e5 f3 f4 f5
d6 d7 d8 e6 e7 e8 f6 f7 f8
g0 g1 g2 h0 h1 h2 i0 i1 i2
g3 g4 g5 h3 h4 h5 i3 i4 i5
g6 g7 g8 h6 h7 h8 i6 i7 i8

*/