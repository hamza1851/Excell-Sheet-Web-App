function colorPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
}

async function isGraphCyclicTracePath(graphComponentMatrix, cyclicResponse) {
  let [srcr, srcc] = cyclicResponse;
  let visited = [];
  let dfsVisited = [];

  for (let i = 0; i < row; i++) {
    let visitedRow = [];
    let dfsVisitedRow = [];

    for (let j = 0; j < col; j++) {
      visitedRow.push(false);
      dfsVisitedRow.push(false);
    }
    visited.push(visitedRow);
    dfsVisited.push(dfsVisitedRow);
  }

  let response = await dfsCyleDetectionTracePath(
    graphComponentMatrix,
    srcr,
    srcc,
    visited,
    dfsVisited
  );

  if (response === true) return Promise.resolve(true);
  return Promise.resolve(false);
}

async function dfsCyleDetectionTracePath(
  graphComponentMatrix,
  srcr,
  srcc,
  visited,
  dfsVisited
) {
  visited[srcr][srcc] = true;
  dfsVisited[srcr][srcc] = true;

  let cell = document.querySelector(`.cell[rid="${srcr}"][cid="${srcc}"]`);

  cell.style.backgroundColor = "lightblue";
  await colorPromise();

  for (
    let children = 0;
    children < graphComponentMatrix[srcr][srcc].length;
    children++
  ) {
    let [nbrRid, nbrCid] = graphComponentMatrix[srcr][srcc][children];
    if (visited[nbrRid][nbrCid] === false) {
      let response = await dfsCyleDetectionTracePath(
        graphComponentMatrix,
        nbrRid,
        nbrCid,
        visited,
        dfsVisited
      );
      if (response === true) {
        cell.style.backgroundColor = "transparent";
        await colorPromise();
        return Promise.resolve(true);
      }
    } else if (
      visited[nbrRid][nbrCid] === true &&
      dfsVisited[nbrRid][nbrCid] === true
    ) {
      let cyclicCell = document.querySelector(
        `.cell[rid="${nbrRid}"][cid="${nbrCid}"]`
      );
      cyclicCell.style.backgroundColor = "lightsalmon";
      await colorPromise();
      cyclicCell.style.backgroundColor = "transparent";

      await colorPromise();
      cell.style.backgroundColor = "transparent";
      await colorPromise();

      return Promise.resolve(true);
    }
  }
  dfsVisited[srcr][srcc] = false;
  return Promise.resolve(false);
}
