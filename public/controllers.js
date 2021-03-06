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
angular.module('bookmonGame').controller('newGameController',['$scope', '$http', '$window', 'alertify', 'ActiveUser',function ($scope, $http, $window, alertify, ActiveUser) {
	//object for ng-model
	$scope.newFile = {};
	//assign ^ to user in MongoDB and start the game
	$scope.startGame = function() {
		$http.post($window.location.href,$scope.newFile).success(function(data){
			$window.location.href = '/game/library';
		}).error(function(data){
			alertify.error("Something broke while setting up your new game.");
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
	$scope.getTrades = function(){
		$http.post($window.location.href+"/pending").success(function(data){
			$scope.pendingTrades = data[0];
		}).error(function(err){
			throw "error getting trade data";
		});
	};
	$scope.getTrades();

	/*---------------------------*/
	/*	GET PROPOSALS			 */
	/*---------------------------*/	
	$scope.pendingProposals = [];
	$scope.getProposals = function(){
		$http.post($window.location.href+"/proposals").success(function(data){
			$scope.pendingProposals = data[0];
		}).error(function(err){
			throw "error getting proposal data";
		});
	};
	$scope.getProposals();
	
	/*---------------------------*/
	/*	NEW TRADE WINDOW		 */
	/*---------------------------*/	
	$scope.proposal = false;
	$scope.trade = false;
	$scope.mailbox = false;
	$scope.anyWindow = function(){
		return $scope.trade || $scope.proposal || $scope.mailbox;
	}
	$scope.newWindow = function(WhatWindow,TradeInfo){
		if(TradeInfo){
			$scope.outbound.trade = TradeInfo;
		}
		if($scope[WhatWindow]){
			$scope[WhatWindow] = false;
			$scope.currentDrop = null;
			$scope.resetForm();
		}
		else{
			$scope[WhatWindow] = true;
		}
	};
	$scope.blur = function(){
		if($scope.anyWindow()){
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
	$scope.bulletinMode = "All Trades";
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
		else if (list===2){
			$scope.outbound.wish = $scope.possibleBooks[index];
		}
		else{
			$scope.bulletinMode = list;
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
			$scope.newWindow('trade');
			alertify.success("You posted a trade post.");
		}).error(function(data){
			alertify.error("Something went wrong posting your trade.");
		})
	};
	$scope.sendProposal= function(){
		$http.post($window.location.href+"/propose",$scope.outbound).success(function(data){
			$scope.newWindow('proposal');
			$scope.getProposals();
			alertify.success("You made a trade proposal.");
		}).error(function(data){
			alertify.error("Something went wrong sending your proposal.");
		})
	};


	/*---------------------------*/
	/*	CHECK OWN PROPOSALS		 */
	/*---------------------------*/
	$scope.checking = null;
	$scope.isOwnProposals = function(proposal){
		return proposal.proposer._id === ActiveUser.user._id;
	};
	$scope.isResponse = function(proposal){
		return proposal.poster._id === ActiveUser.user._id;
	};
	$scope.check = function(proposal){
		if($scope.checking===null){
			$scope.targetProposal = proposal;
			//split. mine and theirs. mine is toward left, theirs is toward right.
			if($scope.isOwnProposals(proposal)){
				$scope.checking = {
					mine:proposal.for,
					theirs:proposal.what,
					isProposer:true
				}
			}
			else{
				$scope.checking = {
					mine:proposal.what,
					theirs:proposal.for,
					isProposer:false
				}
			}
		}
		else{
			$scope.checking = null;
		}
	};
	$scope.targetProposal = null;
	$scope.confirmTrade = function(){
		if($scope.targetProposal===null){
			alertify.error("There doesn't seem to be a trade to confirm.");
		}
		else{
			$http.post($window.location.href+"/do",$scope.targetProposal).success(function(data){
				//at server, we will 
					//delete all trades and proposals (except this one ofc) related to both books
					//swap the books
				//reset lists
				$scope.getProposals();
				$scope.getTrades();
				//close windows
				$scope.checking = null;
				alertify.success("The trade has been done.");
			}).error(function(data){
				alertify.error("Something went wrong while trading.");
			})
		}
	};
	$scope.withdrawProposal = function(){
		if($scope.targetProposal===null){
			alertify.error("There doesn't seem to be a proposal to withdraw.");
		}
		else{
			$http.post($window.location.href+"/withdraw",$scope.targetProposal).success(function(data){
				//at server, we will 
					//find and delete proposal by id
				//reset lists
				$scope.getProposals();
				//close windows
				$scope.checking = null;
				alertify.success("The proposal has been withdrawn.");
			}).error(function(data){
				alertify.error("Something went wrong while trading.");
			})
		}
	};
	$scope.cancelTrade = function(trade){
		alertify.okBtn("Yes").cancelBtn("No").confirm("Are you sure you want to remove this trade posting?", function (ev) {
			ev.preventDefault();
			$http.post($window.location.href+"/cancel",trade).success(function(data){
				//at server, we will 
					//find and delete trade by id
				//reset lists
				$scope.getTrades();
				alertify.success("The trade has been canceled.");
			}).error(function(data){
				alertify.error("Something went wrong while canceling the trade.");
			});

		}, function(ev) {
			  ev.preventDefault();
			//nothing happens
		});
	};
}]);