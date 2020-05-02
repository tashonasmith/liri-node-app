require(".env").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

//require jQuery and jsdom
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);

var moment = require('moment');

dataArr = process.argv.slice(3);

if (process.argv[2] === "concert-this") {
    var artist = dataArr.join(" ");
    queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //console.log(response);
        for (i = 0; i < response.length; i++) {
            console.log("Artist: " + artist);
            console.log("Name of Venue: " + response[i].venue.name);
            console.log("Venue Location: " + response[i].venue.city);
            var eventDate = moment(response[i].datetime).format("MM/DD/YYYY");
            console.log("Date of the Event: " + eventDate);
            console.log("---------------------------------------------------");
            
        };
    });

} else if (process.argv[2] === "spotify-this-song") {
    var track = dataArr.join(" ");

    spotify.search({ type: 'track', query: track }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
      console.log(data); 
      });
}



