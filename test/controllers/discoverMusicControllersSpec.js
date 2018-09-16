// Describe out test: we are testing the discoverMusicController
describe('Controller: discoverMusicController ', function() {

  beforeEach(module('myApp'));

  var cut;// short for Controller Under Test
  var mockBackend; // will represent/mock our backend that returns our data
  var scope;

  // the $httpBackend service is provided by angular-mocks

  // Access the angular $controller service before each test
  beforeEach(inject(function($controller, $httpBackend, $rootScope) {
    scope = $rootScope.$new();
    mockBackend = $httpBackend;

    // we expect a get call on this route
    // and we can mock a response that looks similar to a response we would actually expect
    mockBackend.expectGET('/getGenres')
      .respond({id: 3, description: 'Country', query_string: 'country'});

    mockBackend.expectGET('/getVariousPlaylists')
      .respond({id: 3, description: 'Country', query_string: 'country'});

    // injecting this service allows us to create an instance of our controller
    cut = $controller('discoverMusicController', {$scope: scope});
  }));

  it('should retrieve genres from database on page load', function() {
    // when the controller first loads, this variable is undefined
    expect(scope.genres).toBeUndefined();
    // we simulate a server response
    mockBackend.flush();

    // we check that our response is that same as that which we mocked
    expect(scope.genres).toEqual({id: 3, description: 'Country', query_string: 'country'});

  });

  // actions that will performed after each test
  afterEach(function() {
    // ensure all expects set on the backend were actually called
    mockBackend.verifyNoOutstandingExpectation();

    // ensure all requests to the server have responded
    mockBackend.verifyNoOutstandingRequest();
  });

  //it('should retrieve most RECENT play lists created by users on page load', function(){
  //
  //});
  //
  //it('should retrieve a song when a genre is clicked', function() {
  //
  //});
  //
  //it('', function(){
  //
  //});
  //
  //it('', function(){
  //
  //});

});