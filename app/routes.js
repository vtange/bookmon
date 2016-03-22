var appRoot = require('app-root-path');

// app/routes.js
module.exports = function(app) {

    // =====================================
    // HOME PAGE  ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs', {
            title : app.title, // get the title
            user : req.user, // get the user out of session and pass to template
			packagedUser : JSON.stringify([req.user]) //send user info to angular
        }); // load the index.ejs file
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
		else{
			res.render('index.ejs', {
				title : app.title, // get the title
				user : req.user, // get the user out of session and pass to template
				packagedUser : JSON.stringify([req.user]) //send user info to angular
			}); // load the index.ejs file
		}
	});
	
};