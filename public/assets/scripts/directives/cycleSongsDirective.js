myApp.directive('cycleSongsDirective',
  function() {
    var directive = {
      link: link,
      scope: {
        discoveredSongArray: '='
      },
      templateUrl: '../../../views/templates/cycleSongs.html',
      controller: 'discoverMusicController',
      restrict: 'EA'
    };
    return directive;

    function link() {

    }
  }
);