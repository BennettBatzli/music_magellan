var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Favorite = require('../models/favorites');
// var mongoose = require('mongoose');
// mongoose.set('debug', true);
// var errorHelper = require('mongoose-error-helper').errorHelper;


// this will go by individual user id... I believe
router.post('/:id', function(req, res) {
  console.log('req body', req.body);

  // var newFavorite = new Favorite({
  //
  //   "playlist": {
  //     "playlist_name": req.body.playlist_name,
  //     "comments": req.body.comments,
  //     "tracklist": [{
  //       "track_info": {
  //         "song": req.body.song,
  //         "artist": req.body.artist,
  //         "album": req.body.album
  //       }
  //     }]
  //   }
  //
  // });
  // console.log('newfave: ', newFavorite);
  // console.log('request params id::', req.params.id);

  User.findById(req.params.id, function (err, result) {

      // console.log('RESULT', result);
      // console.log('result favorite::', result.favorites);


      // result.favorites = newFavorite;
      var fav = new Favorite({
        "playlist": {
          "playlist_name": req.body.playlist_name,
          "comments": req.body.comments,
          "tracklist": [{
            "track_one_info": {
              "song": req.body.tracks[0].song,
              "artist": req.body.tracks[0].artist,
              "album": req.body.tracks[0].album
            },
            "track_two_info": {
              "song": req.body.tracks[1].song,
              "artist": req.body.tracks[1].artist,
              "album": req.body.tracks[1].album
            }
          }]
        }

      });
      result.favorites.push(fav);
      // console.log('a fav, ', result.favorites[2].playlist);
      // result.favorites[2].playlist.tracklist[0].track_info.song = "howdy doody";

      result.save(function(err, result){
          if(err) {
              console.log('error message::', err);
          }

          // res.send(result);
          console.log('sent result', result);
          res.send({
                message:'the appointment has been saved'
            });
      });

  });

});

module.exports = router;
