const sheetFolderCont = document.querySelector(".sheet-folder-cont");
const addSheetBtn = document.querySelector(".sheet-add-icon");
addSheetBtn.addEventListener("click", (e) => {
  let sheet = document.createElement("div");
  sheet.setAttribute("class", "sheet-folder");

  let allSheetFolder = document.querySelectorAll(".sheet-folder");
  sheet.setAttribute("id", allSheetFolder.length);

  sheet.innerHTML = `
    <div class="sheet-content">Sheet ${allSheetFolder.length + 1}</div>
     `;

  sheetFolderCont.appendChild(sheet);
  sheet.scrollIntoView();
  createStorageDB();
  createGraphComponentMatrix();
  handleSheetActiveness(sheet);
  handleSheetRemoval(sheet);
  sheet.click();
});

function handleSheetRemoval(sheet) {
  sheet.addEventListener("mousedown", (e) => {
    if (e.button !== 2) return;

    let allSheetFolder = document.querySelectorAll(".sheet-folder");
    if (allSheetFolder.length === 1) {
      alert("The application need atleast one sheet!");
      return;
    }

    let response = confirm("Your sheet will be permanently removed");
    if (response === false) return;

    let sheetIdx = Number(sheet.getAttribute("id"));

    collectedStorageDB.splice(sheetIdx, 1);
    collctedGraphComponentMatrix.splice(sheetIdx, 1);

    sheet.remove();

    StorageDB = collectedStorageDB[0];
    handleSheetProp();
  });
}

function handleSheetUIRemoval(sheet) {
  sheet.remove();
  let allSheetFolder = document.querySelectorAll(".sheet-folder");
  for (let i = 0; i < allSheetFolder.length; i++) {
    allSheetFolder[i].setAttribute("id", i);
    let sheetContent = allSheetFolder[i].querySelector(".sheet-content");
    sheetContent.innerText = `Sheet ${i + 1}`;
    allSheetFolder.style.backgroundColor = "transparent";
  }
  allSheetFolder[i].style.backgroundColor = "#ced6e0";
}

function handleStorageDB(sheetIdx) {
  storageDB = collectedStorageDB[sheetIdx];
  graphComponentMatrix = collctedGraphComponentMatrix[sheetIdx];
}

function handleSheetProp() {
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
      cell.click();
    }
  }
  let firstCell = document.querySelector(".cell");
  firstCell.click();
  //   console.log(firstCell);
}

function handleSheetUI(sheet) {
  let allSheetFolder = document.querySelectorAll(".sheet-folder");
  for (let i = 0; i < allSheetFolder.length; i++) {
    allSheetFolder[i].style.backgroundColor = "transparent";
  }
  sheet.style.backgroundColor = "#ced6e0";
}

function handleSheetActiveness(sheet) {
  sheet.addEventListener("click", (e) => {
    let sheetIdx = Number(sheet.getAttribute("id"));
    handleStorageDB(sheetIdx);
    handleSheetProp();
    handleSheetUI(sheet);
  });
}

function createStorageDB() {
  let storageDB = [];

  for (let i = 0; i < row; i++) {
    let sheetRow = [];
    for (let j = 0; j < col; j++) {
      let cellProp = {
        bold: false,
        italics: false,
        underline: false,
        alignment: "left",
        fontFamily: "monospace",
        fontSize: "14",
        fontColorProp: "#000000",
        BGColorProp: "#ecf0f1",
        value: "",
        formula: "",
        children: [],
      };
      sheetRow.push(cellProp);
    }
    storageDB.push(sheetRow);
  }
  collectedStorageDB.push(storageDB);
}

function createGraphComponentMatrix() {
  let graphComponentMatrix = [];

  for (let i = 0; i < row; i++) {
    let rows = [];
    for (let j = 0; j < col; j++) {
      rows.push([]);
    }
    graphComponentMatrix.push(rows);
  }
  collctedGraphComponentMatrix.push(graphComponentMatrix);
}
