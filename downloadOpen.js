const downloadBtn = document.querySelector(".download")
const openBtn = document.querySelector(".open")

downloadBtn.addEventListener("click", (e) => {
  let jsonData = JSON.stringify([storageDB, graphComponentMatrix])
  let file = new Blob([jsonData], { type: "application/json" })

  let a = document.createElement("a")
  a.href = URL.createObjectURL(file)
  a.download = "SheetData.json"
  a.click()
})

openBtn.addEventListener("click", (e) => {
  let input = document.createElement("input")
  input.setAttribute("type", "file")
  input.click()

  input.addEventListener("change", (e) => {
    let fileReader = new FileReader()
    let files = input.files
    let fileObj = files[0]

    fileReader.readAsText(fileObj)

    fileReader.addEventListener("load", (e) => {
      let readSheetData = JSON.parse(fileReader.result)

      //   Normal sheet wille be created but it will have nothing (default)
      addSheetBtn.click()

      storageDB = readSheetData[0]
      graphComponentMatrix = readSheetData[1]
      collectedStorageDB[collectedStorageDB.length - 1] = storageDB
      collctedGraphComponentMatrix[collctedGraphComponentMatrix.length - 1] =
        graphComponentMatrix

      handleSheetProp()
    })
  })
})
