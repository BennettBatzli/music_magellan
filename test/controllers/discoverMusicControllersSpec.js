// Describe out test: we are testing the HomeController
describe('Controller: discoverMusicController', function() {

  beforeEach(module('myApp'));

  var cut; // short for Controller Under Test

  // Access the angular $controller service before each test
  beforeEach(inject(function($controller) {
    // injecting this service allows us to create an instance of our controller
    cut = $controller('discoverMusicController');
  }));

  //it('should be equal to 8', function(){
  //  expect(cut.returnNumber()).toEqual(8);
  //});

  it('should retrieve genres from database on page load', function() {

  });

  it('should retrieve most recent play lists created by users on page load', function(){

  });

  it('should retrieve a song when a genre is clicked', function() {

  });

  it('', function(){

  });

  it('', function(){

  });

});