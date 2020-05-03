require("dotenv").config();

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
    if (dataArr === []) {
       console.log("---------------------------------");
       console.log("Artist(s): Ace of Base");
       console.log("Song Name: The Sign");
       console.log("Spotify Preview Link: https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE" );
       console.log("Album: The Sign");
       console.log("---------------------------------");
    } else {
      var track = dataArr.join(" ");
      spotify.search({ type: 'track', query: track, limit: 1 }, function(err, data) {
          if (err) {
            return console.log('Error occurred: ' + err);
          } 
      
        //console.log(data.tracks.items[0]);  
        console.log("--------------------------------------------------")
        console.log("Artist(s): " + data.tracks.items[0].album.artists[0].name); 
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Spotify Preview Link: " + data.tracks.items[0].external_urls.spotify);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("--------------------------------------------------")
      });

    };
}



