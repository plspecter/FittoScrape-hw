var express = require("express");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var axios = require("axios");

//require databases
var db = require('./models');
var PORT = 8081;

//call on express to start up
var app = express();

//configure middleware
app.use(logger("dev"));

//JSON parsing 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//connecting mongo DB project 
mongoose.connect("mongodb://localhost/FittoScrapce-hw", { useNewUrlParser: true });

//route to scrape
app.get("/scrape", function (req, res) {

    //grab html body with axios

    axios.get("http://www.echojs.com/").then(function (response) {

        var $ = cheerio.load(response.data);

        //grab every h2 within an article tag, and do the following
        $("scrape h2").each(function (i, element) {

            var results = {};

            results.title = $(this)
                .children("a")
                .text()
            results.link = $(this)
                .children("a")
                .attr("href")

            //create a new article using the 'results' object built from scraping
            db.Scrape.create(result)
                .then(function (dbScrape) {
                    //view the result in the console
                    console.log(dbScrape);
                })
                .catch(function (err) {

                    return res.json(err);


                });



        });

        //send msg to client 
        res.send("Scrape Complete")
    });

});

app.get("/scrape/:id", function (req, res) {

    db.Scrape.findOne({ _id: req.params.id })
        //populate the text with the associated article
        .populate("note")
        .then(function (dbScrape) {
        })
        .catch(function (err) {
            //if error occured
            res.json(err)
        });
});

//Route for saying/updating an article's assocated note
app.post("/scrape/id:", function (req, res) {
    //create a new note and pass onto req.body 
    db.Note.create(req.body)
        .then(function (dbNotes) {

            return db.Scrape.findOneAndUpdate({ _id: req.params.id }, { new: true });


        }).then(function (dbScrape) {
            // If we were able to successfully update an Article, send it back to the client
            res.json(dbScrape);
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);

        });
    });

    app.listen(PORT, function () {
        console.log("App is running on port localhost:// " + PORT);
    });

