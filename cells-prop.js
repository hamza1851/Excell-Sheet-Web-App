// Multiple sheets will be stored in collectedStorageDB
let collectedStorageDB = []

{
  const addSheetBtn = document.querySelector(".sheet-add-icon")
  addSheetBtn.click() //this is done to add one sheet by default in the app
}

let fontFamily = document.querySelector("#fonts")
let fontSize = document.querySelector("#font-size")
let bold = document.querySelector(".bold")
let italics = document.querySelector(".italics")
let underline = document.querySelector(".underline")
let alignment = document.querySelectorAll(".alignment")
let alignLeft = alignment[0]
let alignCenter = alignment[1]
let alignRight = alignment[2]
let fontColor = document.querySelector(".font-color-prop")
let BgColor = document.querySelector(".BGcolor-prop")

let activeBgColor = "#d1d8e0"
let inactiveBgColor = "#ecf0f1"

bold.addEventListener("click", (e) => {
  let address = addressBar.value
  let [cell, cellProp] = activeCell(address)
  cellProp.bold = !cellProp.bold //StorageDB changed
  cell.style.fontWeight = cellProp.bold ? "bold" : "normal" // Style Apllied
  bold.style.backgroundColor = cellProp.bold ? activeBgColor : inactiveBgColor //Icon Bg Changed
})

italics.addEventListener("click", (e) => {
  let address = addressBar.value
  let [cell, cellProp] = activeCell(address)

  cellProp.italics = !cellProp.italics //StorageDB changed
  cell.style.fontStyle = cellProp.italics ? "italic" : "normal" // Style Apllied
  italics.style.backgroundColor = cellProp.italics
    ? activeBgColor
    : inactiveBgColor //Icon Bg Changed
})

underline.addEventListener("click", (e) => {
  let address = addressBar.value
  let [cell, cellProp] = activeCell(address)
  cellProp.underline = !cellProp.underline //StorageDB changed
  cell.style.textDecoration = cellProp.underline ? "underline" : "none" // Style Apllied
  underline.style.backgroundColor = cellProp.underline
    ? activeBgColor
    : inactiveBgColor //Icon Bg Changed
})

// ALignment of text in the cell
alignment.forEach((alignEle) => {
  alignEle.addEventListener("click", (e) => {
    let address = addressBar.value
    let [cell, cellProp] = activeCell(address)

    let alignValue = e.target.classList[0]
    cellProp.alignment = alignValue
    cell.style.textAlign = cellProp.alignment

    switch (alignValue) {
      case "left":
        alignLeft.style.backgroundColor = activeBgColor
        alignCenter.style.backgroundColor = inactiveBgColor
        alignRight.style.backgroundColor = inactiveBgColor
        break
      case "center":
        alignLeft.style.backgroundColor = inactiveBgColor
        alignCenter.style.backgroundColor = activeBgColor
        alignRight.style.backgroundColor = inactiveBgColor
        break
      case "right":
        alignLeft.style.backgroundColor = inactiveBgColor
        alignCenter.style.backgroundColor = inactiveBgColor
        alignRight.style.backgroundColor = activeBgColor
        break
    }
  })
})

fontSize.addEventListener("change", (e) => {
  let address = addressBar.value
  let [cell, cellProp] = activeCell(address)

  cellProp.fontSize = fontSize.value //StorageDB changed
  cell.style.fontSize = cellProp.fontSize + "px"
  fontSize.value = cellProp.fontSize
})

fontFamily.addEventListener("change", (e) => {
  let address = addressBar.value
  let [cell, cellProp] = activeCell(address)

  cellProp.fontFamily = fontFamily.value //StorageDB changed
  cell.style.fontFamily = cellProp.fontFamily // Style Apllied
  fontFamily.value = cellProp.fontFamily
})

fontColor.addEventListener("change", (e) => {
  let address = addressBar.value
  let [cell, cellProp] = activeCell(address)

  cellProp.fontColorProp = fontColor.value //StorageDB changed
  cell.style.color = cellProp.fontColorProp // Style Apllied
  fontColor.value = cellProp.fontColorProp
})

BgColor.addEventListener("change", (e) => {
  let address = addressBar.value
  let [cell, cellProp] = activeCell(address)

  cellProp.BGColorProp = BgColor.value //StorageDB changed
  cell.style.backgroundColor = cellProp.BGColorProp // Style Apllied
  BgColor.value = cellProp.BGColorProp
})

// For Setting Icons Active Or Inactive On the basis of the cellProp

let allCells = document.querySelectorAll(".cell")
for (let i = 0; i < allCells.length; i++) {
  displayCellActiveInactive(allCells[i])
}

function displayCellActiveInactive(cell) {
  cell.addEventListener("click", (e) => {
    let address = addressBar.value
    let [cell, cellProp] = activeCell(address)

    cell.style.fontWeight = cellProp.bold ? "bold" : "normal" // Style Apllied
    cell.style.fontStyle = cellProp.italics ? "italic" : "normal" // Style Apllied
    cell.style.textDecoration = cellProp.underline ? "underline" : "none" // Style Apllied
    cell.style.fontSize = cellProp.fontSize + "px"
    cell.style.fontFamily = cellProp.fontFamily // Style Apllied
    cell.style.color = cellProp.fontColor // Style Apllied
    cell.style.backgroundColor = cellProp.BGColorProp // Style Apllied
    cell.style.textAlign = cellProp.alignment

    // Applying UI Changes
    bold.style.backgroundColor = cellProp.bold ? activeBgColor : inactiveBgColor //Icon Bg Changed
    italics.style.backgroundColor = cellProp.italics
      ? activeBgColor
      : inactiveBgColor //Icon Bg Changed
    underline.style.backgroundColor = cellProp.underline
      ? activeBgColor
      : inactiveBgColor //Icon Bg Changed

    fontSize.value = cellProp.fontSize
    fontFamily.value = cellProp.fontFamily
    fontColor.value = cellProp.fontColorProp

    BgColor.value = cellProp.BGColorProp

    switch (cellProp.alignment) {
      case "left":
        alignLeft.style.backgroundColor = activeBgColor
        alignCenter.style.backgroundColor = inactiveBgColor
        alignRight.style.backgroundColor = inactiveBgColor
        break
      case "center":
        alignLeft.style.backgroundColor = inactiveBgColor
        alignCenter.style.backgroundColor = activeBgColor
        alignRight.style.backgroundColor = inactiveBgColor
        break
      case "right":
        alignLeft.style.backgroundColor = inactiveBgColor
        alignCenter.style.backgroundColor = inactiveBgColor
        alignRight.style.backgroundColor = activeBgColor
        break
    }
    let formulaBar = document.querySelector(".formula-bar")
    formulaBar.value = cellProp.formula
    cell.innerText = cellProp.value
  })
}

function activeCell(address) {
  let [rid, cid] = decodeRIDCIDAddress(address)
  let cell = document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`)
  let cellProp = storageDB[rid][cid]

  return [cell, cellProp]
}

function decodeRIDCIDAddress(address) {
  let rid = Number(address.slice(1) - 1)
  let cid = Number(address.charCodeAt(0) - 65)

  return [rid, cid]
}
