# liri-node-app

LIRI is a command line node app that takes in parameters and gives your back data.  You can use LIRI to search Spotify for songs, Bands in Town for concerts, and OMDB for movies.

Other npm packages used: jsdom, jQuery, moment, and fs.

1. To search Spotify for songs, navigate to the root folder and type the following into the terminal:
        `node liri.js spotify-this-song <song name here>`

2. To search Bands in Town for concerts, navigate to the root folder and type the following into the terminal:
        `node liri.js concert-this <artist/band name here>`

3. To search OMBD for movies, navigate to the root folder and type the following into the terminal:
        `node liri.js movie-this <movie title here>`

4. To intake parameters from data random.txt, type data into the random.txt in the following format:
        `command,search term`
    and then type the following into the terminal:
        `node liri.js do-what-it-says`

5. `concert-this` output will log to the terminal, `spotify-this-song` and `movie-this` output will log to both the terminal and log.txt.

6. Here is a YouTube link to a video of my LIRI application in action! [Link to YouTube](https://youtu.be/PPNAZ0Ulxkk)