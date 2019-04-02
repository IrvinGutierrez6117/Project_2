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


    // =========== MATTS STUFF ===========


    // =========== Problem we need to solve -- Get current user & database info we can use ==========

    // =========== Global Variables for emotions, time, and journal functions ==========

    // ===== temporary user Id until mike knows how to =====
    var foreignKeyUserId = 14;
    // ===== emotions var =====
    var happy = [];
    var okay = [];
    var bad = [];
    // ===== time var =====
    var past = [];
    var present = [];
    var future = [];
    // ===== journal var =====
    var title = []; 
    var journal = []; 

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

      // ===== **DO NOT DELETE BELOW - There in case trying to receive numbers **/ =====
      // let total = happy + okay + bad; // example -- 2 + 3 + 5 = 10
      // let pastPercent = happy / total; // example -- 2 / 10 = .20
      // let presentPercent = okay / total; // example -- 3 / 10 = .30
      // let futurePercent = bad / total; // example -- 5 / 10 = .50

      // // makes the new values fixed to a round decimal of 2 example -- if 0.268634 === 0.27
      // past = happyPercent.toFixed(2) * 100; //ex. -- .25 --> 25
      // present = okayPercent.toFixed(2) * 100; //ex. -- .30 --> 30
      // future = badPercent.toFixed(2) * 100; //ex. -- .45 --> 45
    }

  //Make an AJAX call to the API routes to get journal results back

  var IPA = {
    getEntries: function(argForeignKey) {
      return $.ajax({
        type: "GET",
        url: "api/entries/journals/body",
        data: "UserId=" + argForeignKey
      })
    }
  };

  var IPA = {
    getEntries: function(argForeignKey) {
      return $.ajax({
        type: "GET",
        url: "api/entries/journals",
        data: "UserId=" + argForeignKey
      })
    }
  };

  var searchJournalEntriesDB = function() {
    IPA.getEntries(foreignKeyUserId).then(
      function(data, textStatus, jqXHR) { // data returns "UserId" which is the foreign key. We are not using textStatus or jqXHR, but they are native to jQuery
        // ===== RETURNS DATA TO REFERENCE =====
        console.log(data); 

        // ========== THIS INPUTS EMOTIONS INFORMATION INTO THE PIE CHART ==========
        console.log("\n" + "The below is about Emotions" + "\n");
        for (let x = 0; x < data.length; x++) {
          const currentUserFK = data[x];
          console.log(currentUserFK.emotion);
          if (currentUserFK.emotion == "1") {
            happy.push(currentUserFK.emotion);
          } else if (currentUserFK.emotion == "2") {
            okay.push(currentUserFK.emotion);
          } else if (currentUserFK.emotion == "3") {
            bad.push(currentUserFK.emotion);
          }
        }
        emotions(happy, okay, bad);
        console.log(happy);
        console.log(okay);
        console.log(bad);

        // ========== THIS INPUTS TIME INFORMATION INTO THE RESULTS GRAPH ==========
        console.log("The below is about Time");
        for (let y = 0; y < data.length; y++) {
          const currentUserFK = data[y];
          console.log(currentUserFK.timeFrame);
          if (currentUserFK.timeFrame == "1") {
            past.push(currentUserFK.timeFrame);
          } else if (currentUserFK.timeFrame == "2") {
            present.push(currentUserFK.timeFrame);
          } else if (currentUserFK.timeFrame == "3") {
            future.push(currentUserFK.timeFrame);
          }
        }
        time(past, present, future);
        console.log(past);
        console.log(present);
        console.log(future);
        
        // ========== THIS INPUTS JOURNAL HTML TO THE RESULTS PAGE ==========
        console.log("\n" + "The below is about Journals" + "\n");
        for (let z = 0; z < data.length; z++) {
          const currentUserFK = data[z];
          title.push(currentUserFK.title);
          journal.push(currentUserFK.body);
        }
        console.log(title); //title should now be an array of all titles
        console.log(journal); //journal should be an array of all journals

        for (let a = 0; a < data.length; a++) {
          const userJournals = data[a];
          var journalsHolder = document.getElementById("results-journal-rendering"); //grabs container
          $("#results-journal-rendering").prepend(
            '<div class="row grey lighten-3" id="journal entry ' + a + '">' +  //IF WORKS KEEP IT'S IMPORTANT
              '<div class="col s12"></div>' +
              '<div class="row container">' +
                '<div id="results-title" class="col s3">' + 
                  '<h5><strong class="teal-text text-lighten-2">Title# ' + (a + 1) + ':</strong></h5>' + '<div>' + title[a] + '</div>' +
                '</div>' +
                '<div class="col s9"></div>' +
              '</div>' + 
              '<div class="col s12"></div>' +
              '<div class="row">' +
                '<div id="results-journals" class="col s12">' +
                  '<h5><strong class="teal-text text-lighten-2">Journal# ' + a + ':</strong></h5>' + '<div>' + journal[a] + '</div>' +
                '</div>' +
              '</div>' +
              '<div class="col s12"></div>' +
            '</div>'
          );
        }
      },
      //** Below this will change the  */
      function(jqXHR, textStatus, errorThrown) {
        console.log("ERROR HELLOOOO!? " + "\n" + errorThrown);
      }
    ); 
  }

  searchJournalEntriesDB(); 


  // ========== END OF MATT'S STUFF ==========


  // ========== TRACY'S STUFF ==========
  // Pie Chart
  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(drawPieChart);

  function drawPieChart() {
    var pieData = google.visualization.arrayToDataTable([
      ["Emotions", "Number"],
      ["Happy", happy], //"happy" is now happy array length
      ["Okay", okay], // "okay" is now okay array length
      ["Bad", bad] // "bad" is now bad array length
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
      ["Past", past], // "past" is now past array length
      ["Present", present], // "present" is now present array length
      ["Future", future] // "future" is now future array length
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