myApp.controller('savedPlaylistsController', ['$scope', '$http', 'DataFactory', 'PassportFactory', '$uibModal', '$location', '$log', function($scope, $http, DataFactory, PassportFactory, $uibModal, $location, $log) {
  console.log("saved playlists controller!");


  $scope.dataFactory = DataFactory;

  $scope.passportFactory = PassportFactory;

  $scope.animationsEnabled = true;
  var theActivePlaylistName;

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
        $scope.isActive = $scope.playlistNames[theActivePlaylistName];
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
  var currentPlaylistInfo = {};
  $scope.getPlaylistInfo = function(index){
    $scope.isActive = $scope.playlistNames[index];
    theActivePlaylistName = index;

    console.log('eh?', $scope.playlistNames[index]);
    $scope.dataFactory.factoryGetPlaylistInfo($scope.playlistNames[index].playlist_id).then(function() {
      console.log('well hey');
      $scope.playlistInfo = $scope.dataFactory.playlistInfoData();
      console.log('moneyyyyy', $scope.playlistInfo);
      $scope.showPlaylistButtons = true;
    });

    currentPlaylistInfo = {
      playlist_id: $scope.playlistNames[index].playlist_id
    };

  };

  $scope.deletePlaylist = function(){
    console.log('the playlist ID:', currentPlaylistInfo);
    $scope.dataFactory.factoryDeletePlaylist(currentPlaylistInfo);
  };


  $scope.addPlaylistNameModalOpen = function(size){
    //if($scope.playlistTitle) {
    //  $scope.temporaryPlaylist.playlist_name = $scope.playlistTitle;
    //} else {
    //  $scope.temporaryPlaylist.playlist_name = "Untitled Playlist";
    //}
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'addTitleModalContent.html',
      controller: 'newPlaylistModalController',
      size: size,
      resolve: {
        author: function () {
          return $scope.loggedInUser.username
        },
        author_id: function () {
          return $scope.loggedInUser.user_id
        },
        playlistTitle: function () {
          return $scope.playlistTitle
        },
        playlistID: function () {
          return $scope.playlistID
        }
      }
    });

    modalInstance.result.then(function (myPlaylist) {
      console.log('is this id getting thru', myPlaylist);
      $scope.playlistTitle = myPlaylist.playlist_name;
      $scope.playlistID = myPlaylist.playlist_id;
      getPlaylistNames();
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.discoverModalOpen = function(size){
    //if($scope.playlistTitle) {
    //  $scope.temporaryPlaylist.playlist_name = $scope.playlistTitle;
    //} else {
    //  $scope.temporaryPlaylist.playlist_name = "Untitled Playlist";
    //}
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'discoverNewSongModalContent.html',
      controller: 'discoverNewSongModalController',
      size: size,
      resolve: {
        playlistID: function () {
          return currentPlaylistInfo.playlist_id
        }
      }
    });

    modalInstance.result.then(function (myPlaylist) {
      $scope.playlistID = myPlaylist.playlist_id;
      //$scope.temporaryPlaylist.playlist_id = myPlaylist.playlist_id;
      console.log('is this id getting thru', myPlaylist);
      $scope.playlistInfo.push(myPlaylist.tracks[0]);
      //$scope.getPlaylistInfo(myPlaylist.playlist_id);
      //$scope.temporaryPlaylist.playlist_name = myPlaylist.playlist_name;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };



  $scope.addOwnSongModalOpen = function(size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'addOwnSongModalContent.html',
      controller: 'addOwnSongModalController',
      size: size,
      resolve: {
        playlistID: function () {
          return currentPlaylistInfo.playlist_id
        }
      }
    });

    modalInstance.result.then(function (myPlaylist) {
      $scope.playlistID = myPlaylist.playlist_id;
      console.log('is this id getting thru', myPlaylist);
      $scope.playlistInfo.push(myPlaylist.tracks[0]);

    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
}]);
