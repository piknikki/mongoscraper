$.getJSON("/api/saved", function (data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
        // Display the apropos information on the page
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "</p>");
        //+ "<br />" + data[i].link +
        $("#articles").append(` <a href="${data[i].link}"> ${data[i].link} </a> <br>`)

        $("#articles").append(`<button class='btn btn-dark' id="delete" data-id="${data[i]._id}"> Delete Article </button> <hr>`)
    }
});


$(document).on("click", "#delete", function(event){
    event.preventDefault()
    var id = $(this).attr("data-id")
    console.log(id);

    $.ajax({
        url: `/api/saved/${id}`,
        method: "DELETE"
    }).then((res) => {
        console.log(res, "we deleted stuff");
        window.location.reload()
    })
})