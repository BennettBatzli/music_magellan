var myApp = angular.module('myApp', ['ui.router', 'ngAnimate', 'ui.bootstrap']);

myApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/discoverMusic');

  $stateProvider

    .state('discoverMusic', {
      url: '/discoverMusic',
      templateUrl: '../../views/templates/discoverMusic.html',
      controller: 'discoverMusicController'
    })
    .state('about', {
      url: '/about',
      templateUrl: '../../views/templates/about.html'
    })
    .state('signIn', {
      url: '/signIn',
      templateUrl: '../../views/templates/signIn.html',
      controller: 'signInController'
    })
    .state('savedPlaylists', {
      url: '/savedPlaylists',
      templateUrl: '../../views/templates/savedPlaylists.html',
      controller: 'savedPlaylistsController'
    });
});
