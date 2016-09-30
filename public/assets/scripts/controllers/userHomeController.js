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

}]);
