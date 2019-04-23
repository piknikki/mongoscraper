var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");


module.exports = function(app) {

    app.get("/scrape", function (req, res) {
        axios.get("https://www.nytimes.com").then(function (response) {
            var $ = cheerio.load(response.data); // hand over to cheerio


            // jquery/cheerio selector and then loop through the items in the result
            // the selector is the selector used on the nyt website!!
            $("article").each(function (item, element) {
                var result = {};
                result.title = $(this).children().text();
                result.link = $(this).find("a").attr("href");


                db.Article.create(result)
                    .then(function(dbArticle) {
                        console.log(dbArticle);
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            });
            res.send("scrape initiated");
        });
    });


    // route for getting all Articles from the db
    // put the articles into the index handlebars partial
    app.get("/articles", function(req, res) {
        db.Article.find({})
            .then(function(found) {
                    // let articleObj = {article: found};
                    // res.render("index", articleObj);
                res.json(found)
                })
            .catch(function(err) {
                res.json(err);
            });
    });

    // route for saving an Article on saved.handlebars
    // just like the /articles route but it goes to the saved instead of the index hbrs
    app.get("/api/saved", function(req, res) {
        db.Article.find({ saved: true }).then(function(found) {
                res.json(found)
            }
        )
    })


    // route for getting a specific Article by _id, populate with its note
    app.get("/articles/:id", function(req, res) {
        var id = req.params.id;

        db.Article.findOne({ _id: id })
            .populate("note")
            .then(function(dbNote) {
                res.json(dbNote)
            })
            .catch(function(err) {
                res.json(err);
            });
    })

    // route for saving/updating an Article's note
    app.post("/articles/:id", function(req, res) {
        var id = req.params.id;

        db.Note.create(req.body)
            .then(function(note) {
                return db.Article.findOneAndUpdate({ _id: id }, {$set: { note: note._id }}, { new: true });
            })
            .then(function(article) {
                res.json(article);
            })
            .catch(function(err) {
                res.json(err);
            });
    })


    // this is just like the save route above, but uses remove to remove the article from the saved articles
    // sets saved to false
    app.put("/remove/:id", function(req, res) {
        var id = req.params.id;

        db.Article.findByIdAndUpdate({ _id: id}, { $set: { saved: false }})
            .then(function(found) {
                res.json(found)
            })
    })


}








// app.get("/", function(req, res) {
//     // res.send("Hello world");
//
//     // get all articles scraped from db
//     db.Article.find({}, function (error, found) {
//         if (error) {
//             console.log(error)
//         } else {
//             res.redirect("/articles");
//         }
//     });
// });




