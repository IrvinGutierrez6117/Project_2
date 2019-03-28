// import { runInNewContext } from "vm";

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

// Flag for logged in user
var isLoggedIn = false;
// currentUserId declared. Updated from line 51
var currentUserId;

// The API object contains methods for each kind of request we'll make
var API = {
    // ==================== User entry API functions ====================
    // POST API request to save new user data to Users Table from New User Modal
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
    // GET API request to search User Table for userName
    searchUser: function(existingUser) {
         $.ajax({
            type: "GET",
            url: "api/users",
            data: JSON.stringify(existingUser)
        }).then(function(req, res) {
            console.log(req);
            console.log(existingUser);
            for (i = 0; i < req.length; i++) { // Loops through Users Table in DB
                if (existingUser.userName === req[i].userName // if userName matches
                    && existingUser.password === req[i].password) { // if password matches
                    console.log(
                        "Match! " + 
                        "Username = " + req[i].userName + " " +
                        "Password = " + req[i].password + " " +
                        "UserID = " + req[i].id);
                    isLoggedIn = true; // Flips logged in flag to true
                    currentUserId = req[i].id; // Stores current user ID in variable for entry POST
                    console.log("isLoggedIn = " + isLoggedIn);
                    console.log("Current logged in user ID: " + currentUserId);
                } else {
                    console.log("No match :(");
                    // Need to redirect to New User Model
                }
            }
        });
    },
    // ==================== Journal entry API funcitons ====================
    // POST API method for sending JSON to server
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

// ==================== User Functions ====================

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
// ---------------------------------------------

// Function for gathering new user input and sending to API POST request
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

// Function for gathering Existing user input and sending to API GET request
var searchUserDb = function(event) {
    event.preventDefault();

    let existingUser = {
        userName: $("#intro-existing-name").val().trim(),
        password: $("#intro-existing-password").val().trim()
    };

    API.searchUser(existingUser);
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

// Function for gathering journal entry data and sending to API POST method
var handleFormSubmit = function(event) {
    event.preventDefault();

    // Stores username in variable for newPost Object
    var currentUserName = "";
    if (isLoggedIn = true) {
        currentUserName = $("#intro-existing-name").val().trim();
    }
  
    // Object for all newPost Data
    let newPost = {
        emotion: parseInt(isRadioAnswer("group1")),
        timeFrame: parseInt(isRadioAnswer("group2")),
        title: $("#title-name").val().trim(),
        body: $("#journalEntry").val().trim(),
        userId: currentUserId // searchUser API method in line 53
    };
  
    // TODO: Get if BLANK condition working
    // if (!(newPost.text && newPost.description)) {
    //   alert("You must enter an example text and description!");
    //   return;
    // }
    
    API.saveNewPost(newPost).then(function() {
        console.log(newPost);
        console.log(currentUserName);
    });
 
  };

// ============== Event listenters ==============

$("#intro-submit-entry").on("click", handleFormSubmit);

$("#intro-new-user-button").on("click", handleUserSubmit);

$("#intro-existing-user-button").on("click", searchUserDb);


// TODO:  Would need to update entries modal with foreign keys
