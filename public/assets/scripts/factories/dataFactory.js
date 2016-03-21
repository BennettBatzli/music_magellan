myApp.factory('DataFactory', ['$http', '$window', function($http, $window) {

  //private
  var playlistNames = undefined;

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

  //STILL PRIVATEEEE
  var privateSaveFavorite = function(favorite, id) {
    // console.log('i really hope the id appears!', id);
    console.log('fav!!', favorite);
    var promise = $http.post('/favoritesData/' + id, favorite).then(function(response){
      // console.log('here is post response::', response);
      console.log('this is what i really need: the playlist obj id', response.data);

      // var favoritesArrayData = response.data.favorites;
    });
    console.log('promise::', promise);
    return promise;
  };

  var privateRetrievePlaylistNames = function(playlistID){
    console.log('getting names from datafactory');
    var promise = $http.get('/favoritesData/' + playlistID).then(function(response){
      console.log('get playlist names RESPONSE.data ::', response.data);
      playlistNames = response.data;
    });
    return promise;
  };

  var privateDeletePlaylist = function(playlistID){
    var promise = $http.delete('/favoritesData/' + playlistID).then(function(response){
      console.log('delete playlist RESPONSE.data ::', response.data);
    });
    return promise;
  };

  //public
  var publicApi = {
    factoryUserAuthenication: function() {
      return privateUserAuthentication();
    },
    factorySaveFavorite: function(favorite, id) {
      return privateSaveFavorite(favorite, id);
    },
    factoryRetrievePlaylistNames: function(playlistID) {
      return privateRetrievePlaylistNames(playlistID);
    },
    playlistNameData: function() {
      return playlistNames;
    },
    factoryDeletePlaylist: function(playlistID) {
      return privateDeletePlaylist(playlistID);
    }
  };

  return publicApi;

}]);
