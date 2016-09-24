var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');

router.get('/', function(req, res){
  var results = [];
  //console.log(req.body.user_id);
  //var author_id = req.params.user_id;
  pg.connect(connection, function(err, client, done) {
    //var query = client.query('SELECT * ' +
    //  'FROM playlists ' +
    //  'WHERE playlists.author_id = ($1) AND playlists.deleted IS NOT true',
    //  [author_id]);

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
