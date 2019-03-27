$(document).ready(function(){
    //initialize modal materialize
    $('.modal').modal();
    //initialize textarea materialize
    $('input#input_text, textarea#textarea2').characterCounter();

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
    });

});

