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
        var spotify_uri;

        // To keep 3 or less songs displayed at a time.
        if (scope.discoveredSongArray.length >= 3) {
          scope.discoveredSongArray.pop();
        }

        scope.dataFactory.discoverSong(selectedGenre).then(function (discoveredSong) {
          spotify_uri = discoveredSong;

          scope.discoveredSongObject = {
            spotify_uri: spotify_uri
          };

          scope.discoveredSongArray.unshift(scope.discoveredSongObject);
        });
      };
    }
  }
);