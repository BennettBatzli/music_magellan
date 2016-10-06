myApp.controller('navController', ['$scope', 'PassportFactory', '$uibModal', '$log', '$state', function($scope, PassportFactory, $uibModal, $log, $state) {

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
      $state.go('discoverMusic.savedPlaylists');
      $scope.loggedIn = true;
    } else {
      $scope.loggedIn = false;
    }
  }

  //$scope.reloadRoute = function() {
  //  $route.reload();
  //};

  $scope.loginModal = function(size) {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '../../../views/templates/signInModalContent.html',
      controller: 'signInModalController',
      size: size,
      resolve: {
        username: function () {
          return $scope.passportFactory.loggedInUser;
        }
      }
    });

    modalInstance.result.then(function (user) {
      //$scope.playlistID = myPlaylist.playlist_id;
      console.log('is this getting thru', user);
      //$scope.playlistInfo.push(myPlaylist.tracks[0]);
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.logout = function() {
    $scope.passportFactory.factoryLogoutUser().then(function () {
      validateUser();
    });
  }
}]);