var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {

  $routeProvider
  .when('/savedPlaylists', {
    templateUrl: '/views/templates/savedPlaylists.html',
    controller: 'savedPlaylistsController'
  })
  .when('/userHome', {
    templateUrl: '/views/templates/userHome.html',
    controller: 'userHomeController'
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
    redirectTo: 'userHome'
  });


}]);
