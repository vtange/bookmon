angular.module('bookmonGame').filter('noSelfTrade', ['ActiveUser', function(ActiveUser) {
    return function(input) {
        var out = [];
        for (var j = 0; j < input.length; j++) {
			return ActiveUser.user.file.books.indexOf(input[j]._id)===-1;
        }
        return out;
    }
}]);
