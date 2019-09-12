# timeout-percentage

[![NPM](https://badge.fury.io/js/timeout-percentage.svg)](https://www.npmjs.com/package/timeout-percentage)
[![NPM Downloads][downloadst-image]][downloads-url]

[downloads-image]: https://img.shields.io/npm/dm/timeout-percentage.svg
[downloadst-image]: https://img.shields.io/npm/dt/timeout-percentage.svg
[downloads-url]: https://npmjs.org/package/timeout-percentage

Similar to setTimeout, but with multiple intervals to report elapsed time.

For example, for a timeout value of 1000, you can set 10 intervals, each 100ms, where you get a callback which reports the elapsed time in percentage. This is usefule for creating progress bars.

## Limitation
Currently only one active timeout can be used at each time.

# Install

```bash
npm i -s timeout-percentage
```

# Usage

```javascript
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

tp(options).start();

/*
Output:

10% done.
20% done.
30% done.
40% done.
50% done.
60% done.
70% done.
80% done.
90% done.
100% done.
Interval finished!
*/
```



See [test/test.js](test/test.js) for more examples.
# timeout-percentage
