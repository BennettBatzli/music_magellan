
myApp.controller('newPlaylistModalController', ['$scope', '$uibModalInstance', 'DataFactory', 'author', 'author_id', 'playlistTitle', function ($scope, $uibModalInstance, DataFactory, author, author_id, playlistTitle) {

  $scope.dataFactory = DataFactory;

  $scope.author = author;
  $scope.author_id = author_id;
  $scope.playlistTitle = playlistTitle;
  //$scope.selected = {
  //  item: $scope.items[0]
  //};
  $scope.myPlaylist = {
    tracks: [],
    playlist_name: 'Untitled Playlist',
    author: $scope.author,
    author_id: $scope.author_id
  };

  console.log('myplaylist::', $scope.myPlaylist);
  $scope.ok = function () {
    //$uibModalInstance.close($scope.selected.item);
    $scope.myPlaylist.playlist_name = $scope.playlistTitle;
    console.log('hello?', $scope.myPlaylist);
    $scope.dataFactory.factorySaveFavorite($scope.myPlaylist).then(function(returnedPromise){
      console.log('YAYYY new created playlist', returnedPromise);
      $uibModalInstance.close();

    });
    //$uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);
