// app/models/proposal.js
// load the things we need
var mongoose = require('mongoose');

var proposalSchema = mongoose.Schema({
	originalTrade	: { type: mongoose.Schema.Types.ObjectId, ref: 'Trade' },
	for				: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
	proposer		: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Proposal', proposalSchema);
