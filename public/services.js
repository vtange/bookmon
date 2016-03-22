angular.module('bookmonGame').factory('ActiveUser',['$q', '$http',function ($q, $http) {
/*----------*/
/* USER STATE    */
/*----------*/
    // initiate user variable (activeUser)
    var user = false;

    function isLoggedIn() {
        if(user) {
          return true;
        } else {
          return false;
        }
    };
	
	// return available functions for use in controllers
    return ({
      isLoggedIn: isLoggedIn
    });
	
}]);