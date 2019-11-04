var topics = ["Dog", "Cat", "Mouse", "Lion"];
var topicsViewDiv = $("#topics-view")
function displayTopicInfo() {

    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&apikey=euUgeEMlOInHIg9TGdQqyNO1UtcZ3VG0&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = response.data
        for (let i = 0; i < results.length; i++) {
            const gifDiv = $("<div>")

            const rating = results[i].rating
            var p = $("<p>").text("Rating: " + rating)

            var topicImage = $("<img>")
            topicImage.attr("src", results[i].images.fixed_height.url)

            gifDiv.prepend(p);
            gifDiv.prepend(topicImage)

            $("#topics-view").prepend(gifDiv)
        }
        const mov = $("<div>")
        console.log(response)
        mov.append($("<div>").text(response.Rated))
        mov.append($("<div>").text(response.Year))
        mov.append($("<div>").text(response.Plot))
        mov.append($("<img>").attr("src", response.Poster))
        topicsViewDiv.prepend(mov)
    });

}

function renderButtons() {

    $("#buttons-view").empty();
    for (var i = 0; i < topics.length; i++) {

        var a = $("<button>");
        a.addClass("topic");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-topic").on("click", function (event) {
    event.preventDefault();
    var movie = $("#topic-input").val().trim();

    topics.push(topics);

    renderButtons();
});

$(document).on("click", ".topic", displayTopicInfo);

renderButtons();