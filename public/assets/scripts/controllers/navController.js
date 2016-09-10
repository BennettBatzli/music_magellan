myApp.controller('navController', ['$scope', 'PassportFactory', function($scope, PassportFactory) {

  $scope.passportFactory = PassportFactory;

  //True/false variables that are tied to what's shown on the page based on the logged-in user
  $scope.loggedIn = false;

  //store the logged-in user
  $scope.loggedInUser = {};

  //Gets the information from the factory about who is logged in and calls
  $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();

  $scope.$watch(function (scope) {return scope.passportFactory.factoryLoggedInUser()},
    function (newValue, oldValue) {
      $scope.loggedInUser = newValue;
      console.log('new value?', newValue);
      validateUser();
    }
  );

  function validateUser() {
    if($scope.loggedInUser.user_id) {
      $scope.loggedIn = true;
    } else {
      $scope.loggedIn = false;
    }
  }

  //$scope.reloadRoute = function() {
  //  $route.reload();
  //};

  $scope.logout = function() {
    $scope.passportFactory.factoryLogoutUser().then(function () {
      validateUser();
    });
  }
}]);