$(document).ready(function(){
    //initialize modal materialize
    $('.modal').modal();
    //initialize textarea materialize
    $('input#input_text, textarea#textarea2').characterCounter();
    //===================== materialize =========================

    var newOrExistUser = null;
    var allPostInfo = null;

    var newUser = false;
    var existingUser = false;

    var newUsername = $("#intro-new-name").val().trim();
    var existingUsername = $("#intro-existing-name").val().trim();
    
    var newPassword = $("#intro-new-password").val().trim();
    var existingPassword = $("#intro-existing-password").val().trim();

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

    //This function is used to activate the clicks for when a user selects to be a new or an existing user
    function isUserClick (x) {
        if (newUser === true) {
            //post method for 

            return newOrExistUser = //something; && newUsername && newPassword
        } else if (existingUser === true) {
            //post method for existing user

            return newOrExistUser = //something; && existingUsername && existingPassword
        }
    }
    // When user clicks Create Account button        
    $("#intro-new-user-modal").on("click", function() {
        newUser = true;
        existingUser = false;
        isUserClick(newUser);
    });
    // When user clicks Login button
    $("#intro-existing-user-modal").on("click", function() {
        existingUser = true;
        newUser = false;
        isUserClick(existingUser);
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

        //post method to database what alex said
        $.post("/api/entries" + newOrExistUser.id,
         newPost).then();
        
    });

});

