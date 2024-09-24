let state = [
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
    randomBox = abc[Math.floor(Math.random() * 8)]
    randomCell = Math.floor(Math.random() * 8)

    return randomBox+String(randomCell)
}

function cellCandiates(cellId) {
    let candiates = ['1','2','3','4','5','6','7','8','9']
    let box = cellId.split('')[0]

    // Remove candiates already present within cell
    for (let i = 0; i < 9; i++) {
        let compCell = document.getElementById(box+String(i))

        if (cellId !== compCell) {
            if (candiates.includes(compCell.value)) {
                candiates = removeItem(compCell.value, candiates)
            }
        }
    }

    //Remove candiates in rows

    return candiates
}

function genBoard() {

    const diagBoxes = 'aei'
    for (let i = 0; i < 3; i++) {
        let digits = [1,2,3,4,5,6,7,8,9]
        for (let j = 0; j < 9; j++) {
            let cellId = diagBoxes[i]+String(j)
            let index = Math.floor(Math.random()*digits.length)

            document.getElementById(cellId).value = digits[index]
            digits.splice(index, 1)
        }
    }
}

genBoard()