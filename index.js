var express = require("express");
var session = require("express-session");
var methodOverride = require('method-override');
var hbs = require("hbs");
var bodyParser = require("body-parser");
var mongoClient = require("mongodb").MongoClient;
var app = express();
const jwt = require("jsonwebtoken");
var auth = require("./routes/auth.js");
var checkToken = require("./middleware/check-authToken");
var db;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.urlencoded());

app.use(methodOverride('_method'));


app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "hbs");

var url = "mongodb://localhost:27017";

app.locals.db;
// app.locals.faqdb;
mongoClient.connect(
    url, {
        useNewUrlParser: true
    },
    function(err, client) {
        if (err) throw err;
        db = client.db("school"); //will change db name, when it is created
        // faqdb = client.db("faq");
    }
);

app.locals.ObjectId;
ObjectId = require("mongodb").ObjectID;

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

app.post('/search', function(req, res) {
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

//faq section starts here

// mongoClient.connect("mongodb://localhost:27017",function(err,client){
//   if (err) throw err;
//   db = client.db('faq');
// })

//home page
app.get("/faq", function(req, res) {
    db.collection("addfaq").find().toArray(function(err, result) {
        if (err) throw err;
        res.render("displayfaq", {
            data: result,
            title: "List of FAQ",
            script: "/create.js"
        });
    });
});


//add the faq
app.get('/faq/create', function(req, res) {
    res.render('create', {
        title: "Add your FAQ"
    });
});


app.post("/addfaq", function(req, res) {
    db.collection("addfaq").insertOne(req.body);
    console.log(req.body);
    res.redirect("/listfaq");
});

//displaying the FAQ
app.get("/listfaq", function(req, res) {
    db.collection("addfaq").find().toArray(function(err, result) {
        if (err) throw err;
        res.render("listfaq", {
            data: result,
            title: "FAQ",
            script: "/create.js"
        });
    });
});
//for string 


app.get('/editFaqByid/:id', (req, res) => {
    db.collection("addfaq").findOne({
        _id: ObjectId(req.params.id)
    }, (err, result) => {
        if (err) throw err;
        res.json(result)
        console.log(result)
    })
})

app.put('/updateFaq/:id', (req, res) => {
    db.collection('addfaq').findOneAndUpdate({
        _id: ObjectId(req.params.id)
    }, {
        $set: (req.body)
    }, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})


app.get('/editfaq/:id', function(req, res) {
    var faq = {
        question: req.body.question,
        answer: req.body.answer
    };
    db.collection("addfaq").find({
        _id: req.params.id
    }).toArray(function(err, result) {
        if (err) throw err;
        res.render("editfaq", {
            data: result,
            title: "Edit FAQ",
            question: req.body.question,
            answer: req.body.answer
        });
    });
});

//Update part :
app.put('/listfaq/:id', function(req, res) {
    db.collection('addfaq').findOne({
        _id: req.params.id
    }).toArray(function(err, result) {
        if (error) throw err
            //        .then( db.collection('addfaq') => {
            //             addfaq.question = req.body.question;
            //            addfaq.answer = req.body.answer;
            //        })
    })
});


//delete process
app.delete("/listfaq/:_id", function(req, res) {
    db.collection('addfaq').deleteOne({
        _id: require('mongodb').ObjectID(req.params._id)
    }, function(error, result) {
        if (error)
            throw error
        res.redirect('/listfaq');
    });
});
//faq section ends here
//faq login part starts
var adminLog = [{
        username: "admin",
        email: "admin@gmail.com",
        password: "admin"
    },

];
app.post("/login", function(req, res) {
    for (var i = 0; i < adminLog.length; i++) {
        if (req.body.email == adminLog[i].email && req.body.password == adminLog[i].password) {
            req.session.loggedIn = true;
            req.session.username = adminLog.username;
        }
    }
    res.redirect("/listfaq");
});
app.get("/admin", function(req, res) {
    if (req.session.loggedIn == true) {
        res.render('login');
    } else {
        res.redirect("/listfaq");
    }
});

app.get("/adminlog", function(req, res) {
    res.sendFile('/public/login.html', {
        root: __dirname
    });
})

app.get("/adminlogout", function(req, res) {
        req.session.destroy();
        res.redirect("/faq");
    })
    //faq login part ends here

//Myaccount--works
// app.get("/myaccount", checkToken, (req, res) => {
//     res.render('myAcc.hbs', ({
//         title: "Account Details",
//         data: req.userData._id,
//         script:'/script.js',


//     }));
// });





app.get("/myaccount", checkToken, (req, res) => {
    db.collection('users').find().toArray(function(error, result) {
        if (error)
            throw error;
        res.render('myAcc.hbs', ({
            title: "Account Details",
            data: result,
            script: '/script.js',


        }));
    });


})

hbs.registerHelper('checked', function(value, test) {
    if (value == undefined) return '';
    return value == test ? 'checked' : '';
});


app.put('/myaccount/acc', checkToken, (req, res) => {
    var proId = req.userData._id
    var updProfile = req.body;
    var objectId = require('mongodb').ObjectId
    db.collection('users').update({
        "_id": new objectId(proId)
    }, {
        $set: updProfile
    }, function(error, result) {
        if (error)
            throw error;
        console.log(result);
        // res.json(result);


    })


})


app.listen(3000, function() {
    console.log("Listening on port 3000");
});