myApp.directive('cycleSongsDirective', ['$sce',
  function($sce) {
    var directive = {
      controller: 'discoverMusicController',
      link: link,
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

          console.log('I discovered dis', discoveredSong);
          scope.discoveredSongObject = discoveredSong;
          scope.spotify_uri = $sce.trustAsResourceUrl('https://embed.spotify.com/?uri=' + discoveredSong.spotify_uri);
          //spotify_uri: $sce.trustAsResourceUrl('https://embed.spotify.com/?uri=' + response.data.tracks.items[0].uri)

          //tracks: [ {
            //  //song: $scope.tune.items[0].name,
            //  //artist: $scope.tune.items[0].artists[0].name,
            //  //album: $scope.tune.items[0].album.name,
            //  spotify_uri: discoveredSong
            //}],
            //playlist_id: playlistID
            //spotify_uri: discoveredSong
          //};

          scope.discoveredSongArray.unshift(scope.spotify_uri);
        });
      };
    }
  }
]);