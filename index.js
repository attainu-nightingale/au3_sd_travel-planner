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

var searchResult = [];
var airlineName = [];

app.get("/", function(req, res) {
    var loginButton;
    if (req.session.token) {
        profileBtn = `<div class="button-properties button-3"><a href="/profile" id="heroprofileBtn" style="text-decoration: none; color: wheat">Profile</a></div>`;
        (signupBtn = ""),
        (loginButton = `<a href="/logout"><button class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal"
        data-target="#logOutBtn">Log Out</button></a>`);
    } else {
        (loginButton = `<button class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal"
        data-target="#loginModal">Login</button>`),
        (signupBtn = `<button class="btn btn-outline-success my-2 my-sm-0" data-toggle="modal"
        data-target="#signupModal">Sign Up</button>`),
        (profileBtn = "");
    }
    res.render("home.hbs", {
        title: "Travel Planner",
        loginBtn: loginButton,
        signupBtn: signupBtn,
        profileBtn: profileBtn,
        data: airlineName,
        script: '/search.js'
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
    res.render("profile.hbs", {
        title: "User Profile",
        data: req.userData._id
    });
});

app.post('/search', function (req, res) {
  // console.log(JSON.stringify(req.body));
  searchResult.push(req.body);
  var airlines = searchResult[0];
  var newAirlines = airlines.Carriers;
  // console.log(airlines);  
  // console.log(newAirlines);
  var newAirlines = airlines.Carriers;
  newAirlines.forEach((element, index, array) => {
    airlineName.push(element.Name);
  });
  console.log(airlineName);
  // console.log(JSON.stringify(searchResult));
  res.redirect('/');
});

app.get("/faq", function(req, res) {
    res.render("faq.hbs");
});


//Myaccount--works
// app.get("/myaccount", checkToken, (req, res) => {
//     res.render('myAcc.hbs', ({
//         title: "Account Details",
//         data: req.userData._id,
//         script:'/script.js',


//     }));
// });





app.get("/myaccount", checkToken, (req, res) => {
    db.collection('users').find().toArray(function(error,result){
        if(error)
        throw error;
    res.render('myAcc.hbs', ({
        title: "Account Details",
        data: result,
        script:'/script.js',


    }));
});


})

hbs.registerHelper('checked', function(value, test) {
    if (value == undefined) return '';
    return value==test ? 'checked' : '';
});







app.put('/myaccount/acc',checkToken, (req, res) => {
var proId=req.userData._id
    var updProfile= req.body;
    var objectId=require('mongodb').ObjectId
    db.collection('users').update({"_id": new objectId(proId)},{$set: updProfile},function(error,result){
        if(error)
        throw error;
        console.log(result);
        // res.json(result);
    

})


}) 













app.listen(3000, function() {
    console.log("Listening on port 3000");
});