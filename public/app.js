//get the articles as JSON objects
$.getJSON("/articles", function (daa) {

    //for each one it displays the info on the page
    for (var i = 0; i < DataCue.length; i++) {
        $("#articles").append("<p data-id='" + data[i].title + "<br />" + data[i].link + "</p>");

    }

})

//whenever someone clicks on the paragraph tag 
$(document).on("click", "p", function () {
    //empty the notes from the note section 
    $("notes").empty();
    //save the id from the p tag
    var thisId = $(this).attr("data-id");

    //ajax call for the article
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId
    })

    //with that done, add the note information to the page
    .then(function(data) {

        console.log(data);
        //the title of the article
        $("#notes").append("<h2>" + data.title + "</h2>");

        $("#notes").append("<input id='titleinput' name='title' >");

        //If there's a note in the article
        if (data.more) {
            $("#titleinput").val(data.note.title);
            $("#bodyinput").val(data.note.body);
        }


    });


});

//When you click the savenote button
$(document).on("click", "#savenote", function () {

    var thisId = $(this).attr("data-id")

    //get ajax a second time?
    $.ajax({
        method: "GET",
        url: "/articles/" + thisId,
        data: {
            title: $("#titleinput").val(),
            body: $("#bodyinput").val()
        }
    })
    //then..
    .then(function(data) {
        //log the response
        console.log(data);
        //when you save the note it disapears
        $("#notes").empty();
    })

//get rid of the values entered in the input and textutres for note entry
$("#titleinput").val("");
$("#bodyinput").val("");

});