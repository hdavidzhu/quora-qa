sinon = require("sinon");
var chai = require('chai');
var sinonChai = require("sinon-chai");

var upvotes = require('./upvotes');

expect = chai.expect;
chai.use(sinonChai);

var testNumberOfDays = 5;
var testWindowSize = 3;
var testDailyUpvoteData = [1, 2, 3, 1, 1];
var testDifferenceTree = [
  [1, 1, -1, 0],
  [1, upvotes.BEND, -1],
  [upvotes.BEND, upvotes.BEND],
  [upvotes.BEND]
];

describe('generateBaseTrendLayer', function() {
  it('can create the first layer properly', function() {
    var output = upvotes.generateBaseTrendLayer(testDailyUpvoteData);
    expect(output).to.deep.equal([1, 1, -1, 0]);
  });
});

describe('generateTrendLayer', function() {
  it('can generate trend layers', function() {
    var output = upvotes.generateTrendLayer([1, 1, -1, 0]);
    expect(output).to.deep.equal([1, upvotes.BEND, -1]);

    var output2 = upvotes.generateTrendLayer(output);
    expect(output2).to.deep.equal([upvotes.BEND, upvotes.BEND]);
  });
});

describe('recursivelyBuildTrendLayers', function() {
  it('can process multiple levels', function() {
    var output = upvotes.recursivelyBuildTrendLayers([[1, 1, -1, 0]], 3);
    expect(output).to.deep.equal(testDifferenceTree);
  });
});

describe('sumSingleWindow', function() {
  it('can sum out a single window', function() {
    var result = upvotes.sumSingleWindow(testDifferenceTree, 1, 0);
    expect(result).to.equal(3);

    var result = upvotes.sumSingleWindow(testDifferenceTree, 1, 1);
    expect(result).to.equal(0);

    var result = upvotes.sumSingleWindow(testDifferenceTree, 1, 2);
    expect(result).to.equal(-2);
  });
});

describe('createTrendResults', function() {
  it('can sum out all windows', function() {
    var result = upvotes.createTrendResults(testDifferenceTree, 3);
    expect(result).to.deep.equal([3, 0, -2]);
  });
});

describe('calcuateTrends', function() {
  it('can return the expected results', function() {
    var result = upvotes.calculateTrends([1, 2, 3, 1, 1], 3);
    expect(result).to.deep.equal([3, 0, -2]);
  });
});
