// var express = require('express');
// var router = express.Router();
var request = require('request');

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
            console.log("token: ", token)
            // tokenAuth.push(token); 
            return token;
            // callback(JSON.parse(body));
        }
    });

}




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
// // var tokenAuth = [];
// request.post(authOptions, function(error, response, body) {
    
//     // console.log('are we posting? heres the body::', body);
//     if (!error && response.statusCode === 200) {
//         console.log('we in?');
//         // use the access token to access the Spotify Web API
//         var token = body.access_token;
//         console.log("token: ", token)
//         // tokenAuth.push(token); 
//         // return token;
//         return callback(JSON.parse(body));
//     }
    
//     // // console.log('response?', body);
//     // var selectedGenre = "country"
    
//     // // console.log("genreeeee???", genre);


//     // var baseURL = "https://api.spotify.com/v1/search";
//     // var query = "?q=";
//     // query += "genre:%22" + selectedGenre + "%22";
//     // // query += "genre:%22" + genre + "%22";
    
//     // // query += "&offset=" + randomOffset;
//     // query += "&limit=1&type=track&callback=JSON_CALLBACK";
//     // // var request = baseURL + query;
//     // var songRequest = baseURL + query;
//     // var options = {
//     //     url: songRequest,
//     //     headers: {
//     //         'Authorization': 'Bearer ' + token
//     //     },
//     //     json: true 
//     // };
//     // return request.get(options, function(error, response, body) {
//     //     // console.log('body?', body);
//     //     console.log("item", body.tracks.items[0].uri);
//     //     return body.tracks.items;
        
//     // });
// });

// console.log("tokenenenenen: ", retrieveToken);
module.exports = retrieveToken;