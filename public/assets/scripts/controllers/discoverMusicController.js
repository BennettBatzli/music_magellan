myApp.controller('discoverMusicController', ['$scope', '$http', 'DataFactory', 'PassportFactory', '$uibModal', '$log', '$sce', function($scope, $http, DataFactory, PassportFactory, $uibModal, $log, $sce) {
  console.log("discover mus controller!");

  $scope.dataFactory = DataFactory;
  $scope.passportFactory = PassportFactory;

  $scope.animationsEnabled = true;

  //$scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();
  //console.log('logged user', $scope.loggedInUser);
  //  .then( function() {
  //    isLoggedIn = true;
  //  }
  //);


  // $scope.$watch(function (scope) {return scope.passportFactory.factoryLoggedInUser()},
  //   function (newValue, oldValue) {
  //     $scope.loggedInUser = newValue;
  //     console.log('new value?', newValue);
  //     validateUser();
  //   }
  // );

  function validateUser() {
    if($scope.loggedInUser.user_id) {
      $scope.loggedIn = true;
    } else {
      $scope.loggedIn = false;
    }
  }

  //token for spotify API
  console.log("Scoocococo: ", $scope.token);
  if($scope.token == undefined) {
    (function getToken() {
      $scope.dataFactory.getToken().then(function(token){
        $scope.token = token;
        console.log("tokekekekeke: ", $scope.token);
      });
    })();
  } else {
    console.log("dsajfdsfkdasl");
  }

  // genre tags populate for user to select from
  (function getGenres() {
    $scope.dataFactory.getGenres().then(function(genres){
      $scope.genres = genres;
    });
  })();

  $scope.discoveredSongArray = [];

  // links to recently created playlists populate for user to select
  (function recentPlaylists() {
    $scope.dataFactory.getRecentPlaylists().then(function(recentPlaylists){
      $scope.recentPlaylists = recentPlaylists;
    });
  })();

  $scope.saveSong = function(song) {
    if($scope.loggedIn) {
      console.log('song?', song);
      console.log('disc', $scope.discoveredSongObject);
      $scope.dataFactory.factoryAddSongs($scope.discoveredSongObject).then(function() {
        console.log('oy');
      });
    } else {
      $scope.loginModal();
    }
  };

  $scope.loginModal = function(size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '../../../views/templates/signInModalContent.html',
      controller: 'signInModalController',
      size: size,
      resolve: {
        username: function () {
          return $scope.passportFactory.loggedInUser;
        }
      }
    });

    modalInstance.result.then(function (user) {
      console.log('is this getting thru', user);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  //$scope.temporaryPlaylist = {
  //  tracks: [],
  //  playlist_name: "Untitled Playlist",
  //  playlist_id: $scope.playlistID,
  //  author: $scope.loggedInUser.username,
  //  author_id: $scope.loggedInUser.user_id
  //};








  $scope.savePlaylist = function(){

    console.log('discovered song object with ARRay in save playlist function::', $scope.temporaryPlaylist);
    if($scope.loggedInUser.username) {
      $scope.dataFactory.factoryAddSongs($scope.temporaryPlaylist);

      alert('Playlist Saved!');
    } else {
      alert('Cannot save playlist. You must be logged in.')
    }
  };

  $scope.addPlaylistName = function(size){
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
      $scope.playlistTitle = myPlaylist.playlist_name;
      $scope.playlistID = myPlaylist.playlist_id;
      $scope.temporaryPlaylist.playlist_id = myPlaylist.playlist_id;
      console.log('is this id getting thru', myPlaylist);
      $scope.temporaryPlaylist.playlist_name = myPlaylist.playlist_name;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

}]);
