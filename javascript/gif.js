// Initial array of movies
var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];
var moviesViewDiv = $("#movies-view")
// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {

    var movie = $(this).attr("data-name");
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";

    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // Creates a div to hold the movie
        const mov = $("<div>")
        console.log(response)
        // Retrieves the Rating Data
        // Creates an element to have the rating displayed
        //const rate = response.rating
        // Displays the rating
        mov.append($("<div>").text(response.Rated))
        // Retrieves the release year
        // Creates an element to hold the release year
        // Displays the release year
        mov.append($("<div>").text(response.Year))
        // Retrieves the plot
        // Creates an element to hold the plot
        // Appends the plot
        mov.append($("<div>").text(response.Plot))
        // Creates an element to hold the image
        // Appends the image
        //mov.append('<img src="' + response.Poster + '" alt="">')
        mov.append($("<img>").attr("src", response.Poster))
        // Puts the entire Movie above the previous movies.
        moviesViewDiv.prepend(mov)
    });

}

// Function for displaying movie data
function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();
    // Loops through the array of movies
    for (var i = 0; i < movies.length; i++) {

        // Then dynamicaly generates buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of movie to our button
        a.addClass("movie");
        // Added a data-attribute
        a.attr("data-name", movies[i]);
        // Provided the initial button text
        a.text(movies[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where the add movie button is clicked
$("#add-movie").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var movie = $("#movie-input").val().trim();

    // The movie from the textbox is then added to our array
    movies.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".movie", displayMovieInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();