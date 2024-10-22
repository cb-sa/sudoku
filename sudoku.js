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

var flagIncorrectCandidates = false
var selectedCell = 'a0'

const board = document.getElementById('game')


function duplicateExists(arr) {
    return new Set(arr).size !== arr.length
}
//https://stackoverflow.com/questions/49215358/checking-for-duplicate-strings-in-javascript-array

function updateNumbers(count) {
    for (let i = 0; i < 9; i++) {
        if (count[i] >= 9) {
            document.getElementById(i+1).classList.add('completed')
        } else {
            document.getElementById(i+1).classList.remove('completed')
        }
    }
}

document.getElementById('flagIncorrectCandidates').addEventListener('change', (event) => {
    flagIncorrectCandidates = event.target.checked

    if (flagIncorrectCandidates) {
        verifyNumbers()
    } else {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let cellId = abc[i]+String(j)
    
                document.getElementById(cellId).style.color = ''
            }
            document.getElementById(String(i)).classList.remove('completed')
        }
    }
    
})

function verifyNumbers() {
    if (flagIncorrectCandidates) {
        let count = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                let cellId = abc[i]+String(j)

                if (!document.getElementById(cellId).value == ''){
                    count[Number(document.getElementById(cellId).value)-1]++
                    if (!cellCandiates(cellId).includes(document.getElementById(cellId).value) && !document.getElementById(cellId).hasAttribute('readonly')) {
                        document.getElementById(cellId).style.color = 'red'
                    } else {
                        document.getElementById(cellId).style.color = ''
                    }
                }
            }
        }

        updateNumbers(count)
    }
}

const abc = 'abcdefghijklmnopqrstuvwxyz'

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

            document.getElementById(selectedCell).style.border = ''
            document.getElementById(selectedCell).style.height = ''
            document.getElementById(selectedCell).style.width = ''

            event.target.style.border = '0.1em solid CornflowerBlue'
            event.target.style.height = '1.8em'
            event.target.style.width = '1.8em'

            selectedCell = event.target.id
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

function cellCandiates(cellId) {
    let candiates = ['1','2','3','4','5','6','7','8','9']
    let box = cellId.split('')[0]
    let boxId = cellId.split('')[1]

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
    }

    //Board is now filled

    state = board2List()

    for (let i = 0; i < cluesRemoved; i++) {
        let cellId = randomId()

        document.getElementById(cellId).value = ''
        document.getElementById(cellId).readOnly = false
    }

}



fillBoard(51)