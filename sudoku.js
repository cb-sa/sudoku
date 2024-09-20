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


for (let i = 0; i < 9; i++) {
    let newBox = document.createElement('div')
    newBox.id = 'b'+i
    newBox.className = 'box'
    for (let j = 0; j < 9; j++) {
        let newCell = document.createElement('div')
        let cellId = String(i)+String(j)

        newCell.id = cellId
        newCell.className = 'cell'
        newBox.appendChild(newCell)

        let newCellText = document.createElement('input')
        newCellText.type = 'text'
        newCellText.value = cellId
        newCell.appendChild(newCellText)
    }
    board.appendChild(newBox)
}

board.addEventListener('input', (event) => {
    if (event.data != null && event.data.match(/^\d$/)) {
        event.target.value = event.data
    }
    const regexNotDigit = /([^\d])/gi
    event.target.value = event.target.value.replaceAll(regexNotDigit, '')
})