var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');


// this will go by individual user id
router.post('/', function(req, res) {
   console.log('req body', req.body);
  var playlist = {
    author: req.body.author,
    author_id: req.body.author_id,
    title: req.body.playlist_name,
    published: new Date(),
    tracklist: req.body.tracks,
    comments: req.body.comments,
    deleted: false
  };

  pg.connect(connection, function(err, client, done) {
    client.query(
      'INSERT INTO playlists (title, author, author_id, published, deleted) VALUES ($1, $2, $3, $4, $5) RETURNING playlist_id',
      [playlist.title, playlist.author, playlist.author_id, playlist.published, playlist.deleted],

      function(err, result) {
        done();
        if (err) {
          console.log('Error inserting data', err);
          res.send(false);
        } else {
          res.send(result);
        }
      });
  });
});

router.get('/:user_id', function(req, res){
  var results = [];
  console.log(req.body.user_id);
  var author_id = req.params.user_id;
  pg.connect(connection, function(err, client, done) {
    var query = client.query('SELECT * ' +
      'FROM playlists ' +
      'WHERE playlists.author_id = ($1) AND playlists.deleted IS NOT true',
      [author_id]);

    //Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    //close connection
    query.on('end', function() {
      done();

      return res.json(results);
    });

    if(err) {
      console.log(err);
    }
  });
});

module.exports = router;
