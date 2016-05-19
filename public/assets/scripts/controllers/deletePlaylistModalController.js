myApp.controller('deletePlaylistModalController', ['$scope', '$uibModalInstance', '$http', 'playlistTitle', 'playlistID', function ($scope, $uibModalInstance, $http, playlistTitle, playlistID) {

  $scope.playlistTitle = playlistTitle;

  $scope.ok = function () {
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

}]);