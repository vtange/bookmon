// app/models/trade.js
// load the things we need
var mongoose = require('mongoose');

var tradeSchema = mongoose.Schema({
	who				: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	tradingOut		: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
});

// methods ======================

// create the model for users and expose it to our app
module.exports = mongoose.model('Trade', tradeSchema);
