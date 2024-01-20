let ctrlKey;

document.addEventListener("keydown", (e) => {
  ctrlKey = e.ctrlKey;
});

document.addEventListener("keyup", (e) => {
  ctrlKey = e.ctrlKey;
});

for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
    handleCutCopySelection(cell);
  }
}

const cutBtn = document.querySelector("#cut");
const copyBtn = document.querySelector("#copy");
const pasteBtn = document.querySelector("#paste");

let rangeStorage = [];
function handleCutCopySelection(cell) {
  cell.addEventListener("click", (e) => {
    if (!ctrlKey) return;
    if (rangeStorage.length >= 2) {
      defaultSelectionUI();
      rangeStorage = [];
    }

    cell.style.border = "3px solid #218e74";

    let rid = Number(cell.getAttribute("rid"));
    let cid = Number(cell.getAttribute("cid"));

    rangeStorage.push([rid, cid]);
    console.log(rangeStorage);
  });
}

function defaultSelectionUI() {
  for (let i = 0; i < rangeStorage.length; i++) {
    let cell = document.querySelector(
      `.cell[rid="${rangeStorage[i][0]}"][cid="${rangeStorage[i][1]}"]`
    );
    cell.style.border = "1px solid lightgrey";
  }
}

let copyData = [];
copyBtn.addEventListener("click", (e) => {
  if (rangeStorage.length < 2) return;
  copyData = [];

  let stRow = rangeStorage[0][0];
  let stCol = rangeStorage[0][1];
  let endRow = rangeStorage[1][0];
  let endCol = rangeStorage[1][1];

  for (let i = stRow; i <= endRow; i++) {
    let copyRow = [];
    for (let j = stCol; j <= endCol; j++) {
      let cellProp = storageDB[i][j];
      copyRow.push(cellProp);
    }
    copyData.push(copyRow);
  }
  console.log(copyData);
  defaultSelectionUI();
});

cutBtn.addEventListener("click", (e) => {
  if (rangeStorage.length < 2) return;

  let stRow = rangeStorage[0][0];
  let stCol = rangeStorage[0][1];
  let endRow = rangeStorage[1][0];
  let endCol = rangeStorage[1][1];

  for (let i = stRow; i <= endRow; i++) {
    for (let j = stCol; j <= endCol; j++) {
      let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
      //   DB Changes
      let cellProp = storageDB[i][j];
      cellProp.bold = false;
      cellProp.italics = false;
      cellProp.underline = false;
      cellProp.alingment = "left";
      cellProp.fontFamily = "monospace";
      cellProp.fontSize = "14";
      cellProp.fontColorProp = "#000000";
      cellProp.BGColorProp = "#ecf0f1";
      cellProp.value = "";

      cell.click();
    }
  }
  //   Updating the UI
  defaultSelectionUI();
});

pasteBtn.addEventListener("click", (e) => {
  //    Pasting cells data
  if (rangeStorage.length < 2) return;
  let rowDiff = Math.abs(rangeStorage[0][0] - rangeStorage[1][0]);
  let colDiff = Math.abs(rangeStorage[0][1] - rangeStorage[1][1]);

  //   Target where you want to paste the data
  let address = addressBar.value;
  let [stRow, stCol] = decodeRIDCIDAddress(address);

  for (let i = stRow, r = 0; i <= stRow + rowDiff; i++, r++) {
    for (let j = stCol, c = 0; j <= stCol + colDiff; j++, c++) {
      let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
      if (!cell) continue;

      let data = copyData[r][c];
      let cellProp = storageDB[i][j];

      cellProp.bold = data.bold;
      cellProp.italics = data.italics;
      cellProp.underline = data.underline;
      cellProp.alingment = data.alingment;
      cellProp.fontFamily = data.fontFamily;
      cellProp.fontSize = data.fontSize;
      cellProp.fontColorProp = data.fontColorProp;
      cellProp.BGColorProp = data.BGColorProp;
      cellProp.value = data.value;

      //   Updating UI
      cell.click();
    }
  }
});
