var appRoot = require('app-root-path');
var User = require('./models/user.js');
var Book = require('./models/book.js');
var Trade = require('./models/trade.js');
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
			user.file.library = req.body.library;
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
			Trade.find(function(trade){
				trades.push(trade);
			});
			res.send(trades);
		}
		else{
			res.redirect('/');
		}
	});
	
	
};