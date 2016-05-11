
myApp.controller('newPlaylistModalController', ['$scope', '$uibModalInstance', 'DataFactory', 'author', 'author_id', 'playlistTitle', 'playlistID', function ($scope, $uibModalInstance, DataFactory, author, author_id, playlistTitle, playlistID) {

  $scope.dataFactory = DataFactory;

  $scope.author = author;
  $scope.author_id = author_id;
  $scope.playlistTitle = playlistTitle;
  $scope.playlistID = playlistID;
  //$scope.selected = {
  //  item: $scope.items[0]
  //};
  $scope.myPlaylist = {
    tracks: [],
    playlist_name: 'Untitled Playlist',
    author: $scope.author,
    author_id: $scope.author_id,
    playlist_id: null
  };

  console.log('myplaylist::', $scope.myPlaylist);
  $scope.ok = function () {
    //$uibModalInstance.close($scope.selected.item);
    $scope.myPlaylist.playlist_name = $scope.playlistTitle;
    console.log('hello?', $scope.myPlaylist);
    $scope.dataFactory.factorySaveFavorite($scope.myPlaylist).then(function(){
      $scope.playlistID = $scope.dataFactory.factoryPlaylistID();
      $scope.myPlaylist.playlist_id = $scope.playlistID;
      console.log('ID>???', $scope.playlistID);
      $uibModalInstance.close($scope.myPlaylist);

    });
    //$uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);
