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

const board = document.getElementById('game')


function duplicateExists(arr) {
    return new Set(arr).size !== arr.length
}
//https://stackoverflow.com/questions/49215358/checking-for-duplicate-strings-in-javascript-array

function winDetection() {
    for (let i = 0; i < 9; i++) {
        let boxArray = []
        for (let j = 0; j < 9; j++) {
            let cellId = abc[i]+String(j)
            let currentCell = document.getElementById(cellId)

            boxArray.push(currentCell.value)
            
            if (duplicateExists(boxArray)) {
                console.log(`Invaild Cell: ${currentCell.id}`)
            }
        }
    }
}

const abc = 'abcdefghijklmnopqrstuvwxyz'

for (let i = 0; i < 9; i++) {
    let newBox = document.createElement('div')
    newBox.id = 'b'+i
    newBox.className = 'box'
    for (let j = 0; j < 9; j++) {
        let newCell = document.createElement('div')
        let cellId = abc[i]+String(j)

        newCell.className = 'cell'
        newBox.appendChild(newCell)

        let newCellText = document.createElement('input')
        newCellText.type = 'text'
        newCellText.id = cellId
        newCell.appendChild(newCellText)
    }
    board.appendChild(newBox)
}

board.addEventListener('input', (event) => {
    if (event.data != null && event.data.match(/^[1-9]$/)) {
        event.target.value = event.data
    }
    const regexNotDigit = /([^1-9])/gi
    event.target.value = event.target.value.replaceAll(regexNotDigit, '')

    winDetection()
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
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let cellId = abc[i]+String(j)

            state[i][j] = document.getElementById(cellId).value
        }
    }
}

function list2Board() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let cellId = abc[i]+String(j)

            document.getElementById(cellId).value = state[i][j]
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

    board2List()

    for (let i = 0; i < cluesRemoved; i++) {
        let cellId = randomId()

        document.getElementById(cellId).value = ''
        document.getElementById(cellId).readOnly = false
    }

}



fillBoard(51)