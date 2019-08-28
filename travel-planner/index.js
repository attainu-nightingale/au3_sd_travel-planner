var express = require('express');
var session = require('express-session');
var hbs = require('hbs');
var bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var app = express();
var auth = require('./routes/auth.js');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser,JSON());
app.use(express.static('public'));
app.set('view engine', 'hbs');

var url = "mongodb://localhost:27017";

mongoClient.connect(url, {useNewUrlParser: true}, function(err, client) {
  if(err)
    throw err;
  app.locals.db = client.db('school');     //will change db name, when it is created
});

app.locals.ObjectId = require('mongodb').ObjectID;

app.use(session({
  secret: "Hakumanata!! Timon and Pumba. Mogambo khush hua!!!"
}));

app.use(function (req, res, next) {
    if (!req.session.views) {
        req.session.views = {};
    }
    var path = req.originalUrl;
    req.session.views[path] = (req.session.views[path] || 0) + 1;
    next();
});

//landing page
app.get('/', function(req, res) {
  res.send('<h1>Welcome</h1>');    //langing page will be updated, when it is created
});

//login authentication
app.use('/authentication', auth);

app.listen(3000, function() {
  console.log("Listening on port 3000");
});