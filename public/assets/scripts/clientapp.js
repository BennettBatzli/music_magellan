var myApp = angular.module('myApp', ['ui.router', 'ngAnimate', 'ui.bootstrap']);

myApp.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider

    .state('home', {
      url: '/home',
      //templateUrl: '../../views/templates/home.html',
      //controller: 'homeController',
      views: {
        'header': {
          templateUrl:'../../views/templates/header.html'
        },
        'nav': {
          templateUrl:'../../views/templates/nav.html',
          controller:'navController'
        },
        'content': {
          template:'<div ui-view></div>'
        },
        'footer': {
          templateUrl:'../../views/templates/footer.html'
        }
      }
    })
    //.state('home', {
    //  url: '/home',
    //  templateUrl: '../../views/templates/home.html',
    //  controller: 'homeController'
    //})
    .state('content.discoverMusic', {
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
