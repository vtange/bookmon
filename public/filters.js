angular.module('bookmonGame').filter('noSelfTrade', ['ActiveUser', function(ActiveUser) {
    return function(input) {
        var out = [];
        for (var j = 0; j < input.length; j++) {
			if(input[j].who._id !== ActiveUser.user._id){
				out.push(input[j]);
			};
        }
        return out;
    }
}]);
angular.module('bookmonGame').filter('SelfTrade', ['ActiveUser', function(ActiveUser) {
    return function(input) {
        var out = [];
        for (var j = 0; j < input.length; j++) {
			if(input[j].who._id === ActiveUser.user._id){
				out.push(input[j]);
			};
        }
        return out;
    }
}]);
