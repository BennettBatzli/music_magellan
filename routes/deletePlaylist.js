var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');



router.put('/', function(req, res) {
  console.log('req body', req.body.playlist_id);
  var playlist = {
    deleted: true,
    playlist_id: req.body.playlist_id
  };

  pg.connect(connection, function(err, client) {
    client.query(
      'UPDATE playlists SET (deleted) = ($1) WHERE playlist_id = $2',
      [playlist.deleted, playlist.playlist_id],

      function(err, result) {
        if (err) {
          console.log('Error inserting data', err);
          res.send(false);
        } else {
          console.log('it worked');
          res.send(true);
        }
      });
  });
});






module.exports = router;
