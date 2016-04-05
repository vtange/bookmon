var myApp = angular.module('bookmonGame', ['ngRoute', 'ngAlertify']);

myApp.config(function ($routeProvider, $locationProvider) {        //Determine what page to be shown and what controller
    $locationProvider.html5Mode(true);
	$routeProvider
    .when('/', {templateUrl: 'partials/home.html'})//when "/", send home html (controller within home)
    .when('/game/newGame', {
      templateUrl: 'partials/newGame.html',
      controller: 'newGameController'
    })
    .when('/game/library', {
      templateUrl: 'partials/library.html',
      controller: 'libraryController'
    })
	.when('/game/town', {
      templateUrl: 'partials/town.html',
      controller: 'townController'
    })
    .otherwise({redirectTo: '/'});
});
