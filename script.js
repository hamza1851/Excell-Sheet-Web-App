const addressColCont = document.querySelector(".address-col-cont")
const addressRowCont = document.querySelector(".address-row-cont")
const cellsCont = document.querySelector(".cell-cont")
const addressBar = document.querySelector(".address-bar")
let row = 100
let col = 26

for (let i = 0; i < row; i++) {
  const addressCol = document.createElement("div")
  addressCol.classList.add("address-col")
  addressCol.innerText = i + 1
  addressColCont.appendChild(addressCol)
}

for (let j = 0; j < col; j++) {
  const addressRow = document.createElement("div")
  addressRow.classList.add("address-row")
  addressRow.innerText = String.fromCharCode(j + 65)
  addressRowCont.appendChild(addressRow)
}

for (let i = 0; i < row; i++) {
  const rowContainer = document.createElement("div")
  rowContainer.classList.add("row-cont")
  for (let j = 0; j < col; j++) {
    const cell = document.createElement("div")
    cell.setAttribute("class", "cell")
    cell.setAttribute("contenteditable", "true")
    // Adding ColID and RowID
    cell.setAttribute("spellcheck", "false")
    cell.setAttribute("rid", i)
    cell.setAttribute("cid", j)
    rowContainer.appendChild(cell)
    displayAddressBar(cell, i, j)
  }
  cellsCont.appendChild(rowContainer)
}

function displayAddressBar(cell, i, j) {
  cell.addEventListener("click", (e) => {
    let rowID = i + 1
    let colID = String.fromCharCode(j + 65)
    addressBar.value = `${colID}${rowID}`
  })
}
