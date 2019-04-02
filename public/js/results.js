// Retrieve currentUserID variable from intro.js via Local Storage
var currUserIdRcvd = Number(localStorage.getItem("currUserIdLS"));

console.log("variable transfered from local storage > " + currUserIdRcvd);
console.log("Type of variable: " + typeof currUserIdRcvd);

Number(currUserIdRcvd);
console.log("New Type = " + typeof currUserIdRcvd + " " + currUserIdRcvd);

$(document).ready(function() {
  // =========== Problem we need to solve -- Get current user & database info we can use ==========

  // =========== Global Variables for emotions, time, and journal functions ==========
  console.log("can you see the currentUserId? " + intro.currentUserId);
  // ===== emotions var =====
  var happy;
  var okay;
  var bad;
  // ===== time var =====
  var past;
  var present;
  var future;
  // ===== journal var =====
  var title; // maybe we don't need?
  var journal; // maybe we don't need?

  // ========== Global Functions for emotions, time, and joural ==========
  function emotions(x, y, z) { // x, y, z === happy, okay, bad
    // .length should return a number
    happy = x.length; // example -- 2
    okay = y.length; // example -- 3
    bad = z.length; // example -- 5

    let total = happy + okay + bad; // example -- 2 + 3 + 5 = 10
    let happyPercent = happy / total; // example -- 2 / 10 = .20
    let okayPercent = okay / total; // example -- 3 / 10 = .30
    let badPercent = bad / total; // example -- 5 / 10 = .50

    // makes the new values fixed to a round decimal of 2 example -- if 0.268634 === 0.27
    happy = happyPercent.toFixed(2);
    okay = okayPercent.toFixed(2);
    bad = badPercent.toFixed(2);

    return happy && okay && bad; // returns new decimal values that total === 1
  }
  function time(x, y, z) { // x, y, z === past, present, future
    // .length should return a number
    past = x.length; // example -- 2
    present = y.length; // example -- 3
    future = z.length; // example -- 5

    let total = happy + okay + bad; // example -- 2 + 3 + 5 = 10
    let pastPercent = happy / total; // example -- 2 / 10 = .20
    let presentPercent = okay / total; // example -- 3 / 10 = .30
    let futurePercent = bad / total; // example -- 5 / 10 = .50

    // makes the new values fixed to a round decimal of 2 example -- if 0.268634 === 0.27
    past = happyPercent.toFixed(2);
    present = okayPercent.toFixed(2);
    future = badPercent.toFixed(2);

    return past && present && future; // returns new decimal values that total === 1
  }


});
