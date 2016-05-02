myApp.factory('DataFactory', ['$http', '$window', function($http, $window) {

  //private
  var playlistNames = undefined;
  var playlistInfo = undefined;


  // This happens after page load, which means it has authenticated if it was ever going to
  // NOT SECURE

  var privateUserAuthentication = function() {
    var promise = $http.get('/user').then(function (response) {
      if (response.data) {
        console.log('response.dataaaaaaa', response.data);
        var userData = {
        userName: response.data.username,
        id: response.data._id,
        favoritesArrayData: response.data.favorites
        };
        console.log('User Data: ', userData);
        console.log('response of fav array?', response.data.favorites);

        return userData;
      } else {
        $window.location.href = '/templates/signIn.html';
      }
    });

    return promise;
  };

  var privateSaveFavorite = function(favorite) {
    console.log('fav!!', favorite);
    var promise = $http.post('/favoritesData/', favorite).then(function(response){
      // console.log('here is post response::', response);
      console.log('this is what i really need: the playlist obj id', response.data);

      // var favoritesArrayData = response.data.favorites;
    });
    console.log('promise::', promise);
    return promise;
  };

  var privateRetrievePlaylistNames = function(userID){
    console.log('getting names from datafactory');
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
    var promise = $http.delete('/favoritesData/' + playlistID).then(function(response) {
      console.log('delete playlist RESPONSE.data ::', response.data);
    });
    return promise;
  };

  //public
  var publicApi = {
    factoryUserAuthenication: function() {
      return privateUserAuthentication();
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
    }
  };

  return publicApi;

}]);
