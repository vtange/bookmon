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
angular.module('bookmonGame').controller('libraryController',['$scope', '$http', '$window', 'alertify', 'ActiveUser', 'BookStatsGenerator',function ($scope, $http, $window, alertify, ActiveUser, BookStatsGenerator) {
	/*---------------------------*/
	/*no books - first time play */
	/*---------------------------*/
	$scope.noBooks = function(){
		return $scope.file.books.length === 0;
	};
	$scope.starterBooks = [
		{mon:"Comic", desc:"Comics have quick engaging graphics and stories, but are light on substance."},{mon:"Novel", desc:"Novels come in all sorts of flavours. They are a balanced choice."},{mon:"Textbook", desc:"Laden with knowledge. Textbooks are down to earth, yet pack a serious punch if need be."},
	];
	$scope.confirm = function(book){
		alertify.okBtn("Yes").cancelBtn("No").confirm("Are you sure you want to start as a "+book.mon+" library?", function (ev) {
			  ev.preventDefault();
			//http post: user gets new bookmon with mon "book.mon"
			
			$http.post($window.location.href + "/new",$scope.getStats(book)).success(function(data){
				$scope.file.books.push(data);
				 alertify.success("Day 1: Your library opens with a stock of "+book.mon+"s.");
			});
			 

		}, function(ev) {
			  ev.preventDefault();
			  alertify.error("Take your time. Books are important :)");

		});
	};
	
	/*---------------------------*/
	/*has books - regular play   */
	/*---------------------------*/
	$scope.file = ActiveUser.user.file;
	console.log($scope.file);
	$scope.getStats = BookStatsGenerator.getStats;
	$scope.dropHP = function(){
		
	};
	
}]);