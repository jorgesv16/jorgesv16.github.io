
var topic =["mlb", "golden state warriors", "michael jordan", "los angeles dodgers", "aaron rodgers", "boston celtics", "gordon hayward", "new york yankees", "nba", "football"];

// Display first set of buttons
function displayButtons() {
  $("#buttons").empty();
  for (var i = 0; i < topic.length; i++) {
    var gifButton = $("<button>");
    gifButton.addClass("btn btn-primary gif-btn");
    gifButton.text(topic[i]);

    $("#buttons").append(gifButton);
  }
}

// Add more buttons !
$("#submit").on("click", function() {
  topic.push($(".form-control").val());
  displayButtons();
});


// Make GIFs animate
$(document).on("click", ".image", function() {

  var state = $(this).attr("data-state");

  if(state === "animate") {
    $(this).attr("src", $(this).attr("data-still"))
    $(this).attr("data-state", "still");
  } else {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }
});

// Display GIFs to HTML
$(document).on("click", ".gif-btn", function() {

  $("#gifs").empty();

  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=b4H9jZJL8ilOBzfKXEwUDjItsnyYMWdZ&q=" + $(this)["0"].textContent + "&limit=10&offset=0&rating=G&lang=en";

  $.ajax({
    url: queryURL,
    method: 'GET'
    }).done(function(response) {

      var result = response.data;

      for(var i = 0; i < result.length; i++) {

        var gif = $("<div>");
        gif.addClass("gif-box");
        gif.append("Rating: " + result[i].rating.toUpperCase() + "<br>");

        var image = $("<img>");
        image.addClass("image");
        image.attr("src", result[i].images.fixed_height_still.url);
        image.attr("data-still", result[i].images.fixed_height_still.url);
        image.attr("data-animate", result[i].images.fixed_height.url);
        image.attr("data-state", "still");

        gif.append(image);
        $("#gifs").append(gif);

      }
  });
});

displayButtons();

