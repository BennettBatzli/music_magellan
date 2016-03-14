myApp.controller('userHomeController', ['$scope', 'DataFactory', '$http', function($scope, DataFactory, $http){
  console.log("USERRR home controller!");

  $scope.dataFactory = DataFactory;


  $scope.dataFactory.factoryUserAuthenication().then(function(userDatum) {
    $scope.userData = userDatum;
    $scope.userName = userDatum.userName;

    console.log('userdatum:::::', userDatum.userName);
    // $scope.userData = $scope.dataFactory.factoryUserInfo();
    // $scope.userName = $scope.dataFactory.factoryUserInfo().username;
    // console.log('username?', $scope.dataFactory.factoryUserInfo().username);
  });


  $scope.givePlaylistName = function() {
    prompt("What is this playlist called?");
  };

}]);
