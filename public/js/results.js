$(document).ready(function() {
    //initialize modal materialize
    $(".modal").modal();
    //initialize textarea materialize
    $("input#input_text, textarea#textarea2").characterCounter();
  
    // Dropdwon menu
    $(".dropdown-trigger").dropdown({
      coverTrigger: false,
      hover: true
    });
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
// Make a function to submit Form to Results page

//Make an AJAX call to the API routes to get results back
var currentUserId;
var API = {
  getEntries: function(userData) {
    return $.ajax({
      type: "GET",
      url: "api/entries/",
      data: JSON.stringify(userData)
    });
  }
};

// Pie Chart
google.charts.load("current", { packages: ["corechart"] });
google.charts.setOnLoadCallback(drawPieChart);

function drawPieChart() {
  var pieData = google.visualization.arrayToDataTable([
    ["Emotions", "Number"],
    ["Happy", 11],
    ["Okay", 2],
    ["Bad", 5]
  ]);

  var options = {
    title: "My Reflections",
    width: 900,
    height: 550,
    title: "My Emotions",
    is3D: true
  };

  var chart = new google.visualization.PieChart(
    document.getElementById("piechart")
  );

  chart.draw(pieData, options);
}

// Bar Data
google.charts.load("current", { packages: ["corechart", "bar"] });
google.charts.setOnLoadCallback(drawAxisTickColors);

function drawAxisTickColors() {
  var barData = google.visualization.arrayToDataTable([
    ["Time Frames", "What you have been thinking about"],
    ["Past", 2],
    ["Present", 7],
    ["Future", 9]
  ]);

  var options = {
    chart: {
      title: "Your Thoughts",
      width: 900,
      height: 550
    },
    bars: "horizontal" // Required for Material Bar Charts.
  };

  var chart = new google.charts.Bar(
    document.getElementById("barchart_material")
  );

  chart.draw(barData, google.charts.Bar.convertOptions(options));
}
