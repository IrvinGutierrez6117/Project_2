$(document).ready(function(){
    var newUser = true;
    // change to false for Login/Existing user
    //initialize modal materialize
    $('.modal').modal();
    //initialize textarea materialize
    $('input#input_text, textarea#textarea2').characterCounter();

    // when user clicks any one of the emojis, it gets stored in a variable
    var emoji;
    // on click function for emoji selected
    $(".emoji-choice").on("click", function(e) {
        // shows what emoji is clicked. 
        // needs to be stored in DB 
        emoji = e.currentTarget.id;
        console.log(emoji);
        // Materialize text area

    });
    // Update/put if user logs in
    // $("#login-existing-button").on("click", function(e){
    //     newUser = false;
    //     // Backend question, what is the table called for the db to store info
    //     db.tableName.findOne().then(function(){
    //         //.findOne will find a table entry you are searching

    //     })
    // });
    //Post info into the server
    // if user is new, create them and use findOne to get them from the database

    //create a post method to the database for both users
    //create a get request from existing database
    // function updateUsersDB() {
    //     if (newUser === true) {
            
    //     }

    // }
});

$entryBtn = $("#journal-entry-button");
$entryTitle = $("#intro-title");
$entryBody = $("#journalEntry");

var API = {
    saveEntry: function(entry) {
        return $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "POST",
            url: "/api/entries",
            data: JSON.stringify(entry)
            //Get entries function
            // Delete entries function
        });
    }
};

// refresh examples function

var handleEntrySubmit = function(event) {
    event.preventDefault();

    
    $entryTitle = $("#intro-text");
    $entryBody = $("#journalEntry");

    // Stores input from journal entry form into "entry" variable
    var entry = {
        title: $entryTitle.val().trim(),
        body: $entryBody.val().trim()
    }

    // alert(JSON.stringify(entry));

    API.saveEntry(entry).then(console.log(entry));
};
$entryBtn = $("#journal-entry-button");
$entryBtn.on("click", handleEntrySubmit);