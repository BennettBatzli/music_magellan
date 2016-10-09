myApp.controller('discoverMusicController', ['$scope', '$http', 'DataFactory', 'PassportFactory', '$uibModal', '$log', '$sce', function($scope, $http, DataFactory, PassportFactory, $uibModal, $log, $sce) {
  console.log("discover mus controller!");

  $scope.dataFactory = DataFactory;
  $scope.passportFactory = PassportFactory;

  $scope.animationsEnabled = true;

  //$scope.loggedIn = false;
  $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();

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
      console.log('recent', recentPlaylists);
      $scope.recentPlaylists = recentPlaylists;
    });
  })();

  $scope.saveSong = function(song) {
    console.log('I need this song', song);
  };
  //$scope.temporaryPlaylist = {
  //  tracks: [],
  //  playlist_name: "Untitled Playlist",
  //  playlist_id: $scope.playlistID,
  //  author: $scope.loggedInUser.username,
  //  author_id: $scope.loggedInUser.user_id
  //};
  //
  //$scope.addDiscoveredSongs = function(songObject) {
  //
  //  $scope.temporaryPlaylist.tracks.push(songObject);
  //
  //  console.log($scope.temporaryPlaylist);
  //
  //  $scope.temporaryPlaylistArray = $scope.temporaryPlaylist.tracks;
  //
  //  console.log('playlist songs array:', $scope.temporaryPlaylist.tracks);
  //
  //  $scope.discoveredSong = undefined;
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
