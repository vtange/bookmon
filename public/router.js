var myApp = angular.module('bookmonGame', ['ngRoute']);

myApp.config(function ($routeProvider) {        //Determine what page to be shown and what controller
  $routeProvider
    .when('/', {templateUrl: 'partials/home.html'})//when "/", send home html (controller within home)
    .when('/game/newGame', {
      templateUrl: 'partials/newGame.html',
      controller: 'newGameController',
      access: {restricted: true}
    })
    .when('/game/bookRanch', {
      templateUrl: 'partials/bookRanch.html',
      controller: 'bookRanchController',
      access: {restricted: true}
    })
  
    .otherwise({redirectTo: '/login'});
});
