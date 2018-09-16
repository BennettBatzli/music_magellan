var express = require('express');
var router = express.Router();
var connection = require('../modules/connection');
var pg = require('pg');

router.get('/', function(req, res) {
  var results = [];
  pg.connect(connection, function(err, client, done) {
    var query = client.query('SELECT * FROM genres');

    //Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    //close connection
    query.on('end', function() {
      done();
      console.log('genre results:::::', results);
      return res.json(results);
    });

    if(err) {
      console.log(err);
    }
  });
});

module.exports = router;
