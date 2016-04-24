myApp.controller('discoverMusicController', ['$scope', '$http', 'DataFactory', 'PassportFactory', function($scope, $http, DataFactory, PassportFactory) {
  console.log("discover mus controller!");

  $scope.dataFactory = DataFactory;

  $scope.passportFactory = PassportFactory;

  $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();

  if($scope.loggedInUser.username){
    var userName = $scope.loggedInUser.username;
    $scope.loggedInMessage = 'Logged in as ' + userName + '.';
  } else {
    $scope.loggedInMessage = 'You are not logged in! You won\'t be able to save this Playlist!';
  }
  //$scope.dataFactory.factoryUserAuthenication().then(function(userDatum) {
  //  $scope.userData = userDatum;
  //  $scope.id = userDatum.id;
  //  $scope.userName = userDatum.userName;
  //  $scope.favoritesArray = userDatum.favorites;
  //
  //  console.log('userdatum:::::', userDatum.userName);
  //});

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
          // return $scope.animalType;
          getSong();
        }
      );
    } else {
        alert("Please select a genre.");
    }
  };

  // $scope.discoveredSongArray = [];

  function getSong(){
    $scope.discoveredSongObject = {
      song: $scope.tune.items[0].name,
      artist: $scope.tune.items[0].artists[0].name,
      album: $scope.tune.items[0].album.name
    };

    // for (var i = 0; i < $scope.tune.items[0].artists[i].length; i++) {
    //   $scope.discoveredSongObject.artist.push($scope.tune.items[0].artists[i].name);
    //   console.log('ARTISTS IN ARRAY::', $scope.tune.items[0].artists[i].name);
    // }

    // $scope.discoveredSongArray.push($scope.discoveredSongObject);
    $scope.discoveredSong = [$scope.discoveredSongObject];
  }

  // $scope.genreObject = {
    $scope.genres = [{query: "rock", label: "Rock"}, {query: "classical", label: "Classical"},
    {query: "country", label: "Country"}, {query: "electronic", label: "Electronic"},
    {query: "hip%20hop", label: "Hip Hop"}, {query: "indie%20rock", label: "Indie Rock"},
    {query: "jazz", label: "Jazz"}, {query: "metal", label: "Metal"},
    {query: "pop", label: "Pop"}];
  // };
//   $scope.initialGenre = $scope.genres[0].label;
// $scope.selectedGenre = $scope.genres[0].label;
// console.log('selectedgenre', $scope.genres[0].label);

  $scope.temporaryPlaylist = {
    tracks: [],
    playlist_name: "Untitled Playlist"
  };

  $scope.addDiscoveredSongs = function(songObject) {
    console.log('discovered song array::', $scope.discoveredSongArray);

    $scope.temporaryPlaylist.tracks.push(songObject);

    console.log($scope.temporaryPlaylist);

    $scope.temporaryPlaylistArray = [$scope.temporaryPlaylist];
    console.log('playlist songs array:', $scope.temporaryPlaylist.tracks);
  };

  $scope.addOwnSong = function() {
    if ($scope.song && $scope.artist && $scope.album){
      $scope.ownSongObject = {
        song: $scope.song,
        artist: $scope.artist,
        album: $scope.album
      };

      $scope.song = '';
      $scope.artist = '';
      $scope.album = '';
      console.log('add song!', $scope.ownSongObject);

      $scope.songChoice = [$scope.ownSongObject];
      console.log('song choiceeee', $scope.songChoice);

      $scope.temporaryPlaylist.tracks.push($scope.ownSongObject);
      console.log('from added songs:', $scope.temporaryPlaylist.tracks);

      $scope.temporaryPlaylistArray = [$scope.temporaryPlaylist];
    } else{
      alert("Please fill all song info fields");
    }
  };

  $scope.savePlaylist = function(id){
    console.log('discovered song object with ARRay in save playlist function::', $scope.temporaryPlaylist);
    if($scope.loggedInUser.username) {
      $scope.dataFactory.factorySaveFavorite($scope.temporaryPlaylist, id);

      alert('Playlist Saved!');
    } else {
      alert('Cannot save playlist. You must be logged in.')
    }
  };

  $scope.addPlaylistName = function(){
    if($scope.playlistTitle) {
      $scope.temporaryPlaylist.playlist_name = $scope.playlistTitle;
    } else {
      $scope.temporaryPlaylist.playlist_name = "Untitled Playlist";
    }
  };

}]);
