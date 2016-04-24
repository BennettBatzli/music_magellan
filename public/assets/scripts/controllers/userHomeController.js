myApp.controller('userHomeController', ['$scope', 'DataFactory', 'PassportFactory', '$location', '$http', function($scope, DataFactory, PassportFactory, $location, $http){
  console.log("USERRR home controller!");

  $scope.dataFactory = DataFactory;

  $scope.passportFactory = PassportFactory;

  $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();

  validateUser();

  function validateUser() {
    if($scope.loggedInUser.username) {
      $scope.userName = $scope.loggedInUser.username;

    } else {
      $location.path('/home');
    }
  }

  //$scope.dataFactory.factoryUserAuthenication().then(function(userDatum) {
  //  $scope.userData = userDatum;
  //  $scope.userName = userDatum.userName;
  //
  //  console.log('userdatum:::::', userDatum.userName);
  //
  //
  //   //$scope.userData = $scope.dataFactory.factoryUserInfo();
  //
  //
  //  // $scope.userName = $scope.dataFactory.factoryUserInfo().username;
  //  // console.log('username?', $scope.dataFactory.factoryUserInfo().username);
  //});


  // $scope.givePlaylistName = function() {
  //   prompt("What is this playlist called?");
  // };

}]);
