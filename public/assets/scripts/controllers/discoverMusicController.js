myApp.controller('discoverMusicController', ['$scope', '$http', 'DataFactory', function($scope, $http, DataFactory) {
  console.log("discover mus controller!");

  $scope.dataFactory = DataFactory;

  var randomNumber = function (min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
  };


  $scope.discoverSongs =function() {
    $scope.data = {};

    // var request = baseURL + encodeURI(query) + '&callback=JSON_CALLBACK';
    // console.log('the rquest!!!', request);


    var songsArray = ['%25a%25', 'a%25', '%25e%25', 'e%25', '%25i%25', 'i%25', '%25o%25', 'o%25'];
    var randomTrack = songsArray[Math.floor(Math.random()*songsArray.length)];
    var randomOffset = randomNumber(1, 100);

    var baseURL = "https://api.spotify.com/v1/search";
    var query = "?q=" + randomTrack;
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
            // return $scope.animalType;
            getSong();
          }
        );
  };

  function getSong(){
    $scope.discoveredSongObject = {
      song: $scope.tune.items[0].name,
      artist: [$scope.tune.items[0].artists[0].name],
      album: $scope.tune.items[0].album.name
    };

    for (var i = 0; i < $scope.tune.items[0].artists[i].length; i++) {
      $scope.discoveredSongObject.artist.push($scope.tune.items[0].artists[i].name);
      console.log('ARTISTS IN ARRAY::', $scope.tune.items[0].artists[i].name);
    }

    $scope.discoveredSong = [$scope.discoveredSongObject];
  }

  $scope.dataFactory.factorySaveFavorite($scope.discoveredSongObject);

}]);
