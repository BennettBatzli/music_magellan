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

    function link(element, scope, attrs) {
      console.log(scope.tune);

    }
  }
);