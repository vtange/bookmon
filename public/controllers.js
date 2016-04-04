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
angular.module('bookmonGame').controller('startMenuController',['$scope', 'ActiveUser',function ($scope, ActiveUser) {
	//checks if user has a file. grey out the continue button if no file.
	$scope.userHasFile = function() {
		return ActiveUser.user.file.name;
	};

}]);

/*-------------*/
/*New Game Create    */
/*-------------*/
angular.module('bookmonGame').controller('newGameController',['$scope', '$http', '$window', 'ActiveUser',function ($scope, $http, $window, ActiveUser) {
	//object for ng-model
	$scope.newFile = {};
	//assign ^ to user in MongoDB and start the game
	$scope.startGame = function() {
		$http.post($window.location.href,$scope.newFile).success(function(data){
			$window.location.href = '/game/library';
		}).error(function(data){
			console.error("Something wrong happened while making your new game.");
		});
	};
	
}]);

/*-------------*/
/*The Library - List of Bookmons    */
/*-------------*/
angular.module('bookmonGame').controller('libraryController',['$scope', '$window', 'alertify', 'ActiveUser', 'BookStatsGenerator',function ($scope, $window, alertify, ActiveUser, BookStatsGenerator) {
	/*---------------------------*/
	/*no books - first time play */
	/*---------------------------*/
	$scope.noBooks = function(){
		return $scope.file.books.length === 0;
	};
	$scope.starterBooks = [
		{mon:"Comic"},{mon:"Novel"},{mon:"Textbook"},
	];
	$scope.getStats = BookStatsGenerator.getStats;
	$scope.confirm = function(book){
		alertify.okBtn("Yes").cancelBtn("No").confirm("Are you sure you want to start as a "+book.mon+" library?", function (ev) {
			  // The click event is in the
			  // event variable, so you can use
			  // it here.
			  ev.preventDefault();
			  alertify.success("Day 1: Your library opens with a stock of "+book.mon+"s.");//Player is O

		}, function(ev) {

			  // The click event is in the
			  // event variable, so you can use
			  // it here.
			  ev.preventDefault();
			  alertify.error("Take your time. Books are important :)");//Player is X

		});
	};
	
	/*---------------------------*/
	/*has books - regular play   */
	/*---------------------------*/
	$scope.file = ActiveUser.user.file;
	
	
}]);