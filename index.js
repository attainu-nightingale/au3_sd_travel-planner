var express = require("express");
var session = require("express-session");
var hbs = require("hbs");
var bodyParser = require("body-parser");
var mongoClient = require("mongodb").MongoClient;
var app = express();
const jwt = require("jsonwebtoken");
var auth = require("./routes/auth.js");
var checkToken = require("./middleware/check-authToken");

app.use(
    bodyParser.urlencoded({
        extended: false
    })
);
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "hbs");

var url = "mongodb://localhost:27017";

app.locals.db;

mongoClient.connect(
    url, {
        useNewUrlParser: true
    },
    function(err, client) {
        if (err) throw err;
        db = client.db("school"); //will change db name, when it is created
    }
);

app.locals.ObjectId = require("mongodb").ObjectID;

app.use(
    session({
        secret: "Hakumanata!! Timon and Pumba. Mogambo khush hua!!!"
    })
);

app.get("/", function(req, res) {
    res.render("home.hbs", {
        title: "Travel Planner"
    });
});

//login authentication
app.use("/authentication", auth);

// protected Routes

app.get("/profile", checkToken, (req, res) => {
    res.render('profile.hbs', ({
        title: "User Profile",
        data: req.userData._id
    }));
});

app.listen(3000, function() {
    console.log("Listening on port 3000");
});