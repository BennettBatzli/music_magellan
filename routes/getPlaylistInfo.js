var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');

router.get('/:playlist_id', function(req, res){
  var results = [];
  var playlist_id = req.params.playlist_id;
  pg.connect(connection, function(err, client, done) {
    var query = client.query('SELECT * ' +
        //'FROM playlists ' +
        //'JOIN songs ON playlists.playlist_id = songs.fk_playlist_id ' +
        //'WHERE playlists.author_id = ($1) AND playlists.deleted IS NOT true'
      'FROM songs WHERE fk_playlist_id = ($1)',
      [playlist_id]);

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