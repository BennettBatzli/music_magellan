myApp.controller('addOwnSongModalController', ['$scope', '$uibModalInstance', '$http', 'DataFactory', 'playlistID', function ($scope, $uibModalInstance, $http, DataFactory, playlistID) {

  $scope.playlistID = playlistID;
  $scope.dataFactory = DataFactory;


  $scope.addOwnSong = function() {
    if ($scope.song && $scope.artist && $scope.album){
      $scope.ownSongObject = {
        tracks: [ {
          song: $scope.song,
          artist: $scope.artist,
          album: $scope.album }],
        playlist_id: playlistID
      };

      $scope.song = '';
      $scope.artist = '';
      $scope.album = '';

    } else{
      alert("Please fill all song info fields");
    }
  };

  $scope.ok = function () {
    $scope.dataFactory.factoryAddSongs($scope.ownSongObject).then(function(){
      $uibModalInstance.close($scope.ownSongObject);

    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };


}]);
