var myApp = angular.module('myApp', ['ui.router', 'ngAnimate', 'ui.bootstrap']);

myApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/discoverMusic');

  $stateProvider

    .state('discoverMusic', {
      url: '/discoverMusic',
      templateUrl: '../../views/templates/discoverMusic.html',
      controller: 'discoverMusicController'
    });

});
