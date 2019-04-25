var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");


var PORT = 3002;

// Initialize Express
var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// app.engine("handlebars", ehbrs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoscraper";

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true
});

require("./routes/routes.js")(app);


// Listen on port 3000
app.listen(process.env.PORT || 3002, function() {
    console.log("App running on port 3002!");
});