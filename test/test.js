"use strict";

var expect = require("chai").expect;
var assert = require("chai").assert;

var tp = require("../lib/index");
let Globals = require("../lib/defines").Globals;

//-----------------------------------------------------------------------------
it("should check for throws on totalTimeout and numberOfIntervals", done => {
  let intervalFinished = false;
  function intervalCallback(percentage) {}
  function intervalEndCallback() {}

  function throwsError() {
    tp().start(options);
  }

  let options = {
    intervalCallback: intervalCallback,
    intervalEndCallback: intervalEndCallback,
    // totalTimeout: 1000,
    numberOfIntervals: 10
  };

  assert.throws(
    throwsError,
    Error,
    "options.totalTimeout should be provided and be non-zero."
  );

  options = {
    intervalCallback: intervalCallback,
    intervalEndCallback: intervalEndCallback,
    totalTimeout: 1000
    // numberOfIntervals: 10
  };

  assert.throws(
    throwsError,
    Error,
    "options.numberOfIntervals should be provided and be non-zero."
  );

  options = {
    intervalCallback: intervalCallback,
    intervalEndCallback: intervalEndCallback,
    // totalTimeout: 1000
    // numberOfIntervals: 10
  };

  assert.throws(
    throwsError,
    Error,
    "options.totalTimeout should be provided and be non-zero."
  );

  done();
});
//-----------------------------------------------------------------------------
it("should end the timeout", done => {
  let intervalFinished = false;
  function intervalCallback(percentage) {
    // console.log(`${percentage}% done.`);
  }

  function intervalEndCallback() {
    intervalFinished = true;
  }

  let options = {
    intervalCallback: intervalCallback,
    intervalEndCallback: intervalEndCallback,
    totalTimeout: 1000,
    numberOfIntervals: 10
  };

  tp().start(options);

  setTimeout(function() {
    try {
      expect(intervalFinished).to.equal(true);
      done();
    } catch (e) {
      done(e);
    }
  }, 1100);
});
//-----------------------------------------------------------------------------
it("should call the intervalCallback", done => {
  let intervalCallbackCalled = false;
  function intervalCallback(percentage) {
    // console.log(`${percentage}% done.`);
    intervalCallbackCalled = true;
  }

  function intervalEndCallback() {}

  let options = {
    intervalCallback: intervalCallback,
    intervalEndCallback: intervalEndCallback,
    totalTimeout: 1000,
    numberOfIntervals: 10
  };

  let timer = tp().start(options);

  setTimeout(function() {
    try {
      expect(intervalCallbackCalled).to.equal(true);
      tp().stop(timer);
      done();
    } catch (e) {
      tp().stop(timer);
      done(e);
    }
  }, 150);
});
//-----------------------------------------------------------------------------
it("should stop the timeout", done => {
  let intervalFinished = false;
  function intervalCallback(percentage) {}

  function intervalEndCallback() {
    console.log("In callback");
    intervalFinished = true;
  }

  let options = {
    intervalCallback: intervalCallback,
    intervalEndCallback: intervalEndCallback,
    totalTimeout: 1000,
    numberOfIntervals: 10
  };

  let timer = tp().start(options);

  setTimeout(function() {
    tp().stop(timer);
    tp().stop(timer);
  }, 20);

  setTimeout(function() {
    try {
      expect(intervalFinished).to.equal(false);
      done();
    } catch (e) {
      done(e);
    }
  }, 1500);
});
//-----------------------------------------------------------------------------
it("should call the intervalCallback of multiple timeouts", done => {
  let intervalCallbackCalled1 = false;
  let intervalCallbackCalled2 = true;

  function intervalCallback1(percentage) {
    // console.log(`${percentage}% done.`);
    intervalCallbackCalled1 = true;
  }

  function intervalCallback2(percentage) {
    // console.log(`${percentage}% done.`);
    intervalCallbackCalled2 = false;
  }

  function intervalEndCallback1() {}
  function intervalEndCallback2() {}

  let options1 = {
    intervalCallback: intervalCallback1,
    intervalEndCallback: intervalEndCallback1,
    totalTimeout: 1000,
    numberOfIntervals: 10
  };

  let options2 = {
    intervalCallback: intervalCallback2,
    intervalEndCallback: intervalEndCallback2,
    totalTimeout: 2000,
    numberOfIntervals: 20
  };

  let timer1 = tp().start(options1);
  let timer2 = tp().start(options2);

  setTimeout(function() {
    try {
      expect(intervalCallbackCalled1).to.equal(true);
      expect(intervalCallbackCalled2).to.equal(false);

      tp().stop(timer1);
      tp().stop(timer2);

      done();
    } catch (e) {
      tp().stop(timer1);
      done(e);
    }
  }, 150);
});
//-----------------------------------------------------------------------------
it("should call the intervalEndCallback for multiple timeouts", done => {
  let intervalEndCallbackCalled1 = false;
  let intervalEndCallbackCalled2 = false;

  function intervalCallback1(percentage) {}
  function intervalCallback2(percentage) {}

  function intervalEndCallback1() {
    intervalEndCallbackCalled1 = true;
  }
  function intervalEndCallback2() {
    intervalEndCallbackCalled2 = true;
    intervalEndCallbackCalled1 = false;
  }

  let options1 = {
    intervalCallback: intervalCallback1,
    intervalEndCallback: intervalEndCallback1,
    totalTimeout: 1000,
    numberOfIntervals: 10
  };

  let options2 = {
    intervalCallback: intervalCallback2,
    intervalEndCallback: intervalEndCallback2,
    totalTimeout: 2000,
    numberOfIntervals: 20
  };

  let timer1 = tp().start(options1);
  let timer2 = tp().start(options2);

  setTimeout(function() {
    try {
      expect(intervalEndCallbackCalled1).to.equal(true);
      expect(intervalEndCallbackCalled2).to.equal(false);
    } catch (e) {
      tp().stop(timer1);
      tp().stop(timer2);
      done(e);
    }
  }, 1100);

  setTimeout(function() {
    try {
      expect(intervalEndCallbackCalled1).to.equal(false);
      expect(intervalEndCallbackCalled2).to.equal(true);
      done();
    } catch (e) {
      tp().stop(timer1);
      tp().stop(timer2);
      done(e);
    }
  }, 2100);
});
