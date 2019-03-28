$(document).ready(function(){
    //initialize modal materialize
    $('.modal').modal();
    //initialize textarea materialize
    $('input#input_text, textarea#textarea2').characterCounter();
    // Form submit button entry
    // $("#intro-submit-entry").on("click", submitEntry);
    $(".dropdown-trigger").dropdown({
        coverTrigger: false,
        hover: true
    });
});

// The API object contains methods for each kind of request we'll make
var API = {
    // ------------ User entry API functions ---------
    saveNewUser: function(newUser) {
        return $.ajax({
        headers: {
            "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/users",
        data: JSON.stringify(newUser)
        });
    },
    searchUser: function(existingUser) {
         $.ajax({
            type: "GET",
            url: "api/users",
            data: JSON.stringify(existingUser)
        }).then(function(req, res) {
            console.log(req);
            console.log(existingUser);
        });
    },
    // ----------- Journal entry API funcitons ---------
    saveNewPost: function(newPost) {
        return $.ajax({
        headers: {
            "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/entries",
        data: JSON.stringify(newPost)
        });
    },
// *** Don't need to delete posts? ***
// deleteExample: function(id) {
//     return $.ajax({
//     url: "api/examples/" + id,
//     type: "DELETE"
//     });
// }
};

// ============== User Functions ===================

// -------- btn and input ids for user ----------
// Create btn ID = #intro-new-user-modal
// Login btn ID = #intro-existing-user-modal

// New User Modal
    // username input = #intro-new-name
    // pword input = #intro-new-password
    // btn = #intro-new-user-button

// Existing User Modal
    // username input = #intro-existing-name
    // pword input = #intro-existing-password
    // btn = #intro-existing-user-button

var handleUserSubmit = function(event) {
    event.preventDefault();
    
    let newUser = {
        userName: $("#intro-new-name").val().trim(),
        password: $("#intro-new-password").val().trim()
    };
    
    // TODO: get if BLANK condition working
    // if (!(newPost.text && newPost.description)) {
    //   alert("You must enter an example text and description!");
    //   return;
    // }
    
    API.saveNewUser(newUser).then(function() {
        console.log(newUser);
    });
    
};

var searchUserDb = function(event) {
    event.preventDefault();

    let existingUser = {
        userName: $("#intro-existing-name").val().trim(),
        password: $("#intro-existing-password").val().trim()
    };

    API.searchUser(existingUser).then(function() {
        console.log(existingUser);
    });
};

// ============== Journal Entry Functions ===================

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

 // Object variable holding new post   
let newPost = {
    emotion: isRadioAnswer("group1"),
    timeFrame: isRadioAnswer("group2"),
    titleName: $("#title-name").val().trim(),
    journalEntry: $("#journalEntry").val().trim()
};


var handleFormSubmit = function(event) {
    event.preventDefault();
  
    let newPost = {
        emotion: parseInt(isRadioAnswer("group1")),
        timeFrame: parseInt(isRadioAnswer("group2")),
        title: $("#title-name").val().trim(),
        body: $("#journalEntry").val().trim()
    };
  
    // TODO: Get if BLANK condition working
    // if (!(newPost.text && newPost.description)) {
    //   alert("You must enter an example text and description!");
    //   return;
    // }
  
    API.saveNewPost(newPost).then(function() {
        console.log(newPost);
    });
 
  };

// ======== Event listenters ==========================

$("#intro-submit-entry").on("click", handleFormSubmit);

$("#intro-new-user-button").on("click", handleUserSubmit);

$("#intro-existing-user-button").on("click", searchUserDb);
