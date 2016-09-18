myApp.controller('discoverMusicController', ['$scope', '$http', 'DataFactory', 'PassportFactory', '$uibModal', '$log', '$sce', function($scope, $http, DataFactory, PassportFactory, $uibModal, $log, $sce) {
  console.log("discover mus controller!");

  $scope.dataFactory = DataFactory;
  $scope.passportFactory = PassportFactory;

  $scope.animationsEnabled = true;

  //$scope.loggedIn = false;
  $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();

  //if($scope.loggedInUser.username){
  //  var userName = $scope.loggedInUser.username;
  //  $scope.loggedInMessage = 'Logged in as ' + userName + '.';
  //} else {
  //  $scope.loggedInMessage = 'You are not logged in! You won\'t be able to save this Playlist!';
  //}

  // genre tags populate for user to select from
  $scope.genres = undefined;
  $http.get('/getGenres').then(function(response){
    $scope.genres = response.data;
  });

  //var randomNumber = function (min, max){
  //  return Math.floor(Math.random() * (1 + max - min) + min);
  //};

  $scope.discoveredSongArray = [];

  $scope.discoverSongs = function(selectedGenre) {

    var spotify_uri;

    $scope.dataFactory.discoverSong(selectedGenre).then(function(discoveredSong){
      spotify_uri = discoveredSong;


      $scope.discoveredSongObject = {
        spotify_uri: spotify_uri
      };

      // To keep 3 or less songs displayed at a time.
      if ($scope.discoveredSongArray.length <= 2) {
        $scope.discoveredSongArray.unshift($scope.discoveredSongObject);
      } else {
        $scope.discoveredSongArray.pop();
        $scope.discoveredSongArray.unshift($scope.discoveredSongObject);
      }
    });
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
