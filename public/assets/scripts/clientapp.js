var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider

    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'homeController'
    })
    .when('/signIn', {
      templateUrl: '/views/templates/signIn.html',
      controller: 'signInController'
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'signInController'
    })
    .when('/discoverMusic', {
      templateUrl: '/views/templates/discoverMusic.html',
      controller: 'discoverMusicController'
    })
    .when('/addSongs', {
      templateUrl: '/views/templates/addSongs.html',
      controller: 'addSongsController'
    })
    .otherwise({
      redirectTo: 'home'
    });

}]);
