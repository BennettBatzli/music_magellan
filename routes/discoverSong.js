var express = require('express');
var router = express.Router();
var request = require('request');


function retrieveTrack(selectedGenre,token,callback){
    var baseURL = "https://api.spotify.com/v1/search";
    var query = "?q=";
    query += "genre:%22" + selectedGenre + "%22";
    // query += "genre:%22" + genre + "%22";
    
    var randomNumber = function (min, max){
        return Math.floor(Math.random() * (1 + max - min) + min);
      };
      
    var randomOffset = randomNumber(1, 10000)
    query += "&offset=" + randomOffset;
    query += "&limit=1&type=track&callback=JSON_CALLBACK";
    // var request = baseURL + query;
    var songRequest = baseURL + query;
    var options = {
        url: songRequest,
        headers: {
            'Authorization': 'Bearer ' + token
        },
        json: true 
    };

    request.get(options, function(error, response, body) {
        console.log('body?', body);
        console.log("item", body.tracks.items);
        callback(body.tracks.items);
        
    });
}

// router.get('/:selectedGenre', function(req, res) {
router.get('/', function(req, res) {
// router.post(authOptions, function(error, response, body) {
    console.log('genre? ', req.query.selectedGenre);
    console.log("token? ", JSON.parse(req.query.token));
    var tokenData = JSON.parse(req.query.token);
    // var trackForClient = undefined;
    var token = tokenData["access_token"];    
    var selectedGenre = req.query.selectedGenre;
    
    // console.log("genreeeee???", genre);
    console.log("req.query?", req.query);
    console.log('are we here', req.body);

    retrieveTrack(selectedGenre, token, function(data) {
        res.json(data);
    });
}); 
// if(selectedGenre) {
//     var baseURL = "https://api.spotify.com/v1/search";
//     var query = "?q=";
//     query += "genre:%22" + selectedGenre + "%22";

//     query += "&offset=" + randomOffset;
//     query += "&limit=1&type=track&callback=JSON_CALLBACK";
//     var request = baseURL + query;

//     var promise = $http.get(request).then(
//       function(response) {
//         console.log('response dataaaaa::', response.data);

//         console.log('the track name:', response.data.tracks.items[0].name);
//         console.log('the artist name:', response.data.tracks.items[0].artists[0].name);

//         console.log('the album name:', response.data.tracks.items[0].album.name);

//         var discoveredSong = {
//           tracks: [{
//             song: response.data.tracks.items[0].name,
//             artist: response.data.tracks.items[0].artists[0].name,
//             album: response.data.tracks.items[0].album.name
//           }],
//           spotify_uri: response.data.tracks.items[0].uri
//         };
//         return discoveredSong;
//       }
//     );
//     return promise;

//   } else {
//     alert("Please select a genre.");
//   }
// };

module.exports = router;