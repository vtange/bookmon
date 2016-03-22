/*-------------*/
/*Takes in User data from Server and sends it to Angular Factory 'ActiveUser' for access by other controllers    */
/*-------------*/
angular.module('bookmonGame').controller('autoLogger',['$scope', 'ActiveUser',function ($scope, ActiveUser) {
	
	
	
	//used to transfer server data to client
	$scope.init = function(package) {
		$scope.activeUser = package[0];
	};

}]);

/*-------------*/
/*New Game Screen    */
/*-------------*/
angular.module('bookmonGame').controller('startMenu',['$scope', '$location', 'ActiveUser',function ($scope, $location, ActiveUser) {



}]);