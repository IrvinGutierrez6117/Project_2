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
    //===================== materialize =========================

    //very long name to indicate this is a response pulled back to the server 
    var newOrExistUserPostResponse = null;
    //havent done anything with this yet
    var allPostInfo = null;

    var newUser = false;
    var existingUser = false;

    var currentUser;

    //This will get the value of each input for the form
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
    //callback function after isUserClick function is initiated
    function timeToPost(y) {
        $.post("the-route-you-want-to-post-to", currentUser).then(function(err, res) {
            if (err) throw err;
            console.log(err);
            newOrExistUserPostResponse = res;
        });
    }

    //This function is used to activate the clicks for when a user selects to be a new or an existing user
    function isUserClick (x, func) {
        if (x === true) {
            //post method for 
            currentUser = {
                userName: $("#intro-new-name").val().trim(),
                password: $("#intro-new-password").val().trim()
            }
            return newOrExistUser = currentUser;
        } else if (x === true) {
            //post method for existing user
            currentUser = {
                userName: $("#intro-existing-name").val().trim(),
                password: $("#intro-existing-password").val().trim()
            }
            return newOrExistUser = currentUser;
        }
    }
    // When user clicks Create Account button        
    $("#intro-new-user-modal").on("click", function() {
        newUser = true;
        existingUser = false;
        isUserClick(newUser, timeToPost(currentUser));
    });
    // When user clicks Login button
    $("#intro-existing-user-modal").on("click", function() {
        existingUser = true;
        newUser = false;
        isUserClick(existingUser, timeToPost(currentUser));
    });

    $("#intro-submit-entry").on("click", function() {
        
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
        
        console.log(newPost);

        //post method to database what alex said
        $.post("/api/entries" + newOrExistUser.id,
         newPost).then();
        
    });

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