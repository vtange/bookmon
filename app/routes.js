var appRoot = require('app-root-path');
var User = require('./models/user.js');
var Book = require('./models/book.js');
var Trade = require('./models/trade.js');
var Proposal = require('./models/proposal.js');
var q 	  = require('q');
// app/routes.js
module.exports = function(app) {

    // =====================================
    // HOME PAGE  ========
    // =====================================
    app.get('/', function(req, res) {
		if(req.user){
			User.findById(req.user.id).populate('file.books').exec(function(err,user){
				res.render('index.ejs', {
					title : app.title, // get the title
					user : req.user, // get the user out of session and pass to template
					packagedUser : JSON.stringify([user]) //send user info to angular
				}); // load the index.ejs file
			});
		}
		else{
			res.render('index.ejs', {
				title : app.title, // get the title
				user : req.user, // get the user out of session and pass to template
				packagedUser : JSON.stringify([req.user]) //send user info to angular
			}); // load the index.ejs file
		}
    });
    // =====================================
    // GAME PAGE (ENABLES REFRESH IN GAME PAGES) ========
    // =====================================
    app.get('/game/*', function(req, res) {
		var filename = req.originalUrl.replace("/game/","");
			//if it has a dot in its name return the original file
			if (/(\.)/g.test(req.originalUrl)){
				res.sendfile(appRoot + '/public/' + filename);
			}
		if(req.user){
			User.findById(req.user.id).populate('file.books').exec(function(err,user){
				res.render('index.ejs', {
					title : app.title, // get the title
					user : req.user, // get the user out of session and pass to template
					packagedUser : JSON.stringify([user]) //send user info to angular
				}); // load the index.ejs file
			});
		}
		else{
			res.render('index.ejs', {
				title : app.title, // get the title
				user : req.user, // get the user out of session and pass to template
				packagedUser : JSON.stringify([req.user]) //send user info to angular
			}); // load the index.ejs file
		}
	});
	// =====================================
    // NEW GAME (ENABLES REFRESH IN GAME PAGES) ========
    // =====================================
    app.post('/game/newGame', function(req, res) {
		if(req.user){
			var user = req.user;
			user.file.name = req.body.name;
			user.file.town = req.body.town;
			user.save(function(err){
				if(err)
					throw err;
				console.log('user got new game');
				res.send(200);
			});
		}
		else{
			res.redirect('/');
		}
	});
	// =====================================
    // NEW BOOK (STARTER BOOK) ========
    // =====================================
    app.post('/game/library/new', function(req, res) {
		if(req.user){
			var user = req.user;
			var book = new Book();
			book.level = 1;
			book.xp = 0;
			book.maxhp = req.body.stats.weight;
			book.hp = book.maxhp;
			book.mon = req.body.mon;
			book.save(function(err){
				if(err)
					throw err;
				user.file.books.push(book);
				user.save(function(err){
					if(err)
						throw err;
					console.log('user has new book');
				});
				console.log('new book');
				res.send(book);
			});
		}
		else{
			res.redirect('/');
		}
	});
	// =====================================
    // GET PENDING TRADES ========
    // =====================================
    app.post('/game/trade/pending', function(req, res) {
		if(req.user){
			var user = req.user;
			var trades = [];
			var gotTrades = q.defer();
			Trade.find({}).populate('who').populate('tradingOut').exec(function(err,trade){
				trades.push(trade);
				
				gotTrades.resolve("yay");
			});
			gotTrades.promise.then(function(){
				res.send(trades);
			})
		}
		else{
			res.redirect('/');
		}
	});
	// =====================================
    // GET PENDING TRADES ========
    // =====================================
    app.post('/game/trade/proposals', function(req, res) {
		if(req.user){
			var user = req.user;
			var proposals = [];
			var gotProps = q.defer();
			Proposal.find({ $or: [ { proposer: user._id }, { poster : user._id } ] }).populate('what').populate('for').populate('proposer').populate('poster').exec(function(err,proposal){
				proposals.push(proposal);
				
				gotProps.resolve("yay");
			});
			gotProps.promise.then(function(){
				res.send(proposals);
			})
		}
		else{
			res.redirect('/');
		}
	});
	// =====================================
    // NEW TRADE ========
    // =====================================
    app.post('/game/trade/new', function(req, res) {
		if(req.user){
			var user = req.user;
			var trade = new Trade();
			trade.who = user;
			trade.tradingOut = req.body.book._id;
			trade.wish = req.body.wish;
			trade.save(function(err){
				if(err)
					throw err;
				console.log("new trade");
				res.send(200);
			});
		}
		else{
			res.redirect('/');
		}
	});
	// =====================================
    // NEW PROPOSAL ========
    // =====================================
    app.post('/game/trade/propose', function(req, res) {
		if(req.user){
			var user = req.user;
			var poster = req.body.trade.who;
			var proposal = new Proposal();
			proposal.proposer = user;
			proposal.poster = poster._id;
			proposal.what = req.body.trade.tradingOut._id;
			proposal.for = req.body.book._id;
			proposal.originalTrade = req.body.trade._id;
			proposal.save(function(err){
				if(err)
					throw err;
				//send trade proposal to sender and poster
				user.file.pendingTrades.push(proposal);
				user.save(function(err){
					if(err)
						throw err;
					User.findById(poster._id).exec(function(err,poster){
						poster.file.pendingTrades.push(proposal);
						poster.save(function(err){
							if(err)
								throw err;
							res.send(200);
						});
					});

				});
			});
		}
		else{
			res.redirect('/');
		}
	});
	// =====================================
    // ENACT TRADE ========
    // =====================================
    app.post('/game/trade/do', function(req, res) {
		if(req.user){
			var poster = req.body.poster;
			var proposer = req.body.proposer;
			//remove all Trades associated with both books
			Trade.remove({$or: [ { tradingOut: req.body.what._id }, { tradingOut: req.body.for._id } ]},function(err){
				if(err){
					throw err;
				}
				else{
					console.log("removed trades for " + req.body.what._id + " and " + req.body.for._id );
				}
			});
			//remove all Proposals associated with both books
			Proposal.remove({$or: [ { for: req.body.what._id }, { for : req.body.for._id }, { what : req.body.what._id }, { what : req.body.for._id } ]},function(err){
				if(err){
					throw err;
				}
				else{
					console.log("removed proposals for " + req.body.what._id + " and " + req.body.for._id );
				}
			});
			
			//Swap books
			User.findOneAndUpdate({_id:poster._id},{$pull: {"file.books":  req.body.what._id}}).exec(function(err,poster){

				//poster gets 'for' book (from proposer), remove trade proposal
				poster.file.books.push(req.body.for._id);
				poster.file.books.remove(req.body.what._id);
				poster.file.pendingTrades.remove(req.body._id);
				poster.save(function(err){
					if(err)
						throw err;
					User.findOneAndUpdate({_id:proposer._id},{$pull: {"file.books": req.body.for._id}}).exec(function(err,proposer){

						//proposer gets 'what' book (from poster), remove trade proposal
						proposer.file.books.push(req.body.what._id);
						proposer.file.books.remove(req.body.for._id);
						proposer.file.pendingTrades.remove(req.body._id);
						proposer.save(function(err){
							if(err)
								throw err;
							res.send(200);
						});
					});
				});
			});
		}
		else{
			res.redirect('/');
		}
	});
	// =====================================
    // WITHDRAW PROPOSAL ========
    // =====================================
    app.post('/game/trade/withdraw', function(req, res) {
		if(req.user){
			User.update({},{$pull: { "file.pendingTrades" : req.body._id }},{ multi: true }).exec();
			Proposal.remove({_id:req.body._id},function(err){
				if(err){
					throw err;
				}
				else{
					res.send(200);
				}
			});
		}
		else{
			res.redirect('/');
		}
	});
	// =====================================
    // CANCEL TRADE ========
    // =====================================
    app.post('/game/trade/cancel', function(req, res) {
		if(req.user){
			Trade.remove({_id:req.body._id},function(err){
				if(err){
					throw err;
				}
				else{
					res.send(200);
				}
			});
		}
		else{
			res.redirect('/');
		}
	});
};