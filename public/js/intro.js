// import { runInNewContext } from "vm";

$(document).ready(function() {
    //initialize modal materialize
    $('.modal').modal();
    //initialize textarea materialize
    $('input#input_text, textarea#textarea2').characterCounter();
    // Form submit button entry
    // $("#intro-submit-entry").on("click", submitEntry);
   
});

// Flag for logged in user
var isLoggedIn = false;
// currentUserId declared. Updated from line 52
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

                    // Store currentUserID in Local Stoage
                    localStorage.setItem("currUserIdLS", currentUserId);
                    console.log("sending current user id to LS > " + currentUserId);

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
};

// ==================== User Functions ====================

// Function for gathering new user input and sending to API POST request
var handleUserSubmit = function(event) {
    event.preventDefault();
    
    let newUser = {
        userName: $("#intro-new-name").val().trim(),
        password: $("#intro-new-password").val().trim()
    };
    
    if (!(newUser.userName)) {
      alert("You must enter a username. Please try again");
      return;
    }
    else if (!(newUser.password )) {
        alert("You must enter password. Please try again");
        return;
    }

    // TODO: if inpuit is blank it stops function but continues 
      // to next modal. Need to make it stop


    // The response is the user information from the db
    // We are getting the response since it contains the user's id that is made
    // and user's information is saved with the id associated with their post
    API.saveNewUser(newUser).then(function(response) {
        console.log(response); 
        currentUserId = response.id;
    });
    
};

// Function for gathering Existing user input and sending to API GET request
var searchUserDb = function(event) {
    event.preventDefault();

    let existingUser = {
        userName: $("#intro-existing-name").val().trim(),
        password: $("#intro-existing-password").val().trim()
    };

    if (!(existingUser.userName)) {
        alert("You must enter a username. Please try again");
        return;
      }
      else if (!(existingUser.password )) {
          alert("You must enter password. Please try again");
          return;
      }

      // TODO: if inpuit is blank it stops function but continues 
      // to next modal. Need to make it stop

    API.searchUser(existingUser);
};

// Logs in New User after creating username and password and 
// choosing to create a reflection
var loginNewUser = function(event) {
    event.preventDefault();

    // Needed to re-use existingUser variable in order to 
    // run API.searchUser
    let existingUser = {
        userName: $("#intro-new-name").val().trim(),
        password: $("#intro-new-password").val().trim()
    };

    API.searchUser(existingUser);
};

// Logs out user (Flips isLoggedIn flag to false & empties currentUserId variable)
var logoutUser = function(event) {
    event.preventDefault();

    isLoggedIn = false;
    currentUserId = "";

    console.log("Logged in flag = " + isLoggedIn);
    console.log("Current user logged out. currentUserID variable = <" + currentUserId + ">");
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
    if (isLoggedIn === true) {
        currentUserName = $("#intro-existing-name").val().trim();
    }
  
    // Object for all newPost Data
    let newPost = {
        emotion: isRadioAnswer("group1"),
        timeFrame: isRadioAnswer("group2"),
        title: $("#title-name").val().trim(),
        body: $("#journalEntry").val().trim(),
        UserId: currentUserId // searchUser API method in line 52. 
        // Now currentUserId has an id because it received a response from the db
    };
  
    // TODO: Get if BLANK condition working
    // if (!(newPost.text && newPost.description)) {
    //   alert("You must enter an example text and description!");
    //   return;
    // }
    
    API.saveNewPost(newPost).then(function(response) {
        console.log(newPost);
        console.log(response.id);
    });
 
  };

// ============== Event listenters ==============

// journal entry btn
$("#intro-submit-entry").on("click", handleFormSubmit);

// new user btn
$("#intro-new-user-button").on("click", handleUserSubmit);

// existing user btn
$("#intro-loggedin-user-button").on("click", searchUserDb);

// "Next" btn in "Thank you..." modal after New User modal
$("#intro-user-created-button").on("click", loginNewUser);

// "Logout" btn in "Great Reflection" modal
$("#intro-logout-user").on("click", logoutUser);