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
 
##### Hindsight
![This app](https://github.com/vtange/bookmon/tree/0e7392cf7c8ffc19120365cf43709db0170144aa) showcases problems with over-embedding in MongoDB. ```.populate``` is called way too much and attaching Users to Trades is inefficient compared to simply copying over User names and ids.

Should've simply had ```owner``` property for ```Book```s. That way trades could be conducted much more simply.

Trade proposal and Acceptance mailbox could be ![Pub/Sub](https://davidwalsh.name/pubsub-javascript) 
