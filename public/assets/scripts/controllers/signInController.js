myApp.controller('signInController', ['$scope', 'DataFactory', '$http', function($scope, DataFactory, $http) {
  // $scope.userName;
  $scope.dataFactory = DataFactory;

  $scope.signInUser = function() {
    $scope.user = {
      username: $scope.username,
      // password: $scope.password
    };

    console.log('user object thing:: ', $scope.user);
    // $scope.dataFactory.factoryUserAuthenication();
  };

  // $scope.dataFactory.factoryUserAuthenication().then(function() {
  //   $scope.userData = $scope.dataFactory.factoryUserInfo();
  //   $scope.userName = $scope.dataFactory.factoryUserInfo().username;
  // });
// $scope.userName = $scope.dataFactory.factoryUserInfo().username;

  console.log('userNAME???', $scope.userName);


  // // This happens after page load, which means it has authenticated if it was ever going to
  // // NOT SECURE
  // $http.get('/user').then(function (response) {
  //   if (response.data) {
  //     console.log(response.data.username);
  //     $scope.userName = response.data.username;
  //     console.log('User Data: ', $scope.userName);
  //   } else {
  //     $window.location.href = '/index.html';
  //   }
  // });

}]);
