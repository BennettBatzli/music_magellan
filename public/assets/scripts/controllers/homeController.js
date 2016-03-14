myApp.controller('homeController', ['$scope', function($scope) {
  // console.log("home controller!");
  // $scope.dataFactory = DataFactory;
  //
  // $scope.mrUser = $scope.dataFactory.factoryUserAuthenication();
  //
  // console.log('USERRRRRRR:::::', $scope.mrUser);

  $scope.givePlaylistName = function() {
    prompt("What is this playlist called?");
  };

}]);
