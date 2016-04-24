myApp.controller('savedPlaylistsController', ['$scope', '$http', 'DataFactory', 'PassportFactory', '$location', function($scope, $http, DataFactory, PassportFactory, $location) {
  console.log("saved playlists controller!");


  $scope.dataFactory = DataFactory;

  $scope.passportFactory = PassportFactory;

  $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();

  validateUser();

  function validateUser() {
    if($scope.loggedInUser.username) {
      $scope.userName = $scope.loggedInUser.username;

    } else {
      $location.path('/home');
    }
  }

  // if ($scope.dataFactory.playlistNameData() === undefined){
  //   $scope.dataFactory.factoryRetrievePlaylistNames().then(function(){
  //     $scope.playlistNames = $scope.dataFactory.playlistNameData();
  //   });
  // } else {
  //   $scope.playlistNames = $scope.dataFactory.playlistNameData();
  // }

  $scope.dataFactory.factoryUserAuthenication().then(function(userDatum) {
    $scope.userData = userDatum;
    $scope.id = userDatum.id;
    $scope.userName = userDatum.userName;
    $scope.favoritesArray = userDatum.favoritesArrayData;

    console.log('userdatum:::::', userDatum);

    console.log('fav arrayyayaya', $scope.favoritesArray);
    // $scope.userData = $scope.dataFactory.factoryUserInfo();
    // $scope.userName = $scope.dataFactory.factoryUserInfo().username;
    // console.log('username?', $scope.dataFactory.factoryUserInfo().username);
  });

  // $scope.showPlaylist = function() {
  //   userDatum.favoritesArrayData
  // };

  $scope.deletePlaylist = function(playlistID){
    console.log('the playlist ID:', playlistID);
    $scope.dataFactory.factoryDeletePlaylist(playlistID);
  };

}]);
