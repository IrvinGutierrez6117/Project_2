$(document).ready(function(){
    //initialize modal materialize
    $('.modal').modal();
    //initialize textarea materialize
    $('input#input_text, textarea#textarea2').characterCounter();
    // Form submit button entry
    $("#intro-submit-entry").on("click", submitEntry);
    $(".dropdown-trigger").dropdown({
        coverTrigger: false,
        hover: true
     });
});
  //This function will get the value of each input from the form the user clicks
    function isRadioAnswer (x) {
        let isResponse = document.getElementsByName(x);
        if (isResponse[0].checked) {
            return isResponse[0].value;
        } else if (isResponse[1].checked) {
            return isResponse[1].value;
        } else if (isResponse[2].checked) {
            return isResponse[2].value;
        }
    }

    function submitEntry() {
        //this object "newPost" holds all the values from the emotion, timeframe, and journal form. 
        let newPost = {
            emotion: isRadioAnswer("group1"),
            timeFrame: isRadioAnswer("group2"),
            titleName: $("#title-name").val().trim(),
            journalEntry: $("#journalEntry").val().trim()
    }
    console.log(newPost);
    //var userId = ;
    // Submit new post to JournalEntries API Route
    $.ajax("/api/JournalEntries/", {
        type: "POST",
        data: newPost
    }).then(journalPost);

    app.post("/api/entries", function(req, res) {
        db.JournalEntries.create({
          title: req.body.title,
          body: req.body.body
        }).then(function(dbJournalEntries) {
          res.json(dbJournalEntries);
        });
      });

    function journalPost() {
        console.log("User's entries: ");
    }
}