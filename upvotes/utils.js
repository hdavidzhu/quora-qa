exports.clamp = function(inputNum, _min, _max) {

  // Set defaults if not present.
  var min = _min;
  var max = _max;
  if (isNaN(min)) { min = -1; }
  if (isNaN(max)) { max = 1;  }

  return Math.min(Math.max(inputNum, min), max);
}
