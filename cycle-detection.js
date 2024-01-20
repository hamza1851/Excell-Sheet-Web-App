// Storage
let collctedGraphComponentMatrix = [];

function isGraphCyclic(graphComponentMatrix) {
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

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      let response = dfsCyleDetection(
        graphComponentMatrix,
        i,
        j,
        visited,
        dfsVisited
      );
      if (response === true) return [i, j];
    }
  }
  return null;
}

// Start -> vis = true, dfs = true
// End -> dfs=false
// if(vis[i][j] === true) that means it's already explored so, go back
// if(vis === true && dfxVis === true) return true bcs it's cyclic
// Return -> true/false
// true = cyclic, false = Not Cyclic

function dfsCyleDetection(
  graphComponentMatrix,
  srcr,
  srcc,
  visited,
  dfsVisited
) {
  visited[srcr][srcc] = true;
  dfsVisited[srcr][srcc] = true;

  for (
    let children = 0;
    children < graphComponentMatrix[srcr][srcc].length;
    children++
  ) {
    let [nbrRid, nbrCid] = graphComponentMatrix[srcr][srcc][children];
    if (visited[nbrRid][nbrCid] === false) {
      let response = dfsCyleDetection(
        graphComponentMatrix,
        nbrRid,
        nbrCid,
        visited,
        dfsVisited
      );
      if (response === true) return true; // Found cycle so, return true
    } else if (
      visited[nbrRid][nbrCid] === true &&
      dfsVisited[nbrRid][nbrCid] === true
    ) {
      // if both vis[nbrRid][nbrCid] & dfsVis[nbrRid][nbrCid] are ture than means cycle exist so, return true
      return true;
    }
  }
  dfsVisited[srcr][srcc] = false;
  return false;
}
