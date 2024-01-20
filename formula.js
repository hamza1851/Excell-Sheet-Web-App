let formulaBar = document.querySelector(".formula-bar");

for (let i = 0; i < row; i++) {
  for (let j = 0; j < col; j++) {
    let cell = document.querySelector(`.cell[rid="${i}"][cid="${j}"]`);
    cell.addEventListener("blur", (e) => {
      let address = addressBar.value;
      let [cell, activeCellProp] = activeCell(address);

      let enteredData = cell.innerText;
      if (enteredData === activeCellProp.value) {
        return;
      } else {
        activeCellProp.value = enteredData;
        removeChildFromParent(activeCellProp.formula);
        activeCellProp.formula = "";
        updateFormula(address);
      }
    });
  }
}

formulaBar.addEventListener("keydown", async (e) => {
  let enteredFormula = formulaBar.value;

  if (e.key === "Enter" && enteredFormula) {
    let address = addressBar.value;
    let [cell, cellProp] = activeCell(address);

    // Checking for change in entered formula and already existing formula in storageDB

    if (enteredFormula !== cellProp.formula) {
      removeChildFromParent(cellProp.formula);
    }

    // Adding child to graphComponent matrix
    addChildToGraphComponent(enteredFormula, address);
    // Checking Formula is Cyclic or not
    let cyclicResponse = isGraphCyclic(graphComponentMatrix);
    if (cyclicResponse) {
      let response = confirm(
        "Your formula is cyclic, Do you want to trace your path?"
      );
      while (response === true) {
        // Keep asking until user get satisfied
        await isGraphCyclicTracePath(graphComponentMatrix, cyclicResponse);
        response = confirm(
          "Your formula is cyclic, Do you want to trace your path?"
        );
      }
      removeChildFromGraphComponent(enteredFormula, address);
      return;
    }
    let evaluatedValue = evaluateFormula(enteredFormula);

    // Updating UI
    setUiChanges(evaluatedValue, enteredFormula, address);
    addChildToParent(enteredFormula); //Adding child in parent's child array
    console.log(storageDB);
    updateFormula(address);
  }
});

function addChildToGraphComponent(formula, childAddress) {
  let [crid, ccid] = decodeRIDCIDAddress(childAddress);

  formula = formula.replace(/([+\-*/()])/g, " $1 ");
  let encodedFormula = formula.split(" "); //Suppose formula= A1+B1, so it will become A1 + B1

  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    // If the formula contains alphabets the it will go inside the below code snippet
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [prid, pcid] = decodeRIDCIDAddress(encodedFormula[i]);
      // Now we are inserting the children Row&Col id inside the 2D matrix
      graphComponentMatrix[prid][pcid].push([crid, ccid]);
    }
  }
}

function removeChildFromGraphComponent(childCellFormula, childAddress) {
  // We don't need childAddress bcs we are using graphComponent 2D Matrix as Stack
  childCellFormula = childCellFormula.replace(/([+\-*/()])/g, " $1 ");
  let encodedFormula = childCellFormula.split(" ");

  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [prid, pcid] = decodeRIDCIDAddress(encodedFormula[i]);
      graphComponentMatrix[prid][pcid].pop();
    }
  }
}

function updateFormula(parentAddress) {
  // it takes address of the current cell
  let [parentCell, parentCellProp] = activeCell(parentAddress);
  let childArray = parentCellProp.children;
  for (let i = 0; i < childArray.length; i++) {
    let childAddress = childArray[i];
    let [childCell, childCellProp] = activeCell(childAddress);
    let childFormula = childCellProp.formula;

    let evaluatedValue = evaluateFormula(childFormula);
    setUiChanges(evaluatedValue, childFormula, childAddress);
    updateFormula(childAddress);
  }
}

function addChildToParent(enteredFormula) {
  enteredFormula = enteredFormula.replace(/([+\-*/()])/g, " $1 ");
  let encodedFormula = enteredFormula.split(" ");
  let childAddress = addressBar.value;

  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProp] = activeCell(encodedFormula[i]);
      parentCellProp.children.push(childAddress);
    }
  }
}

function removeChildFromParent(childCellFormula) {
  // Taking the formula of the cell and the removing the cell from it's parent's childArray
  childCellFormula = childCellFormula.replace(/([+\-*/()])/g, " $1 ");
  let encodedFormula = childCellFormula.split(" ");

  let childAddress = addressBar.value;

  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProp] = activeCell(encodedFormula[i]);
      let idx = parentCellProp.children.indexOf(childAddress);
      if (idx !== -1) {
        parentCellProp.children.splice(idx, 1);
      }
    }
  }
}

function evaluateFormula(formula) {
  formula = formula.replace(/([+\-*/()])/g, " $1 ");

  let encodedFormula = formula.split(" ");
  for (let i = 0; i < encodedFormula.length; i++) {
    let asciiValue = encodedFormula[i].charCodeAt(0);
    if (asciiValue >= 65 && asciiValue <= 90) {
      let [parentCell, parentCellProp] = activeCell(encodedFormula[i]);
      encodedFormula[i] = parentCellProp.value;
    }
  }
  let decodedFormula = encodedFormula.join(" ");
  let evaluatedValue = eval(decodedFormula);

  return evaluatedValue;
}

function setUiChanges(evaluatedValue, formula, address) {
  let [cell, activeCellProp] = activeCell(address);

  cell.innerText = evaluatedValue; //Updating UI
  // Updating DB
  activeCellProp.value = evaluatedValue;
  activeCellProp.formula = formula;
}
