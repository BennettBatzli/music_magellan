myApp.directive('getGenresDirective', [
  function() {
    var directive ={
      controller: 'discoverMusicController',
      link: link,
      templateUrl: '../../../views/templates/getGenres.html',
      restrict: 'EA'
    };
    return directive;

    function link(scope) {
      (function getGenres() {
        scope.dataFactory.getGenres().then(function(genres){
          scope.genres = genres;
          console.log('directive getting genres,', scope.genres);
        });
      })();
    }
  }

]);