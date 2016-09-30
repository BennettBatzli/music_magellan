myApp.controller('signInModalController', ['$scope', 'DataFactory', 'PassportFactory', '$http', '$location', '$uibModalInstance', function($scope, DataFactory, PassportFactory, $http, $location, $uibModalInstance) {
  $scope.dataFactory = DataFactory;
  $scope.passportFactory = PassportFactory;

  $scope.loginUser = function (username, password) {
    $scope.passportFactory.factoryUserSubmit(username, password).then(function(response){
      console.log('responze', response);
      return response;
    });
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
}]);
