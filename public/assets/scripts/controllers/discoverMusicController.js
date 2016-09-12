myApp.controller('discoverMusicController', ['$scope', '$http', 'DataFactory', 'PassportFactory', '$uibModal', '$log', '$sce', function($scope, $http, DataFactory, PassportFactory, $uibModal, $log, $sce) {
  console.log("discover mus controller!");

  $scope.dataFactory = DataFactory;
  $scope.passportFactory = PassportFactory;

  $scope.animationsEnabled = true;

  //$scope.loggedIn = false;
  $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();

  if($scope.loggedInUser.username){
    var userName = $scope.loggedInUser.username;
    $scope.loggedInMessage = 'Logged in as ' + userName + '.';
  } else {
    $scope.loggedInMessage = 'You are not logged in! You won\'t be able to save this Playlist!';
  }

  // genre tags populate for user to select from
  $scope.genres = undefined;
  $http.get('/getGenres').then(function(response){
    console.log('we got genres!!', response.data);
    $scope.genres = response.data;
  });

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
          $scope.uri_link = $sce.trustAsResourceUrl('https://embed.spotify.com/?uri=' + $scope.tune.items[0].uri);
          // return $scope.animalType;
          getSong();
        }
      );
    } else {
        alert("Please select a genre.");
    }
  };

  function getSong(){
    $scope.discoveredSongObject = {
      song: $scope.tune.items[0].name,
      artist: $scope.tune.items[0].artists[0].name,
      album: $scope.tune.items[0].album.name,
      spotify_url: $scope.tune.items[0].external_urls.spotify,
      spotify_uri: $scope.uri_link
    };

    $scope.discoveredSong = [$scope.discoveredSongObject];
  }

  $scope.temporaryPlaylist = {
    tracks: [],
    playlist_name: "Untitled Playlist",
    playlist_id: $scope.playlistID,
    author: $scope.loggedInUser.username,
    author_id: $scope.loggedInUser.user_id
  };

  $scope.addDiscoveredSongs = function(songObject) {

    $scope.temporaryPlaylist.tracks.push(songObject);

    console.log($scope.temporaryPlaylist);

    $scope.temporaryPlaylistArray = $scope.temporaryPlaylist.tracks;

    console.log('playlist songs array:', $scope.temporaryPlaylist.tracks);

    $scope.discoveredSong = undefined;
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

      $scope.temporaryPlaylistArray = $scope.temporaryPlaylist.tracks;
    } else{
      alert("Please fill all song info fields");
    }
  };

  $scope.savePlaylist = function(){

    console.log('discovered song object with ARRay in save playlist function::', $scope.temporaryPlaylist);
    if($scope.loggedInUser.username) {
      $scope.dataFactory.factoryAddSongs($scope.temporaryPlaylist);

      alert('Playlist Saved!');
    } else {
      alert('Cannot save playlist. You must be logged in.')
    }
  };

  $scope.addPlaylistName = function(size){
    //if($scope.playlistTitle) {
    //  $scope.temporaryPlaylist.playlist_name = $scope.playlistTitle;
    //} else {
    //  $scope.temporaryPlaylist.playlist_name = "Untitled Playlist";
    //}
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'addTitleModalContent.html',
      controller: 'newPlaylistModalController',
      size: size,
      resolve: {
        author: function () {
          return $scope.loggedInUser.username
        },
        author_id: function () {
          return $scope.loggedInUser.user_id
        },
        playlistTitle: function () {
          return $scope.playlistTitle
        },
        playlistID: function () {
          return $scope.playlistID
        }
      }
    });

    modalInstance.result.then(function (myPlaylist) {
      $scope.playlistTitle = myPlaylist.playlist_name;
      $scope.playlistID = myPlaylist.playlist_id;
      $scope.temporaryPlaylist.playlist_id = myPlaylist.playlist_id;
      console.log('is this id getting thru', myPlaylist);
      $scope.temporaryPlaylist.playlist_name = myPlaylist.playlist_name;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

}]);
