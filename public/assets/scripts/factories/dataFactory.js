myApp.factory('DataFactory', ['$http', '$window', '$sce', function($http, $window, $sce) {

  //private
  var playlistNames = undefined;
  var playlistInfo = undefined;

  var playlistID = undefined;

  var uriLink = undefined;

  var genres = undefined;

  var token = undefined;

  // This happens after page load, which means it has authenticated if it was ever going to
  // NOT SECURE

  var privateSaveFavorite = function(favorite) {
    console.log('fav!!', favorite);
    var promise = $http.post('/favoritesData/', favorite).then(function(response){
      // console.log('here is post response::', response);
      console.log('this is what i really need: the playlist id', response.data.rows[0].playlist_id);
      playlistID = response.data.rows[0].playlist_id;

      // var favoritesArrayData = response.data.favorites;
    });
    console.log('promise::', promise);
    return promise;
  };

  var privateRetrievePlaylistNames = function(userID){
    var promise = $http.get('/favoritesData/' + userID).then(function(response){
      console.log('get playlist names RESPONSE.data ::', response.data);
      playlistNames = response.data;
    });
    return promise;
  };

  var privateGetPlaylistInfo = function(playlistID){
    console.log('is it', playlistID);
    var promise = $http.get('/getPlaylistInfo/' + playlistID).then(function(response){
      console.log('get playlistInfo!!', response.data);
      playlistInfo = response.data;
    });
    return promise;
  };

  var privateDeletePlaylist = function(playlistID) {
    console.log('datafactory playlist id', playlistID);
    var promise = $http.put('/deletePlaylist/', playlistID).then(function(response) {
      console.log('delete playlist RESPONSE.data ::', response.data);
    });
    return promise;
  };

  var privateAddSongs = function(playlistID){
    var promise = $http.post('/tracklistData/', playlistID).then(function(response) {
      console.log('add songs post call RESPONSE.data ::', response.data);
    });
    return promise;
  };

  var randomNumber = function (min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
  };

  var privateGetToken = function() {
    var promise = $http.get('/getToken/').then(function(response){
      console.log("get tokennnn: ", response.data);
      return response.data;
    });
    return promise;
  };

  var privateDiscoverSong = function(selectedGenre, token) {
    console.log('datafactory genre', selectedGenre);
    console.log('token: ', token)
    // var genreObject = {myGenre: selectedGenre};
    // var promise = $http.get('/discoverSong/', selectedGenre).then(function(response) {
    var promise = $http.get('/discoverSong/', {params: {selectedGenre: selectedGenre, token: token}}).then(function(response) {
      return response.data;  
      // console.log('DISCOVER SONGS CALL RESPONSE.data ::', response.data);
    });
    return promise;

    //$scope.data = {};
     //var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
    // console.log('the rquest!!!', request);
    // var songsArray = ['*a*', '*o*', '*u*', '*i*', '*e*'];

    // var songsArray = ['*a*', 'a*', '*e*', 'e*', '*i*', 'i*', '*o*', 'o*', '*y*'];

    // var songsArray = ['a'];

    // // var songsArray = ['%25a%25', 'a%25', '%25e%25', 'e%25', '%25i%25', 'i%25', '%25o%25', 'o%25'];
    // var randomTrack = songsArray[Math.floor(Math.random()*songsArray.length)];
    // var randomOffset = randomNumber(1, 100);

    // console.log('the wild card', randomTrack);

    // if(selectedGenre) {
    //   var baseURL = "https://api.spotify.com/v1/search";
    //   var query = "?q=";
    //   query += "genre:%22" + selectedGenre + "%22";

    //   query += "&offset=" + randomOffset;
    //   query += "&limit=1&type=track&callback=JSON_CALLBACK";
    //   var request = baseURL + query;

    //   var promise = $http.get(request).then(
    //     function(response) {
    //       console.log('response dataaaaa::', response.data);

    //       console.log('the track name:', response.data.tracks.items[0].name);
    //       console.log('the artist name:', response.data.tracks.items[0].artists[0].name);

    //       console.log('the album name:', response.data.tracks.items[0].album.name);

    //       var discoveredSong = {
    //         tracks: [{
    //           song: response.data.tracks.items[0].name,
    //           artist: response.data.tracks.items[0].artists[0].name,
    //           album: response.data.tracks.items[0].album.name
    //         }],
    //         spotify_uri: response.data.tracks.items[0].uri
    //       };
    //       return discoveredSong;
    //     }
    //   );
    //   return promise;

    // } else {
    //   alert("Please select a genre.");
    // }
  };

  var privateGetGenres = function(){
    var promise = $http.get('/getGenres').then(function(response){
      return response.data;
    });
    return promise;
  };

  var privateGetRecentPlaylists = function(){
    var promise = $http.get('/getRecentPlaylists').then(function(response){
      return response.data;
    });
    return promise;
  };

  //public
  var publicApi = {
    factoryUserAuthenication: function() {
      return privateUserAuthentication();
    },
    getGenres: function() {
      return privateGetGenres();
    },
    getRecentPlaylists: function() {
      return privateGetRecentPlaylists();
    },
    getToken: function() {
      return privateGetToken();
    },
    // retrieveToken: function() {
    //   return token;
    // },
    discoverSong: function(selectedGenre, token) {
      return privateDiscoverSong(selectedGenre, token);
    },
    factorySaveFavorite: function(favorite) {
      return privateSaveFavorite(favorite);
    },
    factoryRetrievePlaylistNames: function(userID) {
      return privateRetrievePlaylistNames(userID);
    },
    playlistNameData: function() {
      return playlistNames;
    },
    factoryGetPlaylistInfo: function(playlistID) {
      return privateGetPlaylistInfo(playlistID);
    },
    playlistInfoData: function() {
      return playlistInfo;
    },
    factoryDeletePlaylist: function(playlistID) {
      return privateDeletePlaylist(playlistID);
    },
    factoryAddSongs: function(playlistID) {
      return privateAddSongs(playlistID);
    },
    factoryPlaylistID: function(){
      return playlistID;
    }
  };

  return publicApi;

}]);
