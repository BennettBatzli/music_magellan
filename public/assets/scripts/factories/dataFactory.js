myApp.factory('DataFactory', ['$http', '$window', function($http, $window) {

  //private


  // This happens after page load, which means it has authenticated if it was ever going to
  // NOT SECURE

  var privateUserAuthentication = function() {
    var promise = $http.get('/user').then(function (response) {
      if (response.data) {
        var userData = {
        userName: response.data.username,
        id: response.data._id
        };
        console.log('User Data: ', userData);

        return userData;
      } else {
        $window.location.href = '/templates/signIn.html';
      }
    });

    return promise;
  };

  // var userInfo = function() {
  //   console.log('uhhh', userData);
  // };

  //STILL PRIVATEEEE
  var privateSaveFavorite = function(favorite, id) {
    console.log('i really hope the id appears!', id);
    console.log('fav!!', favorite);
    var promise = $http.post('/favoritesData/' + id, favorite).then(function(response){
      console.log('here is post response::', response);
    });
    console.log('promise::', promise);
    return promise;
  };



  //public
  var publicApi = {
    factoryUserAuthenication: function() {
      return privateUserAuthentication();
    },
    // factoryUserInfo: function() {
    //   userInfo();
    //   return userData;
    // }
    factorySaveFavorite: function(favorite, id) {
      return privateSaveFavorite(favorite, id);
    },
    factoryRetrieveData: function() {

    },
    playlistData: function() {

    }
  };

  return publicApi;

}]);
