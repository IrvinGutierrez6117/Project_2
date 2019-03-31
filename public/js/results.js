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

    // ===== temporary user Id until mike knows how to =====
    var foreignKeyUserId = 1;
    // ===== emotions var =====
    var happy = [];
    var okay = [];
    var bad = [];
    // ===== time var =====
    var past = [];
    var present = [];
    var future = [];
    // ===== journal var =====
    var title = []; // maybe we don't need?
    var journal = []; // maybe we don't need?

    // ========== Global Functions for emotions, time, and joural ==========
    function emotions(x, y, z) { // x, y, z === happy, okay, bad
      // .length should return a number
      happy = x.length; // example -- 2
      okay = y.length; // example -- 3
      bad = z.length; // example -- 5
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
      past = happyPercent.toFixed(2) * 100; //ex. -- .25 --> 25
      present = okayPercent.toFixed(2) * 100; //ex. -- .30 --> 30
      future = badPercent.toFixed(2) * 100; //ex. -- .45 --> 45
    }

  //Make an AJAX call to the API routes to get journal results back

  var IPA = {
    getEntries: function(argForeignKey) {
      return $.ajax({
        type: "GET",
        url: "api/entries/journals",
        data: JSON.stringify({
          UserId: argForeignKey
        })
      })
    }
  };

  var searchJournalEntriesDB = function() {
    IPA.getEntries(foreignKeyUserId).then(
      function(data, textStatus, jqXHR) {
        console.log("Matt this is the data: " + "\n" + data)
        console.log("Matt this is the textStatus: " + "\n" + textStatus);
        console.log(jqXHR);
      },
      function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR HELLOOOO!? " + "\n" + errorThrown);
      }
    ); 
  }

  searchJournalEntriesDB(); 

  // ========== TRACY'S STUFF ==========
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
      ["Past", past],
      ["Present", present],
      ["Future", future]
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
});