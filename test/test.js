"use strict";

var expect = require("chai").expect;
var tp = require("../lib/index");

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

  tp(options).start();

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

  tp(options).start();

  setTimeout(function() {
    try {
      expect(intervalCallbackCalled).to.equal(true);
      tp().stop();
      done();
    } catch (e) {
      tp().stop();
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

  tp(options).start();

  setTimeout(function() {
    tp().stop();
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
