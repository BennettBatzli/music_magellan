myApp.controller('savedPlaylistsController', ['$scope', '$http', 'DataFactory', 'PassportFactory', '$location', function($scope, $http, DataFactory, PassportFactory, $location) {
  console.log("saved playlists controller!");


  $scope.dataFactory = DataFactory;

  $scope.passportFactory = PassportFactory;

  $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();

  validateUser();
  function validateUser() {
    if($scope.loggedInUser.username) {
      $scope.userName = $scope.loggedInUser.username;
      getPlaylistNames();

    } else {
      $location.path('/signIn');
    }
  }
  function getPlaylistNames() {
    //if ($scope.dataFactory.playlistNameData() === undefined) {
      $scope.dataFactory.factoryRetrievePlaylistNames($scope.loggedInUser.user_id).then(function() {
        $scope.playlistNames = $scope.dataFactory.playlistNameData();
        console.log('playlist names???', $scope.playlistNames);
      });
    //} else {
    //  $scope.playlistNames = $scope.dataFactory.playlistNameData();
    //}
  }
  //$scope.dataFactory.factoryUserAuthenication().then(function(userDatum) {
  //  $scope.userData = userDatum;
  //  $scope.id = userDatum.id;
  //  $scope.userName = userDatum.userName;
  //  $scope.favoritesArray = userDatum.favoritesArrayData;
  //
  //  console.log('userdatum:::::', userDatum);
  //
  //  console.log('fav arrayyayaya', $scope.favoritesArray);
  //  // $scope.userData = $scope.dataFactory.factoryUserInfo();
  //  // $scope.userName = $scope.dataFactory.factoryUserInfo().username;
  //  // console.log('username?', $scope.dataFactory.factoryUserInfo().username);
  //});

  // $scope.showPlaylist = function() {
  //   userDatum.favoritesArrayData
  // };
  var currentPlaylistID = {};
  $scope.getPlaylistInfo = function(index){
    $scope.isActive = $scope.playlistNames[index];

    console.log('eh?', $scope.playlistNames[index]);
    $scope.dataFactory.factoryGetPlaylistInfo($scope.playlistNames[index].playlist_id).then(function() {
      console.log('well hey');
      $scope.playlistInfo = $scope.dataFactory.playlistInfoData();
      console.log('moneyyyyy', $scope.playlistInfo);
      $scope.showDeletePlaylistButton = true;
    });

    currentPlaylistID = {
      playlist_id: $scope.playlistNames[index].playlist_id
    };

  };

  $scope.deletePlaylist = function(){
    console.log('the playlist ID:', currentPlaylistID);
    $scope.dataFactory.factoryDeletePlaylist(currentPlaylistID);
  };

}]);
