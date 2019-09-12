/**
 * Global variables
 */
Globals = {
  options: {
    totalTimeout: 1000, // Total timeout in ms
    numberOfIntervals: 50, // Number of intervals
    intervalCallback: null, // Will be called at each interval
    intervalEndCallback: null // Will be called at the end of the timeout
  },
  counter: 0,
  interval: null
};

var exports = (module.exports = {
  Globals: Globals
});
