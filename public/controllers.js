/*-------------*/
/*LOGIN PROCESS B4 AND AFTR    */
/*-------------*/
angular.module('bookmonGame').controller('loginController',['$scope', '$location', 'AuthService',function ($scope, $location, AuthService) {

    console.log(AuthService.getUserStatus());

    $scope.login = function () {

      // initial values
      $scope.error = false;         //hide error bar
      $scope.disabled = true;       //disable Login button to prevent double send

      // call login from service
      AuthService.login($scope.loginForm.username, $scope.loginForm.password)//<-----------PROCESS DONE BY SERVICES
        // handle success
        .then(function () {
          $location.path('/');      //redirect to home
          $scope.disabled = false;  //reenable Login button
          $scope.loginForm = {};    //clear input fields
        })
        // handle error
        .catch(function () {
          $scope.error = true;      //show error bar
          $scope.errorMessage = "Invalid username and/or password";
          $scope.disabled = false;  //reenable Login button
          $scope.loginForm = {};    //clear input fields
        });

    };

}]);
/*-------------*/
/*LOGOUT PROCESS AFTR   */
/*-------------*/
angular.module('bookmonGame').controller('logoutController',['$scope', '$location', 'AuthService',function ($scope, $location, AuthService) {

    $scope.logout = function () {

      console.log(AuthService.getUserStatus());

      // call logout from service
      AuthService.logout()//<-----------PROCESS DONE BY SERVICES
        .then(function () {
          $location.path('/login'); //back to Login page
        });

    };

}]);
/*-------------*/
/*REGISTER PROCESS B4 AND AFTR   */
/*-------------*/
angular.module('bookmonGame').controller('registerController',['$scope', '$location', 'AuthService',function ($scope, $location, AuthService) {

    console.log(AuthService.getUserStatus());

    $scope.register = function () {

      // initial values
      $scope.error = false;
      $scope.disabled = true;          //disable Login button to prevent double send

      // call register from service
      AuthService.register($scope.registerForm.username, $scope.registerForm.password)//<-----------PROCESS DONE BY SERVICES
        // handle success
        .then(function () {
          $location.path('/login');    // to Login page
          $scope.disabled = false;     //reenable Login button
          $scope.registerForm = {};    //clear input fields
        })
        // handle error
        .catch(function () {
          $scope.error = true;          //show error bar
          $scope.errorMessage = "Something went wrong!";
          $scope.disabled = false;     //reenable Login button
          $scope.registerForm = {};    //clear input fields
        });

    };

}]);
