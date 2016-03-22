angular.module('bookmonGame').factory('ActiveUser',['$q', '$http',function ($q, $http) {
/*----------*/
/* USER STATE    */
/*----------*/
    var serviceObj = {
		user: null
	};
	// return available functions for use in controllers
    return serviceObj;
	
}]);