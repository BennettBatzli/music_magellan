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
      'INSERT INTO playlists (title, author, author_id, deleted) VALUES ($1, $2, $3, $4) RETURNING playlist_id',
      [playlist.title, playlist.author, playlist.author_id, playlist.deleted],

      function(err, result) {
        done();
        if (err) {
          console.log('Error inserting data', err);
          res.send(false);
        } else {
          //res.send(true);

          //var sqlString = 'INSERT INTO lesson_tag ( fk_lesson_id, fk_tag_id ) VALUES';
          //for (var i = 0; i < lessonPlan.tags.length; i++){
          //  sqlString = sqlString + '(' + result.rows[0].lesson_id + ',' + lessonPlan.tags[i] + ')';
          //  if (i < (lessonPlan.tags.length - 1)){
          //    sqlString = sqlString + ',';
          //  }
          //}
          console.log('what result', result);
          var sqlString = 'INSERT INTO "songs" ("fk_playlist_id", "song", "artist", "album") VALUES ';
          var song = '';
          var artist = '';
          var album = '';

          for (var i = 0; i < playlist.tracklist.length; i++){
            song = song +  playlist.tracklist[i].song.replace(/'/g, "''");
            artist = artist +  playlist.tracklist[i].artist.replace(/'/g, "''");
            album = album +  playlist.tracklist[i].album.replace(/'/g, "''");

            sqlString = sqlString + '(' + result.rows[0].playlist_id + ', \'' + song + '\', \'' +
              artist + '\', \'' + album + '\')';
            if (i < (playlist.tracklist.length - 1)){
              sqlString = sqlString + ', ';
            }
          }
          console.log('the string', sqlString);

          client.query(sqlString,
            function (err, result) {
              done();
              if(err) {
                console.log("Error inserting data: ", err);
                res.send(false);
              } else {
                res.send(result);
              }
            });
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


//router.get('/:playlist_id', function(req, res){
//  var results = [];
//  console.log('what req.body???', req.body);
//  var playlist_id = req.params.playlist_id;
//  pg.connect(connection, function(err, client, done) {
//    var query = client.query('SELECT * ' +
//      //'FROM playlists ' +
//      //'JOIN songs ON playlists.playlist_id = songs.fk_playlist_id ' +
//      //'WHERE playlists.author_id = ($1) AND playlists.deleted IS NOT true'
//      'FROM songs WHERE playlist_id = ($1)',
//      [playlist_id]);
//
//    //Stream results back one row at a time
//    query.on('row', function(row) {
//      results.push(row);
//    });
//
//    //close connection
//    query.on('end', function() {
//      done();
//
//      return res.json(results);
//    });
//
//    if(err) {
//      console.log(err);
//    }
//  });
//});

//
//router.delete('/:playlistID', function(req, res){
//  console.log('req body', req.body);
//  console.log('req params::', req.params);
//
//  User.findByIdAndRemove(req.params.id, function (err, result) {
//    if(err) {
//        console.log('error message::', err);
//    }
//
//    res.send(result);
//    console.log('sent result', result);
//    // res.send({
//    //       message:'the appointment has been saved'
//    //   });
//  });
//});


// router.get('/:playlistID', function(req, res){
//   console.log('req body', req.body);
//   console.log('req params::', req.params);
  // findBYId? User or would it be deeper?



  // User.find({"favorites._id" : ObjectId("56e98e0ceab36e5db3a4e135")});

// });

module.exports = router;
