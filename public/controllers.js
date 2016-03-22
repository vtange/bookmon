/*-------------*/
/*Takes in User data from Server and sends it to Angular Factory 'ActiveUser' for access by other controllers    */
/*-------------*/
angular.module('bookmonGame').controller('autoLogger',['$scope', 'ActiveUser',function ($scope, ActiveUser) {
	
	//used to transfer server data to client
	$scope.init = function(package) {
		ActiveUser.user = package[0];
	};

}]);

/*-------------*/
/*Start Screen    */
/*-------------*/
angular.module('bookmonGame').controller('startMenuController',['$scope', '$location', 'ActiveUser',function ($scope, $location, ActiveUser) {
	//checks if user has a file. grey out the continue button if no file.
	$scope.userHasFile = function() {
		return ActiveUser.user.file.name;
	};

}]);

/*-------------*/
/*New Game Create    */
/*-------------*/
angular.module('bookmonGame').controller('newGameController',['$scope', '$location', 'ActiveUser',function ($scope, $location, ActiveUser) {



}]);

/*-------------*/
/*The Ranch - List of Bookmons    */
/*-------------*/
angular.module('bookmonGame').controller('bookRanchController',['$scope', '$location', 'ActiveUser',function ($scope, $location, ActiveUser) {


}]);