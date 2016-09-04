var myApp = angular.module('myApp', ['ui.router', 'ngAnimate', 'ui.bootstrap']);

myApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider

    //.state('home', {
    //  url: '/home',
    //  templateUrl: '../../views/templates/home.html',
    //  controller: 'homeController'
    //})
    .state('home.discoverMusic', {
      url: '/discoverMusic',
      templateUrl: '../../views/templates/discoverMusic.html',
      controller: 'discoverMusicController'
    });
    //.state('savedPlaylists', {
    //  url: '/savedPlaylists',
    //  templateUrl: '/views/templates/savedPlaylists.html',
    //  controller: 'savedPlaylistsController'
    //})
    //.state('signIn', {
    //  url: '/signIn',
    //  templateUrl: '/views/templates/signIn.html',
    //  controller: 'signInController'
    //});
});
