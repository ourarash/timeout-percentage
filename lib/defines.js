/**
 * Global variables
 */
Globals = {
  messages:{
    totalTimeoutNotPresent: "options.totalTimeout should be provided and be non-zero.",
    numberOfIntervalsNotPresent: "options.numberOfIntervals should be provided and be non-zero."
  },
  idCounter: 0,
  timers: {}
};

var exports = (module.exports = {
  Globals: Globals
});
