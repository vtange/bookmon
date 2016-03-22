var myApp = angular.module('bookmonGame', ['ngRoute']);

myApp.config(function ($routeProvider, $locationProvider) {        //Determine what page to be shown and what controller
    $locationProvider.html5Mode(true);
	$routeProvider
    .when('/', {templateUrl: 'partials/home.html'})//when "/", send home html (controller within home)
    .when('/newGame', {
      templateUrl: 'partials/newGame.html',
      controller: 'newGameController'
    })
    .when('/bookRanch', {
      templateUrl: 'partials/bookRanch.html',
      controller: 'bookRanchController'
    })
    .otherwise({redirectTo: '/'});
});
