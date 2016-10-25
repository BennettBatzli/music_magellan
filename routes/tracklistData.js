var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');

router.post('/', function(req, res) {
  console.log('req body', req.body);
  var playlist = {
    author: req.body.author,
    author_id: req.body.author_id,
    title: req.body.playlist_name,
    //playlist_id: req.body.playlist_id,
    playlist_id: 1,
    published: new Date(),
    tracklist: req.body.tracks,
    spotify_uri: req.body.spotify_uri,
    comments: req.body.comments,
    deleted: false
  };

  pg.connect(connection, function (err, client, done) {
    var sqlString = 'INSERT INTO "songs" ("fk_playlist_id", "song", "artist", "album", "spotify_uri") VALUES ';
    var song = '';
    var artist = '';
    var album = '';
    var spotifyURI = '';

    for (var i = 0; i < playlist.tracklist.length; i++) {
      song = playlist.tracklist[i].song.replace(/'/g, "''");
      artist = playlist.tracklist[i].artist.replace(/'/g, "''");
      album = playlist.tracklist[i].album.replace(/'/g, "''");
      if (playlist.spotify_uri) {
        spotifyURI = playlist.spotify_uri.replace(/'/g, "''");
      }

      sqlString = sqlString + '(\'' + playlist.playlist_id + '\', \'' + song + '\', \'' +
        artist + '\', \'' + album + '\', \'' + spotifyURI + '\')';
      if (i < (playlist.tracklist.length - 1)) {
        sqlString = sqlString + ', ';
      }
    }
    console.log('the string', sqlString);

    client.query(sqlString,
      function (err, result) {
        done();
        if (err) {
          console.log("Error inserting data: ", err);
          res.send(false);
        } else {
          res.send(result);
        }
      });
  });
});

module.exports = router;
