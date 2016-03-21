var myApp = angular.module('bookmonGame', ['ngRoute']);

myApp.config(function ($routeProvider) {        //Determine what page to be shown and what controller
  $routeProvider
    .when('/', {templateUrl: 'partials/home.html'})//when "/", send home html (controller within home)
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'logoutController',
      access: {restricted: true}
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'registerController',
      access: {restricted: false}
    })
    .otherwise({redirectTo: '/login'});
});
