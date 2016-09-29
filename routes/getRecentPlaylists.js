var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');

router.get('/', function(req, res){
  var results = [];

  pg.connect(connection, function(err, client, done) {
    var query = client.query('SELECT * ' +
      'FROM playlists ' +
      'WHERE playlists.deleted IS NOT true ' +
      'ORDER BY published DESC ' +
      'LIMIT 3');
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
