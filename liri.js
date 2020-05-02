//require("dotenv").config();

// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);

//require jQuery and jsdom
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

dataArr = process.argv.slice(3);
//var searchTerm = dataArr.join(" ");

if (process.argv[2] === "concert-this") {
    var artist = dataArr.join("+");
    queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        //console.log("Name of venue: " + response.id[0])
    })

}



