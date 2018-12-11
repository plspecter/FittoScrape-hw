//require mongoose 
var mongoose = require("mongoose");

//save a ref to the schema constructor
var Schema = mongoose.Schema;

//Using the Schema constructor, create a new note Schema
//similar to a sequelize model
var NoteSchema = new Schema ({
    title: String,
    body: String
})

//this contains the Note Schema we just made
var Note = mongoose.model("Note", NoteSchema);

//Export the Note Model
module.exports = Note;