$(function () {
    createButtons();
})

var ApiKey = "tRWxVxJOJx0YdzhEr2GJommk8DopDIJ3";
var buttonArray = ['Over 9000', 'Funny', 'Cute', 'Sweet', 'Super Sayian','Memes','Dancing','Driving','What'];

function createButtons() {
    $("#buttons").empty();
    for (var i = 0; i < buttonArray.length; i++) {
        var button = $('<button>');
        button.addClass('searchButtons');
        button.addClass("waves-effect waves-light btn-large");
        button.attr('data-type', buttonArray[i]);
        button.text(buttonArray[i]);
        $("#buttons").append(button);

    }
}

$(document).on('click', '.searchButtons', function () {
    var data = $(this).data('type');
    var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + data + '&limit=10&api_key=' + ApiKey + '';
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            var searchDiv = $("<div>");
            var rating = response.data[i].rating;
            var p = $("<p>").html("Rating: <span>" +rating+ "</span>")
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            var image = $('<img>');
            searchDiv.addClass("col s3");
            image.attr('src', still);
            image.attr('data-still', still);
            image.attr('data-animated', animated)
            image.attr('data-state', 'still');
            image.addClass('searchImage');
            searchDiv.append(p);
            searchDiv.append(image);
            $("#gifs").append(searchDiv);
        }
    })
    $("#gifs").empty();
})

$("#searchSubmit").on('click', function () {
    var currentSearch = $('#search').val();
    buttonArray.push(currentSearch);
    createButtons();
    return false;
})

$(document).on('click', '.searchImage', function () {
    var currentState = $(this).attr('data-state');
    console.log(this);
    console.log(currentState);
    if (currentState === 'still') {
        $(this).attr('src', $(this).data('animated'))
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'))
        $(this).attr('data-state', 'still');
    }
})