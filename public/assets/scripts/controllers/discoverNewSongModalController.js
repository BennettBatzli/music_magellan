myApp.controller('discoverNewSongModalController', ['$scope', '$uibModalInstance', '$http', 'DataFactory', 'playlistID', function ($scope, $uibModalInstance, $http, DataFactory, playlistID) {
  $scope.playlistID = playlistID;
  $scope.dataFactory = DataFactory;

  $scope.genres = [{query: "rock", label: "Rock"}, {query: "classical", label: "Classical"},
    {query: "country", label: "Country"}, {query: "electronic", label: "Electronic"},
    {query: "hip%20hop", label: "Hip Hop"}, {query: "indie%20rock", label: "Indie Rock"},
    {query: "jazz", label: "Jazz"}, {query: "metal", label: "Metal"},
    {query: "pop", label: "Pop"}];

  var randomNumber = function (min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
  };

  $scope.discoverSongs = function() {
    $scope.data = {};

    // var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
    // console.log('the rquest!!!', request);
    // var songsArray = ['*a*', '*o*', '*u*', '*i*', '*e*'];

    // var songsArray = ['*a*', 'a*', '*e*', 'e*', '*i*', 'i*', '*o*', 'o*', '*y*'];

    var songsArray = ['a'];

    // var songsArray = ['%25a%25', 'a%25', '%25e%25', 'e%25', '%25i%25', 'i%25', '%25o%25', 'o%25'];
    var randomTrack = songsArray[Math.floor(Math.random()*songsArray.length)];
    var randomOffset = randomNumber(1, 100);
    // var genre =
    console.log('the wild card', randomTrack);

    if($scope.selectedGenre) {
      var baseURL = "https://api.spotify.com/v1/search";
      var query = "?q=";
      query += "%20genre:%22" + $scope.selectedGenre + "%22";

      query += "&offset=" + randomOffset;
      query += "&limit=1&type=track&callback=JSON_CALLBACK";
      var bestRequest = baseURL + query;

      var coolRequest = "https://api.spotify.com/v1/search?q=randomTrack&offset=randomOffset&limit=1&type=song&callback=JSON_CALLBACK";

      $http.get(bestRequest).then(
        function(response) {
          console.log('response dataaaaa::', response.data);

          console.log('the track name:', response.data.tracks.items[0].name);
          console.log('the artist name:', response.data.tracks.items[0].artists[0].name);

          console.log('the album name:', response.data.tracks.items[0].album.name);

          $scope.tune = response.data.tracks;
          getSong();
        }
      );

    } else {
      alert("Please select a genre.");
    }
  };

  function getSong(){
    $scope.discoveredSongObject = {
      tracks: [ {
      song: $scope.tune.items[0].name,
      artist: $scope.tune.items[0].artists[0].name,
      album: $scope.tune.items[0].album.name }],
      playlist_id: playlistID
    };

    $scope.discoveredSong = [$scope.discoveredSongObject];
  }

  $scope.ok = function () {
    $scope.dataFactory.factoryAddSongs($scope.discoveredSongObject).then(function() {
      $uibModalInstance.close($scope.discoveredSongObject);
    });
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };

}]);
