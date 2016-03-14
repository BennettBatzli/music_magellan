var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoritesSchema = new Schema({
  "playlist": {
    "playlist_name": String,
    "comments": String,
    "tracklist": [{
      "track_info": {
        "song": String,
        "artist": String,
        "album": String
      }
    }]
  }
});

module.exports = mongoose.model('favorites', favoritesSchema);
