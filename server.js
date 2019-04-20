// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require axios and cheerio. This makes the scraping possible
var axios = require("axios");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "mongoscraperDB";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);

db.on("error", function(error) {
    console.log("Database Error:", error);
});

// Main route (simple Hello World Message)
app.get("/", function(req, res) {
    res.send("Hello world");
});

// TODO: make two more routes


// get info from db
app.get("/all", function(req, res) {
    db.scrapedData.find({}, function(error, found) {
        if (error) {
            console.log(error)
        } else {
            res.json(found)
        }
    })
});

app.get("/scrape", function(req, res) {
    axios.get("https://www.nytimes.com").then(function(response) {
        var $ = cheerio.load(response.data); // hand over to cheerio

        // jquery/cheerio selector and then loop through the items in the result
        $("article").each(function(item, element) {
            var title = $(element).children().text();
            var link = $(element).find("a").attr("href");


            db.scrapedData.insert({
                title,
                link
            });
        });
        res.send("scrape initiated");
    });
})





// Listen on port 3000
app.listen(3000, function() {
    console.log("App running on port 3000!");
});