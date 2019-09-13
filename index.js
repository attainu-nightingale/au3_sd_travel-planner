var express = require("express");
var session = require("express-session");
var hbs = require("hbs");
var bodyParser = require("body-parser");
var mongoClient = require("mongodb").MongoClient;
var authToken = "b3b40691cfbe19a30e9557e935738d2e";
var accountSid = "AC95d45bf3ae0ea163e2f699e84bc61f3e";
const client = require("twilio")(accountSid, authToken);
var app = express();
const jwt = require("jsonwebtoken");
var auth = require("./routes/auth.js");
var myTrips = require("./routes/myTrips/myFlights")
var twilioSms = require('./routes/twilio-sms/sms')
var checkToken = require("./middleware/check-authToken");
var faq = require('./routes/faqRoute')

var sender_id_TEXT = "+12056199473";
var sender_id_WP = "whatsapp:+14155238886";

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "hbs");
app.use('/', faq)

var url = "mongodb+srv://dinu:dinu@travelp-q0fd8.mongodb.net/?retryWrites=true&w=majority";

app.locals.db;

mongoClient.connect(
    url, {
        useNewUrlParser: true
    },
    function(err, client) {
        if (err) throw err;
        db = client.db("TravelPlanner"); //will change db name, when it is created
    }
);

app.locals.ObjectId;
ObjectId = require("mongodb").ObjectID;

app.use(
    session({
        secret: "Hakumanata!! Timon and Pumba. Mogambo khush hua!!!"
    })
);

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
        //data: airlineName,
        script: "/script.js"
    });
});

// logout the user

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

//login authentication
app.use("/authentication", auth);
app.use('/flightBookings', checkToken, myTrips)
app.use('/sendSMS', twilioSms)
    // protected Routes

app.get("/profile", checkToken, (req, res) => {
    res.render("profile.hbs", {
        title: "User Profile",
        data: req.userData._id
    });
});

// app.get("/faq", function(req, res) {
//     res.render("faq.hbs");
// });

//Myaccount--works
// app.get("/myaccount", checkToken, (req, res) => {
//     res.render('myAcc.hbs', ({
//         title: "Account Details",
//         data: req.userData._id,
//         script:'/script.js',

//     }));
// });

app.get("/myaccount", checkToken, (req, res) => {
    db.collection('users').findOne({
        _id: ObjectId(req.userData._id)
    }, (err, result) => {
        if (err) throw err;
        res.render("myAcc.hbs", {
            title: "Account Details",
            data: result,
            script: "/script.js"
        });
    })
});


//custum helper for radio input
hbs.registerHelper('checked', function(value, test) {
    if (value == undefined) return '';
    return value == test ? 'checked' : '';
});


//get list of all hotels 
app.get('/hotels', function(req, res) {
    db.collection('hotels').find().toArray(function(error, result) {
        if (error)
            throw error;
        res.render('hotels.hbs', {
            title: 'hotels',
            data: result,
            script: '/script.js'
        })
    })
});

//city-filter query-working
app.get('/hotels/cityF/:data', function(req, res) {
    var cityId = req.params.data;
    // console.log()
    // var cityId="Delhi";
    var objectId = require('mongodb').ObjectID;

    db.collection('hotels').find({
        "city": cityId
    }).toArray(function(error, result) {
        if (error)
            throw error;
        res.render('hotels.hbs', {
            title: 'hotels',
            data: result,
            script: '/script.js'
        })

    })
})


//working
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

//booking confirm-working
// app.put('/hotels/book/:data',checkToken, (req, res) => {
//     var proId=req.userData._id
//         var hotelN= req.params.data;
//         var objectId = require('mongodb').ObjectID;
//         db.collection('trips').update({"_id": new objectId(proId)},{$set: {bookingHotel: hotelN}},function(error,result){
//             if(error)
//             throw error;
//             console.log(result);

//         })})

//booking  confirmation final page-working
app.put('/hotels/book/', checkToken, (req, res) => {
        var proId = req.userData._id
            // var hotelN= req.body;
            // var objectId = require('mongodb').ObjectID;
            // {bookingHotel: }
            // db.collection('trips').update({"_id": new objectId(proId)},{$set: hotelN},{upsert:true},function(error,result){
        db.collection('trips').insert(req.body, function(error, result) {

            if (error)
                throw error;
            db.collection('trips').update(req.body, {
                $set: {
                    "userid": proId
                }
            }, {
                upsert: true
            })
            console.log(result);
            // res.render('bookingC.hbs',{ 
            //     title:'Confirm Booking',
            //     data:result,
            // script :'/script.js'})
        })
    })
    //working
    // app.get('/hotels/bookings/:data1',checkToken, (req, res) => {
    //     var hotelN1= req.params.data1;
    //     var objectId = require('mongodb').ObjectID;
    // db.collection('trips').find({"bookingHotel":hotelN1}).toArray(function(error,result)
    // {
    //     if (error)
    //         throw error;
    //         res.render('bookingC.hbs',{ 
    //             title:'Confirm Booking',
    //             data:result,
    //         script :'/script.js'})
    //         })
    //     })

//final confirm page of  hotel booking -works but only displays hotel name-working
// app.get('/hotels/bookings/:data1',checkToken, (req, res) => {
//     var hotelN1= req.params.data1;
//     var objectId = require('mongodb').ObjectID;


//         res.render('bookingC.hbs',{ 
//             title:'Confirm Booking',
//             data:hotelN1,
//         script :'/script.js'})
//         })

//final confirm booking page for hotel with name and date-working
app.get('/hotels/bookings/', checkToken, (req, res) => {
    // var proId=req.userData._id
    // var hotelN1= req.params.data1;

    var objectId = require('mongodb').ObjectID;
    // "hotelName":hotelN1
    // db.collection('trips').find({"_id": new objectId(proId)},{"hotelName":hotelN1}).toArray(function(error,result)
    db.collection('trips').find({
        "userid": req.userData._id
    }).toArray(function(error, result) {
        if (error)
            throw error;
        // result.strinify=JSON.stringify(result);
        res.render('bookingC.hbs', {
            title: 'Confirm Booking',
            data: result,
            script: '/script.js'
        })

        // console.log(result);
    })

})

//packages
app.get('/holiday', function(req, res) {
    res.render('holidays.hbs', {
        title: 'Holidays & Travel Packages',
        script: '/script.js'
    });
})



//book package
app.put('/holidays/submit/', checkToken, (req, res) => {
    var proId = req.userData._id
        // var hotelN= req.body;
        // var objectId = require('mongodb').ObjectID;
        // {bookingHotel: }
        // db.collection('trips').update({"_id": new objectId(proId)},{$set: hotelN},{upsert:true},function(error,result){
    db.collection('holidays').insert(req.body, function(error, result) {

        if (error)
            throw error;
        db.collection('holidays').update(req.body, {
            $set: {
                "userid": proId
            }
        }, {
            upsert: true
        })
        console.log(result);


    })
})

app.post("/sendTextSMS", checkToken, (req, res) => {
    client.messages
        .create({
            from: sender_id_TEXT,
            to: `+91 ${req.userData.phone}`,
            body: `Your flight from ${req.body.originCity} to ${req.body.destinationCity} is ${req.body.bookingStatus} with Airline : ${req.body.airLine} \n Enjoy a Safe Journey. \n Regards Travel Planner.`
        })
        .then(message => {
            console.log(message.sid);
            res.json(message);
        })
        .done();
})


var adminLog = [{
        username: "admin",
        email: "admin@gmail.com",
        password: "admin"
    },

];
app.post("/login", function(req, res) {
    var flag = false;
    for (var i = 0; i < adminLog.length; i++) {
        if (
            adminLog[i].email == req.body.email &&
            adminLog[i].password == req.body.password
        ) {
            flag = true;
            break;
        }
    }
    if (flag) {
        req.session.username = adminLog.username;
        req.session.loggedIn = true;
        res.redirect("/listfaq");
    } else {
        res.json("Incorrect Credentials")
    }

    // if (req.body.email === adminLog.email && req.body.password === adminLog.password) {
    //     req.session.loggedIn = true;
    //     req.session.username = adminLog.username;
    //     res.redirect("/listfaq");
    // } else {
    //     res.json("Incorrect Credentials")
    // }
});
app.get("/admin", function(req, res) {
    if (req.session.loggedIn == true) {
        res.render('login');
    } else {
        res.redirect("/listfaq");
    }
});

app.get("/adminlog", function(req, res) {
    res.sendFile(__dirname + '/public/login.html');
})

app.get("/adminlogout", function(req, res) {
    req.session.destroy();
    res.redirect("/faq");
})
app.listen(3000, function() {
    console.log("Listening on port 3000");
});