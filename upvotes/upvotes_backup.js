// MAIN ========================================================================

// numOfDays  : number
// windowSize : number
// upvoteData : Array<number>
function getTrendResults(numOfDays, windowSize, upvoteData) {
  var trendHolder = [];
  getTrendsRecursively(upvoteData, windowSize - 1);

  var windowCount = numOfDays - windowSize + 1;
  for (var i = 0, i < windowCount, i++) {
    trendHolder[windowSize - 2][i]



    trendResults[i] =
  };

  return trendResults;
}



// DIFFERENCE SCAFFOLDING ======================================================

function getTrendsRecursively(inputArray, levelsRemaining) {
  // Base case.
  if (levelsRemaining <= 0) return;

  // Perform calculations.
  var resultingTrendArray = generateTrendLayer(inputArray);
  trendHolder.push(resultingTrendArray);

  // Call recursively on the next level.
  getTrendsRecursively(resultingTrendArray, levelsRemaining - 1);
}

// BEND will mark points of inflection for us. Unlike 0, this will highlight areas
// that are not continuous.
var BEND = 'b';
function generateTrendLayer(inputArray) {
  var trendLayer = [];
  var trendLayerLength = inputArray.length - 1;

  for (var trendElement = 0; trendElement < trendLayerLength, trendElement++) {
    var leftChild  = inputArray[trendElement];
    var rightChild = inputArray[trendElement + 1];

    // BENDs overrule other sign changes.
    if (leftChild === BEND || rightChild === BEND) {
      trendLayer.push(BEND);
      continue;
    }

    //
    var difference = rightChild - leftChild;
    if (difference !== 0) {
      trendLayer.push(BEND);
      continue;
    }





    trendLayer.push(Math.sign(difference));
  }

  return trendLayer;
}





// SUMMATION ===================================================================

function combineCounts(windowIndex, trendLevels) {
  trendLevels[trendLevels.length - 1];
}
