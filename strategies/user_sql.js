var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var encryptLib = require('../modules/encryption');
var connection = require('../modules/connection');
var pg = require('pg');

passport.serializeUser(function(user, done) {
  done(null, user.user_id);
});

passport.deserializeUser(function(id, done) {
//TODO SQL query
  console.log('called deserializeUser');
  pg.connect(connection, function (err, client) {

    var user = {};
    console.log('called deserializeUser - pg');
    var query = client.query("SELECT * FROM users WHERE user_id = $1", [id]);

    query.on('row', function (row) {
      console.log('User row', row);
      user = row;
      done(null, user);
    });

    // After all data is returned, close connection and return results
    query.on('end', function () {
      client.end();
    });

    // Handle Errors
    if (err) {
      console.log(err);
    }
  });
});

// Does actual work of logging in
passport.use('local', new localStrategy({
    passReqToCallback: true,
    usernameField: 'username'
  }, function(req, username, password, done){
    pg.connect(connection, function (err, client) {
      console.log('called local - pg');
      var user = {};
      client.query("SELECT * FROM users WHERE username = $1", [username],


      // callback called when the results are back from the database
      function(err, result) {
        console.log('RESULT: ', result);
        client.end();

        if(result.rowCount > 0) {
          user = result.rows[0];

          // Hash and compare
          if(encryptLib.comparePassword(password, user.password)) {
            // all good!
            console.log('matched');
            done(null, user);
          } else {
            console.log('nope');
            done(null, false, {message: 'Password incorrect.'});
          }
        } else {
          console.log('No matching user');
          done(null, false, {message: 'Incorrect User Name'});
        }

        // Handle Errors
        if (err) {
          console.log(err);
        }
      });
    });
  }
));

module.exports = passport;