![](http://res.cloudinary.com/dmj8qtant/image/upload/c_scale,w_600/v1461261954/egjehu0yamywhk8ke0wa.png)
# bookmon

## Tech
Express, EJS, MongoDB, AngularJS + ui-router + ngAlertify, ```Q``` module

## Niceties
Mix Express + Angular routing (not really a good thing), RPG-theme(Hp-bars, Mailbox, Stats), Trading Models btwn Users / Trade Proposal and Acceptance system (not Pub/Sub, unfortunately)

### Details
#### Routes
| GET        | POST           | PUT  | DELETE  |
| ---------- |:--------------:| ----:| -------:|
| Home*      |                |      |         |
| Game*      |  Game(Create)  |      |         |
|            |  Book(Create)  |      |         |
|            |  Trade(Create)  |      |         |
|            |  Proposal(Create)  |      |         |
|            |  GetPendingTradesList  |      |         |
|            |  GetPendingProposalsList  |      |         |
|            |  Trade(Enact)  |      |         |
|            |  Trade(Cancel)  |      |         |
|            |  Proposal(Withdraw)  |      |         |


*=Server Side view render
#### CSS
 - Hp-bar
```
```
 - Custom Dropdown (with arrows too!)
```
```

#### JS
- Fix Server <--> Client routing conflict

1.Turn on HTML5 Mode in ui-router
```
//index.js
	<base href="/">
```
```
//public/router.js
myApp.config(function ($routeProvider, $locationProvider) {        //Determine what page to be shown and what controller
$locationProvider.html5Mode(true);
```
2.Add this to prevent issues serving files such as index.css to the client routed pages
```
//routes.js(server-side)
    app.get('/game/*', function(req, res) {
		var filename = req.originalUrl.replace("/game/","");
			//if it has a dot in its name return the original file
			if (/(\.)/g.test(req.originalUrl)){
				res.sendfile(appRoot + '/public/' + filename);
}
```
- How to use $or (used for clearing other Trades and Proposals made for 2 given books)
```
			//remove all Proposals associated with both books
			Proposal.remove({$or: [ { for: req.body.what._id }, { for : req.body.for._id }, { what : req.body.what._id }, { what : req.body.for._id } ]},function(err){
				if(err){
					throw err;
				}
				else{
					console.log("removed proposals for " + req.body.what._id + " and " + req.body.for._id );
				}
});
```

- How to use FindOne&Update, $pull, 
```
User.findOneAndUpdate({_id:poster._id},{$pull: {"file.books": req.body.what._id}}).exec(function(err,poster){
```
- Mass user ```.update``` for withdrawing proposal, multi in-case proposal-spam
```
User.update({},{$pull: { "file.pendingTrades" : req.body._id }},{ multi: true }).exec();
```

##### Hindsight
![This app](https://github.com/vtange/bookmon/tree/0e7392cf7c8ffc19120365cf43709db0170144aa) showcases problems with over-embedding in MongoDB and bad schema design. ```.populate``` is called way too much and attaching Users to Trades is inefficient compared to simply copying over User names and ids.

Should've simply had ```owner``` property for ```Book```s. That way trades could be conducted much more simply.

Trade proposal and Acceptance mailbox could be ![Pub/Sub](https://davidwalsh.name/pubsub-javascript) 
