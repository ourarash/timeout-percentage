const tp = require("../lib/index.js");

function intervalCallback(percentage) {
  console.log(`${percentage}% done.`);
}

function intervalEndCallback() {
  console.log(`Interval finished!`);
}

let options = {
  intervalCallback: intervalCallback, // Will be called at each interval
  intervalEndCallback: intervalEndCallback, // Will be called at the end of the timeout
  totalTimeout: 1000, // Total timeout in ms
  numberOfIntervals: 10 // Number of intervals
};

tp().start(options);

