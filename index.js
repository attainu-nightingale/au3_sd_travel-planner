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
    var loginButton;
    if (req.session.token) {
        profileBtn = `<div class="button-properties button-3"><a href="/profile" id="heroprofileBtn" style="text-decoration: none; color: wheat">Profile</a></div>`
        signupBtn = "",
            loginButton = `<a href="/logout"><button class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal"
        data-target="#logOutBtn">Log Out</button></a>`
    } else {
        loginButton = `<button class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal"
        data-target="#loginModal">Login</button>`,
            signupBtn = `<button class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal"
        data-target="#signupModal">Sign Up</button>`,
            profileBtn = ""
    }
    res.render("home.hbs", {
        title: "Travel Planner",
        loginBtn: loginButton,
        signupBtn: signupBtn,
        profileBtn: profileBtn
    });
});

// logout the user

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
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