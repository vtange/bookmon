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
						break;
					case "Historical":
						stats.story += 10;
						stats.knowledge += 10;
						break;
					case "Comedy":
						stats.story += 10;
						stats.speed += 10;
						break;
					case "Romance":
						stats.story += 10;
						stats.magic += 10;
						break;
					case "Sci Fi":
						stats.knowledge += 10;
						stats.magic += 10;
						break;
					case "Fantasy":
						stats.magic += 20;
						break;
					case "Math-heavy":
						stats.knowledge += 20;
						break;
					case "Mundane":
						stats.knowledge += 20;
						stats.speed -= 10;
						stats.story -= 10;
						break;
					case "Light":
						stats.speed += 20;
						stats.weight -= 10;
						break;
					case "Hardcover":
						stats.weight += 20;
						break;
						// book bodies
					case "Comic":
						stats.weight += 20;
						stats.magic += 40;
						stats.knowledge += 20;
						stats.story += 40;
						stats.speed += 40;
						break;
					case "Novel":
						stats.weight += 30;
						stats.magic += 30;
						stats.knowledge += 30;
						stats.story += 40;
						stats.speed += 30;
						break;
					case "Journal":
						stats.weight += 30;
						stats.magic += 20;
						stats.knowledge += 50;
						stats.story += 40;
						stats.speed += 20;
						break;
					case "Textbook":
						stats.weight += 40;
						stats.magic += 30;
						stats.knowledge += 50;
						stats.story += 20;
						stats.speed += 20;
						break;
					case "Artbook":
						stats.weight += 40;
						stats.magic += 50;
						stats.knowledge += 20;
						stats.story += 20;
						stats.speed += 30;
						break;
					case "Scripture":
						stats.weight += 40;
						stats.magic += 50;
						stats.knowledge += 10;
						stats.story += 50;
						stats.speed += 10;
						break;
				}
			});
			return stats;
		}
	};
	// return available functions for use in controllers
    return serviceObj;
	
}]);