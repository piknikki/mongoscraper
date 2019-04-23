//  build the schema with mongoose

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var NoteSchema = new Schema({
    // `title` is of type String
    title: String,
    // `body` is of type String
    body: String
});

//  build the model using the schema
var Note = mongoose.model("Note", NoteSchema)

module.exports = Note;