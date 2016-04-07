// app/models/proposal.js
// load the things we need
var mongoose = require('mongoose');

var proposalSchema = mongoose.Schema({
	//for removing trade posts after this proposal is accepted
	originalTrade	: { type: mongoose.Schema.Types.ObjectId, ref: 'Trade' },
	//the book proposed
	what				: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
	for				: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
	//for mailbox finding
	proposer		: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	poster			: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Proposal', proposalSchema);
