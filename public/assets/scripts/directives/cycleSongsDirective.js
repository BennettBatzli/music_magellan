myApp.directive('cycleSongsDirective',
  function() {
    var directive = {
      controller: 'discoverMusicController',
      link: link,
      //scope: {
      //  info: '='
      //},
      templateUrl: '../../../views/templates/cycleSongs.html',
      restrict: 'EA'
    };
    return directive;

    function link(scope, element, attrs) {
      scope.discoverSongs = function(selectedGenre) {

        // To keep 3 or less songs displayed at a time.
        if (scope.discoveredSongArray.length >= 3) {
          scope.discoveredSongArray.pop();
        }

        scope.dataFactory.discoverSong(selectedGenre).then(function (discoveredSong) {

          scope.discoveredSongObject = {
            spotify_uri: discoveredSong
          };

          scope.discoveredSongArray.unshift(scope.discoveredSongObject);
        });
      };
    }
  }
);