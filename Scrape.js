var mongoose = require("mongoose");

//schema constructor 
var Schema = mongoose.Schema;

//sequel schema 
var ArticleSchema = new Schema ({
//the title of the article
title: {
    type: String,
    required: true
},

//'link' is required for the String type 
link: {
type: String,
required: true
},
//'note' stores a Note ID
//this populates the article with the associated note
note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
}
});


//Creates our schema model using mongoose's method
var Article = mongoose.model("Article", ArticleSchema);

//exporting the article model
module.exports = Article;