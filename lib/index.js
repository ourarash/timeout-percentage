let Globals = require("./defines").Globals;

function start(options) {
  if (options) {
    Object.assign(Globals.options, options);
  }
  let intervalTime =
    Globals.options.totalTimeout / Globals.options.numberOfIntervals;
  Globals.counter = 0;

  Globals.interval = setInterval(() => {
    let percentage = Math.round(
      (((Globals.counter + 1) * intervalTime) / Globals.options.totalTimeout) *
        100
    );
    if (Globals.options.intervalCallback) {
      Globals.options.intervalCallback(percentage);
    }
    if (Globals.counter >= Globals.options.numberOfIntervals - 1) {
      if (Globals.options.intervalEndCallback) {
        Globals.options.intervalEndCallback();
      }
      clearInterval(Globals.interval);
    } else {
      Globals.counter++;
    }
  }, intervalTime);
}

function stop() {
  if (Globals.interval) {
    clearInterval(Globals.interval);
    Globals.interval=null;
    Globals.counter=0;
  }
}

function setOptions(options) {
  Object.assign(Globals.options, options);
}

module.exports = function(options = Globals.options) {
  Object.assign(Globals.options, options);
  return {
    stop: stop,
    start: start,
    setOptions: setOptions
  };
};
