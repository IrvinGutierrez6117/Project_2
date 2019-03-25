var newUser = true;
// change to false for Login/Existing user

$(document).ready(function(){
    $('.modal').modal();
});

// when user clicks any one of the emojis, it gets stored in a variable
var emoji;
// on click function for emoji selected
$(".emoji-choice").on("click", function(e) {
    // shows what emoji is clicked. 
    // needs to be stored in DB 
    emoji = e.currentTarget.id;
    console.log(emoji);
    // Materialize text area
    $('input#input_text, textarea#textarea2').characterCounter();

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