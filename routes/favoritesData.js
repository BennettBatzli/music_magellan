var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Favorite = require('../models/favorites');
// var mongoose = require('mongoose');
// mongoose.set('debug', true);
// var errorHelper = require('mongoose-error-helper').errorHelper;


// this will go by individual user id
router.post('/:id', function(req, res) {
  // console.log('req body', req.body);
  // console.log('req params::', req.params);
  User.findById(req.params.id, function (err, result) {

      // console.log('RESULT', result);
      // console.log('result favorite::', result.favorites);
console.log('trackkkkk', req.body.tracks[2].song);

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
            },
            "track_three_info": {
              "song": req.body.tracks[2].song,
              "artist": req.body.tracks[2].artist,
              "album": req.body.tracks[2].album
            },
            "track_four_info": {
              "song": req.body.tracks[3].song,
              "artist": req.body.tracks[3].artist,
              "album": req.body.tracks[3].album
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

          res.send(result);
          console.log('sent result', result);
          // res.send({
          //       message:'the appointment has been saved'
          //   });
      });

  });

});

router.delete('/:playlistID', function(req, res){
  console.log('req body', req.body);
  console.log('req params::', req.params);

  User.findByIdAndRemove(req.params.id, function (err, result) {
    if(err) {
        console.log('error message::', err);
    }

    res.send(result);
    console.log('sent result', result);
    // res.send({
    //       message:'the appointment has been saved'
    //   });
  });
});


// router.get('/:playlistID', function(req, res){
//   console.log('req body', req.body);
//   console.log('req params::', req.params);
  // findBYId? User or would it be deeper?



  // User.find({"favorites._id" : ObjectId("56e98e0ceab36e5db3a4e135")});

// });

module.exports = router;
