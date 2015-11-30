// UTILS =======================================================================

var clamp = function(inputNum, _min, _max) {

  // Set defaults if not present.
  var min = _min;
  var max = _max;
  if (isNaN(min)) { min = -1; }
  if (isNaN(max)) { max = 1;  }

  return Math.min(Math.max(inputNum, min), max);
}



// GENRERATION =================================================================

var generateBaseTrendLayer = function(inputDataArray) {
  var baseTrendLayer = [];

  for (var dataIndex = 0; dataIndex < inputDataArray.length - 1; dataIndex++) {
    var leftData   = inputDataArray[dataIndex];
    var rightData  = inputDataArray[dataIndex + 1];

    var difference = rightData - leftData;
        difference = clamp(difference);

    baseTrendLayer.push(difference);
  }

  return baseTrendLayer;
}

var BEND = 'b';
var generateTrendLayer = function(priorTrendLayer) {
  var resultingTrendLayer = [];

  for (var dataIndex = 0; dataIndex < priorTrendLayer.length -1; dataIndex++) {
    var leftChild    = priorTrendLayer[dataIndex];
    var rightChild   = priorTrendLayer[dataIndex + 1];

    // BENDs overrule other sign changes.
    if (leftChild === BEND || rightChild === BEND) {
      resultingTrendLayer.push(BEND);
      continue;
    }

    // 0's are the weakest.
    if (leftChild === 0 && rightChild === 0) {
      resultingTrendLayer.push(0);
      continue;
    }

    // Alternations between +'s and -'s are considered BENDs.
    var summation  = rightChild + leftChild;
    if (summation === 0) {
      resultingTrendLayer.push(BEND);
      continue;
    }

    // Otherwise, push the agreeing sign.
    var agreeingSign = clamp(summation);
    resultingTrendLayer.push(agreeingSign);
  }

  return resultingTrendLayer;
}

var recursivelyBuildTrendLayers = function(groupedTrendLayers, depth) {
  // Base case.
  if (depth === 0) {
    return groupedTrendLayers;
  }

  // Action.
  var resultingLayer = generateTrendLayer(groupedTrendLayers[groupedTrendLayers.length - 1]);
  groupedTrendLayers.push(resultingLayer);

  // Recursion.
  return recursivelyBuildTrendLayers(groupedTrendLayers, depth - 1);
}



// SUMMATION ===================================================================

var sumSingleWindow = function(groupedTrendLayer, depth, baseIndex) {
  var singleWindowSum = 0;

  // First, loop through each requested level.
  for (var level = 0; level <= depth; level++) {
    var currentLevel = groupedTrendLayer[depth - level];

    // Add the correct segment in each level.
    for (var index = baseIndex; index <= baseIndex + level; index++) {
      if (currentLevel[index] === BEND) continue;
      singleWindowSum += currentLevel[index];
    }
  }

  return singleWindowSum;
}

var createTrendResults = function(groupedTrendLayer, windowSize) {
  var windowSizeOffset = windowSize - 2;
  var resultingArray = [];

  for (var windowIndex = 0; windowIndex < groupedTrendLayer[windowSizeOffset].length; windowIndex++) {
    var output = sumSingleWindow(groupedTrendLayer, windowSizeOffset, windowIndex);
    resultingArray.push(output);
  }

  return resultingArray;
}



// INTERFACE WITH PROBLEM ======================================================

var calculateTrends = function(inputDataArray, windowSize) {
  var baseLayer          = generateBaseTrendLayer(inputDataArray);
  var groupedTrendLayers = recursivelyBuildTrendLayers([baseLayer], windowSize - 2);
  var trendResults       = createTrendResults(groupedTrendLayers, windowSize);

  return trendResults;
}

process.stdin.resume();
process.stdin.setEncoding('ascii');

var input = "";
process.stdin.on('data', function(data) {
    input += data;
});

process.stdin.on('end', function() {
  var data = input.split(' ');
  for (var i = 0; i < data.length; i++) { data[i] = +data[i]; }

  // Processed data.
  var dataRange   = data[0];
  var windowSize  = data[1];
  var upvoteData = data.slice(3);

  // console.log(dataRange);
  // console.log(windowSize);
  // console.log(upvoteData);

  var resultingArray = calculateTrends(upvoteData, windowSize);
  for (var i = 0; i < resultingArray.length; i++) {
    console.log(resultingArray[i]);
  }
});



// EXPORTS =====================================================================

module.exports = {
  BEND: BEND,

  clamp: clamp,

  generateBaseTrendLayer: generateBaseTrendLayer,
  generateTrendLayer: generateTrendLayer,
  recursivelyBuildTrendLayers: recursivelyBuildTrendLayers,

  sumSingleWindow: sumSingleWindow,
  createTrendResults: createTrendResults,
  calculateTrends: calculateTrends
}
