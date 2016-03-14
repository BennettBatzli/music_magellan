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
  var privateSaveFavorite = function(favorite) {
    console.log('saving fav!!', favorite);
    var promise = $http.post('/favorites', favorite).then(function(response){
      console.log('here is post response::', response);
    });

    return promise;
  }



  //public
  var publicApi = {
    factoryUserAuthenication: function(favorite) {
      return privateUserAuthentication(favorite);
    },
    // factoryUserInfo: function() {
    //   userInfo();
    //   return userData;
    // }
    factorySaveFavorite: function() {
      return privateSaveFavorite();
    },
    factoryRetrieveData: function() {

    },
    playlistData: function() {

    }
  };

  return publicApi;

}]);
