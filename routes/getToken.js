var express = require('express');
var router = express.Router();
var request = require('request');
// var requestedToken = require("./submitTokenCredentials.js");

// var client_id = '18f8b2b026524ad3a15fff1e652242de'; // Your client id
// var client_secret = '307e5451145a49b6abc06f2c9cd269d4'; // Your secret
// var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: {
//       'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//     },
//     form: {
//       grant_type: 'client_credentials'
//     },
//     json: true
// };
// console.log("a token perhaps", requestedToken);
function retrieveToken(callback){
    var client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
    var client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
          grant_type: 'client_credentials'
        },
        json: true
    };

    request(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('we in?');
            // use the access token to access the Spotify Web API
            var token = body.access_token;
            // console.log("token: ", token)
            // tokenAuth.push(token); 
            // return token;
            callback(body);
        }
    });

}

router.get('/', function(req, res) {
    retrieveToken( function(data) {
        res.json(data);
    });
    // var body = retrieveToken();
    // console.log('bodttttt: ', body);
    // console.log("oy", res.json(requestedToken));

    // console.log("genreeeee???", genre);
    // console.log("req.query?", req.query)
    // console.log('are we here', req.body);
    // aquiredToken = undefined;
    // request.post(authOptions, function(error, response, body) {
        
    //     // console.log('are we posting? heres the body::', body);
    //     if (!error && response.statusCode === 200 && typeof genre === 'undefined' || genre === null) {
    //         console.log('we in?');
    //         // use the access token to access the Spotify Web API
    //         var token = body.access_token;
    //         console.log("token: ", token)
    //         return token;
    //         // aquiredToken = token;
    //         // var baseURL = "https://api.spotify.com/v1/search";
    //         // var query = "?q=";
    //         // query += "genre:%22" + selectedGenre + "%22";
    //         // // query += "genre:%22" + genre + "%22";
            
    //         // // query += "&offset=" + randomOffset;
    //         // query += "&limit=1&type=track&callback=JSON_CALLBACK";
    //         // // var request = baseURL + query;
    //         // var songRequest = baseURL + query;
            
    //         // // var options = {
    //         // // url: 'https://api.spotify.com/v1/users/1270725137',
    //         // // headers: {
    //         // //     'Authorization': 'Bearer ' + token
    //         // // },
    //         // // json: true
    //         // // };
    //         // var options = {
    //         // url: songRequest,
    //         // headers: {
    //         //     'Authorization': 'Bearer ' + token
    //         // },
    //         // json: true 
    //         // };
    //         // trackObject = request.get(options, function(error, response, body) {
    //         //     console.log('body?', body);
    //         //     console.log("item", body.tracks.items);
    //         //     return body.tracks.items;
                
    //         // });
    //     }
        
    // });
    // console.log("token auth: ", aquiredToken);
    // res.send({track: trackForClient});
    // res.send(aquiredToken);
}); 

module.exports = router;