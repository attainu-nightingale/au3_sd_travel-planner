const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').mongoClient
const bcrypt = require('bcrypt');
var session = require('express-session');
const jwt = require('jsonwebtoken');

router.post('/signup', function(req, res) { //auth route
    db.collection('users').findOne({
        username: req.body.username
    }, (err, result) => {
        if (err) {
            throw err;
        } else if (result == null) {
            bcrypt.hash(req.body.password, 12, function(err, hash) {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    if (req.body.password == req.body.confirmPass) {
                        var userData = {
                            username: req.body.username,
                            password: hash
                        }
                        db.collection("users").insertOne(userData, (err, result) => {
                            if (err) throw err;
                            res.json("User Created");
                        });
                    } else {
                        res.json("Both Password Should be Same")
                    }
                }
            });
        } else if (result) {
            res.json("User Already Exist")
        }
    })

});
router.post('/login', function(req, res) {
    db.collection('users').findOne({
        username: req.body.username
    }, (err, user) => {
        if (err) {
            throw err;
        } else if (user == null) {
            res.json("User Not Found")
        } else if (user) {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if (err) {
                    return res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }
                if (result) {
                    const JWTToken = jwt.sign({
                            username: user.username,
                            _id: user._id,
                            phone: user.phone
                        },
                        'secret', {
                            expiresIn: '2h'
                        });
                    req.session.token = JWTToken;
                    return res.status(200).json({
                        token: JWTToken,
                        redirect: '/profile',
                        success: 'Login Success',
                    });
                }
                return res.status(401).json({
                    failed: 'Incorrect Password'
                });
            });
        }
    })
});


router.post('/resetpassword', (req, res) => {
    db.collection('users').findOne({
        username: req.body.username
    }, (err, result) => {
        if (err) {
            throw err;
        } else if (result == null) {
            res.json("Email Does Not Exist")
        } else if (result) {
            bcrypt.hash(req.body.password, 12, function(err, hash) {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    if (req.body.password == req.body.confirmPass) {
                        var userData = {
                            password: hash
                        }
                        db.collection("users").findOneAndUpdate({
                            username: req.body.username
                        }, {
                            $set: {
                                password: userData.password
                            }
                        }, (err, result) => {
                            if (err) throw err;
                            res.json("Password Updated");
                        });
                    } else {
                        res.json("Both Password Should be Same")
                    }
                }
            });
        }
    })
})
router.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;