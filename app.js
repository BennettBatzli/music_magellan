var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var mongoose = require('mongoose');

var passport = require('./strategies/user_sql.js');
var session = require('express-session');

// Route includes
var signIn = require('./routes/signIn');
var user = require('./routes/user');
var register = require('./routes/register');
var favoritesData = require('./routes/favoritesData');
var getPlaylistInfo = require('./routes/getPlaylistInfo');
var deletePlaylist = require('./routes/deletePlaylist');
var tracklistData = require('./routes/tracklistData');
var logOut = require('./routes/logOut');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Passport Session Configuration //
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000, secure: false}
}));

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/register', register);
app.use('/user', user);
app.use('/signIn', signIn);
app.use('/favoritesData', favoritesData);
app.use('/getPlaylistInfo', getPlaylistInfo);
app.use('/deletePlaylist', deletePlaylist);
app.use('/tracklistData', tracklistData);
app.use('/logOut', logOut);

// Serve back static files
app.use(express.static('public'));
app.use(express.static('public/views'));
app.use(express.static('public/assets'));
app.use(express.static('public/assets/scripts'));
app.use(express.static('public/assets/styles'));
app.use(express.static('public/vendors'));

//// Mongo Connection //
//var mongoURI = "mongodb://localhost:27017/music_magellan_app";
////var mongoURI = "";
//
//var mongoDB = mongoose.connect(mongoURI).connection;
//
//mongoDB.on('error', function(err){
//   if(err) console.log("MONGO ERROR: ", err);
//});
//
//mongoDB.once('open', function(){
//   console.log("Connected to Mongo, meow!");
//});

app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function() {
  console.log('Listening on port: ', app.get('port'));
});
