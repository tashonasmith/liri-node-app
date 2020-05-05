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

var axios = require("axios");

var fs = require('file-system')

var searchType = process.argv[2];
var dataArr = process.argv.slice(3);



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
            
        }
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

          fs.appendFile("log.txt", "--------------------------------------------------" + "\r\n" + data.tracks.items[0].album.artists[0].name + "\r\n" + data.tracks.items[0].name + "\r\n" + data.tracks.items[0].external_urls.spotify + "\r\n" + data.tracks.items[0].album.name + "\r\n" + "--------------------------------------------------", function(err) {

            // If an error was experienced we will log it.
            if (err) {
              console.log(err);
            }
          
            // If no error is experienced, we'll log the phrase "Content Added" to our node console.
            else {
              console.log("Song info has been added to log!");
            }
          
          });
      });

    };
} else if (process.argv[2] === "movie-this") {
    var movie = dataArr.join(" ")
    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    // if (!movie) {
    //   movie = "Mr. Nobody"
    // }

    axios.get(queryUrl).then(
        function(response) {
          //console.log(response.data);
          console.log("----------------------------------------------------------");
          console.log("Title: " + response.data.Title);
          console.log("Year Released: " + response.data.Year);
          console.log("IMDB Rating: " + response.data.imdbRating);
          console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
          console.log("Produced In: " + response.data.Country);
          console.log("Language: " + response.data.Language);
          console.log("Plot: " + response.data.Plot);
          console.log("Starring: " + response.data.Actors);
          console.log("-----------------------------------------------------------");

          fs.appendFile("log.txt", "--------------------------------------------------" + "\r\n" + response.data.Title + "\r\n" + response.data.Year + "\r\n" + response.data.imdbRating + "\r\n" + response.data.Ratings[1].Value + "\r\n" + response.data.Country + "\r\n" + response.data.Language + "\r\n" + response.data.Plot + "\r\n" + response.data.Actors + "\r\n" + "--------------------------------------------------", function(err) {

            // If an error was experienced we will log it.
            if (err) {
              console.log(err);
            }
          
            // If no error is experienced, we'll log the phrase "Content Added" to our node console.
            else {
              console.log("Movie info has been added to log!");
            }
          
          });
        })
        .catch(function(error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log("---------------Data---------------");
              console.log(error.response.data);
              console.log("---------------Status---------------");
              console.log(error.response.status);
              console.log("---------------Status---------------");
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an object that comes back with details pertaining to the error that occurred.
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
            console.log(error.config);
        });       
 } 
// else if (process.argv[2] === "movie-this" && dataArr === null) {
//     dataArr.push("Mr.", "Nobody");
//     var movie = dataArr.join(" ");
//     var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

//     axios.get(queryUrl).then(function(response) {
//         console.log(queryUrl);
//     })
    // .catch(function(error) {
    //     if (error.response) {
    //       // The request was made and the server responded with a status code
    //       // that falls out of the range of 2xx
    //       console.log("---------------Data---------------");
    //       console.log(error.response.data);
    //       console.log("---------------Status---------------");
    //       console.log(error.response.status);
    //       console.log("---------------Status---------------");
    //       console.log(error.response.headers);
    //     } else if (error.request) {
    //       // The request was made but no response was received
    //       // `error.request` is an object that comes back with details pertaining to the error that occurred.
    //       console.log(error.request);
    //     } else {
    //       // Something happened in setting up the request that triggered an Error
    //       console.log("Error", error.message);
    //     }
    //     console.log(error.config);
    // });       
//}
else if (process.argv[2] === "do-what-it-says") {
fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    var randomArr = data.split(",");
    
    console.log(randomArr);
    console.log(randomArr[0]);
    console.log(randomArr[1]);
    
    if (randomArr[0] === "concert-this") {
        var artist = randomArr[1];
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
    
    } else if (randomArr[0] === "spotify-this-song") {
      var track = randomArr[1];
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
        console.log("--------------------------------------------------");

        fs.appendFile("log.txt", "--------------------------------------------------" + "\r\n" + data.tracks.items[0].album.artists[0].name + "\r\n" + data.tracks.items[0].name + "\r\n" + data.tracks.items[0].external_urls.spotify + "\r\n" + data.tracks.items[0].album.name + "\r\n" + "--------------------------------------------------", function(err) {

            // If an error was experienced we will log it.
            if (err) {
              console.log(err);
            }
          
            // If no error is experienced, we'll log the phrase "Content Added" to our node console.
            else {
              console.log("Song info has been added to log!");
            }
          
          });
      });

    } else if (randomArr[0] === "movie-this") {
        var movie = randomArr[1]
        var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    
        axios.get(queryUrl).then(
            function(response) {
              //console.log(response.data);
              console.log("----------------------------------------------------------");
              console.log("Title: " + response.data.Title);
              console.log("Year Released: " + response.data.Year);
              console.log("IMDB Rating: " + response.data.imdbRating);
              console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
              console.log("Produced In: " + response.data.Country);
              console.log("Language: " + response.data.Language);
              console.log("Plot: " + response.data.Plot);
              console.log("Starring: " + response.data.Actors);
              console.log("-----------------------------------------------------------");

              fs.appendFile("log.txt", "--------------------------------------------------" + "\r\n" + response.data.Title + "\r\n" + response.data.Year + "\r\n" + response.data.imdbRating + "\r\n" + response.data.Ratings[1].Value + "\r\n" + response.data.Country + "\r\n" + response.data.Language + "\r\n" + response.data.Plot + "\r\n" + response.data.Actors + "\r\n" + "--------------------------------------------------", function(err) {

                // If an error was experienced we will log it.
                if (err) {
                  console.log(err);
                }
              
                // If no error is experienced, we'll log the phrase "Content Added" to our node console.
                else {
                  console.log("Movie info has been added to log!");
                }
              
              });
            })
            .catch(function(error) {
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                  console.log("---------------Data---------------");
                  console.log(error.response.data);
                  console.log("---------------Status---------------");
                  console.log(error.response.status);
                  console.log("---------------Status---------------");
                  console.log(error.response.headers);
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an object that comes back with details pertaining to the error that occurred.
                  console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                  console.log("Error", error.message);
                }
                console.log(error.config);
            });

  
  };
});
};




