/**
 * Similar to `setTimeout`, but with multiple intervals to report elapsed time.
 * By: Ari Saif
 */
let Globals = require("./defines").Globals;

/**
 * Starts the timeout
 * @param {Object} options
 */
function start(options) {
  if(!options.totalTimeout){
    throw new Error("options.totalTimeout should be provided and be non-zero.");
  }

  if(!options.numberOfIntervals){
    throw new Error ("options.numberOfIntervals should be provided and be non-zero.");
  }

  let timer = { id: getUniqueID(), options: options, counter: 0 };
  Globals.timers[timer.id] = timer;

  let intervalTime = options.totalTimeout / options.numberOfIntervals;

  timer[`interval`] = setInterval(() => {
    let percentage = Math.round(
      (((timer.counter + 1) * intervalTime) / options.totalTimeout) * 100
    );
    if (options.intervalCallback) {
      options.intervalCallback(percentage);
    }
    if (timer.counter >= options.numberOfIntervals - 1) {
      if (options.intervalEndCallback) {
        options.intervalEndCallback();
      }
      clearInterval(timer[`interval`]);
      delete Globals.timers[timer.id];
    } else {
      timer.counter++;
    }
  }, intervalTime);
  return timer;
}

/**
 * Stops the timeout
 */
function stop(timer) {
  if (!timer) {
    return;
  }

  if (Globals.timers[timer.id]) {
    clearInterval(timer.interval);
    delete Globals.timers[timer.id];
  }
}

function getUniqueID() {
  while (Globals.timers[Globals.idCounter++]) {}
  return Globals.idCounter;
}

module.exports = function() {
  return {
    stop: stop,
    start: start
  };
};
