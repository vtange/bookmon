// app/models/book.js
// load the things we need
var mongoose = require('mongoose');

// books
var bookSchema = mongoose.Schema({
	name: String,
	stats : {
		attack : Number,
		defense : Number,
		speed: Number,
		health : Number
	}
});

// methods ======================


// create the model for users and expose it to our app
module.exports = mongoose.model('Book', bookSchema);
