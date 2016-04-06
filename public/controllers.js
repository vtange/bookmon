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
	$scope.getStats = BookStatsGenerator.getStats;
	$scope.setHP = function(hp,max){
		var percent = Math.floor((hp/max)*100);
		return { "width" : percent+"%" };
	};
	
}]);

/*-------------*/
/* Town - Repair, Combine, and Market    */
/*-------------*/
angular.module('bookmonGame').controller('townController',['$scope', '$http', '$window', 'alertify', 'ActiveUser', 'BookStatsGenerator',function ($scope, $http, $window, alertify, ActiveUser, BookStatsGenerator) {

	/*---------------------------*/
	/*	GET USER				 */
	/*---------------------------*/
	//user stuff
	$scope.file = ActiveUser.user.file;
	//book stats if needed
	$scope.getStats = BookStatsGenerator.getStats;

	$scope.atBldg = function(){
		return $scope.atRepair || $scope.atSmith || $scope.atStore;
	};
	$scope.blur = function(){
		if($scope.atBldg()){
			return { "filter": "blur(5px)"};
		}
		return {};
	};
	/*---------------------------*/
	/*	BOOK REPAIR				 */
	/*---------------------------*/
	$scope.atRepair = false;
	$scope.showRepair = function(){
		if($scope.atRepair){
			$scope.atRepair = false;
		}
		else{
			$scope.atRepair = true;
		}
	};
	$scope.selectForRepair = function(book){
		
	};
	/*---------------------------*/
	/*	BOOK SMITH (COMBINE)	 */
	/*---------------------------*/
	$scope.atSmith = false;
	$scope.showSmith = function(){
		if($scope.atSmith){
			$scope.atSmith = false;
		}
		else{
			$scope.atSmith = true;
		}
	};
	/*---------------------------*/
	/*	BOOK STORE				 */
	/*---------------------------*/
	$scope.atStore = false;
	$scope.showStore = function(){
		if($scope.atStore){
			$scope.atStore = false;
		}
		else{
			$scope.atStore = true;
		}
	};
}]);

/*-------------*/
/* Port - Trade and offer trades with other Players    */
/*-------------*/
angular.module('bookmonGame').controller('tradeController',['$scope', '$http', '$window', 'alertify', 'ActiveUser', 'BookStatsGenerator',function ($scope, $http, $window, alertify, ActiveUser, BookStatsGenerator) {

	/*---------------------------*/
	/*	GET USER				 */
	/*---------------------------*/
	//user stuff
	$scope.file = ActiveUser.user.file;
	//book stats if needed
	$scope.getStats = BookStatsGenerator.getStats;

	/*---------------------------*/
	/*	GET AVAIL TRADES		 */
	/*---------------------------*/	
	$scope.pendingTrades = [];
	$http.post($window.location.href+"/pending").then(function(data){
		$scope.pendingTrades = data;
	});

	/*---------------------------*/
	/*	NEW TRADE WINDOW		 */
	/*---------------------------*/	
	$scope.newTrade = false;
	$scope.newTradeWindow = function(){
		if($scope.newTrade){
			$scope.newTrade = false;
			$scope.currentDrop = null;
			$scope.resetForm();
		}
		else{
			$scope.newTrade = true;
		}
	};
	$scope.blur = function(){
		if($scope.newTrade){
			return { "filter": "blur(5px)"};
		}
		return {};
	};

	/*---------------------------*/
	/*	DROP DOWN				 */
	/*---------------------------*/	
	//the form obj
	$scope.resetForm = function(){
		$scope.outbound = {
			book:null,
			wish:"Select a type of book"
		};
	};
	$scope.resetForm();
	$scope.dropdown = function(number){
		if($scope.currentDrop !== number){
			$scope.currentDrop = number;
		}
		else{
			$scope.currentDrop = null;
		}
	};
	$scope.dropped = function(number){
		return $scope.currentDrop === number;
	};
	$scope.selectItem = function(list, index){
		$scope.currentDrop = null;
		if(list===1){
			$scope.outbound.book = $scope.file.books[index];
		}
		else{
			$scope.outbound.wish = $scope.possibleBooks[index];
		}
	};
	$scope.possibleBooks = ["Comic","Novel","Journal","Textbook","Artbook","Scripture"];
	$scope.getMon = function(book){
		if(book){
			return "Level "+book.level+" "+book.mon;
		}
		else{
			return "Select a book to offer";
		}
	};
	$scope.postTrade = function(){
		$http.post($window.location.href+"/new",$scope.outbound).success(function(data){
			$scope.newTradeWindow();
		}).error(function(data){
			throw "Something went wrong posting your trade.";
		})
	};
	
}]);