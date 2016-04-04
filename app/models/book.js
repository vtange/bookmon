// app/models/book.js
// load the things we need
var mongoose = require('mongoose');

var bookSchema = mongoose.Schema({
	level : Number,
	mon : String
});

// methods ======================


// create the model for users and expose it to our app
module.exports = mongoose.model('Book', bookSchema);
