angular.module('bookmonGame').factory('ActiveUser',[ function () {
/*----------*/
/* USER STATE    */
/*----------*/
    var serviceObj = {
		user: null
	};
	// return available functions for use in controllers
    return serviceObj;
	
}]);

angular.module('bookmonGame').factory('BookStatsGenerator',[ function () {

/* 'mons
traits
	Adventure	++ story
	Historical	+ story & knowledge
	Comedy		+ story & speed
	Romance		+ story & magic
	Sci Fi		+ magic & knowledge
	Fantasy		++ magic
	Math-heavy	++ knowledge
	Mundane		+ knowledge, -speed, - story
	Light		++ speed, -weight
	Hardcover	++ weight
body
	Comic - hi speed+story+magic, low knowledge, low weight.
	Novel - all-rounder.
	Journal - hi story+knowledge, med weight / speed.
	Textbook - very hi knowledge + weight. low story + speed.
	Artbook - hi magic + weight. med speed. low knowledge.
	Scripture - very high magic + story. hi weight. low knowledge + speed.
*/

//  books stats
//	weight	  = strength; big books slap things better.
//	magic	  = sci fi, fantasy. books involving a twist to imagination.
//	knowledge = non fiction is best here. 
//	story	  = measure of characters and world found in books. novels and fiction books thrive here in general.
//  speed	  = measure of how quick book can be read, fast books respond to enemies quicker

    var serviceObj = {
		getStats: function(book){
			var stats = {
				weight:0,
				magic:0,
				knowledge:0,
				story:0,
				speed:0
			}
			var words = book.mon.split(" ");
			words.forEach(function(word){
				switch(word){
						//book traits
					case "Adventure":
						stats.story += 20;
					case "Historical":
						stats.story += 10;
						stats.knowledge += 10;
					case "Comedy":
						stats.story += 10;
						stats.speed += 10;
					case "Romance":
						stats.story += 10;
						stats.magic += 10;
					case "Sci Fi":
						stats.knowledge += 10;
						stats.magic += 10;
					case "Fantasy":
						stats.magic += 20;
					case "Math-heavy":
						stats.knowledge += 20;
					case "Mundane":
						stats.knowledge += 20;
						stats.speed -= 10;
						stats.story -= 10;
					case "Light":
						stats.speed += 20;
						stats.weight -= 10;
					case "Hardcover":
						stats.weight += 20;
						// book bodies
					case "Comic":
						stats.weight += 20;
						stats.magic += 40;
						stats.knowledge += 20;
						stats.story += 40;
						stats.speed += 40;
					case "Novel":
						stats.weight += 30;
						stats.magic += 30;
						stats.knowledge += 30;
						stats.story += 40;
						stats.speed += 30;
					case "Journal":
						stats.weight += 30;
						stats.magic += 20;
						stats.knowledge += 50;
						stats.story += 40;
						stats.speed += 20;
					case "Textbook":
						stats.weight += 40;
						stats.magic += 30;
						stats.knowledge += 50;
						stats.story += 20;
						stats.speed += 20;
					case "Artbook":
						stats.weight += 40;
						stats.magic += 50;
						stats.knowledge += 20;
						stats.story += 20;
						stats.speed += 30;
					case "Scripture":
						stats.weight += 40;
						stats.magic += 50;
						stats.knowledge += 10;
						stats.story += 50;
						stats.speed += 10;
				}
			});
			return stats;
		}
	};
	// return available functions for use in controllers
    return serviceObj;
	
}]);