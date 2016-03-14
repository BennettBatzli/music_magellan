myApp.controller('addSongsController', ['$scope', '$http', function($scope, $http) {
  console.log("addSongs controller!");

  $scope.addOwnSong = function() {
    $scope.ownSongObject = {
      song: $scope.song,
      artist: $scope.artist,
      album: $scope.album
    };

    $scope.song = '';
    $scope.artist = '';
    $scope.album = '';
    console.log('add song!', $scope.ownSongObject);

    $scope.songChoice = [$scope.ownSongObject];
    console.log('song choiceeee', $scope.songChoice);
  };

}]);
