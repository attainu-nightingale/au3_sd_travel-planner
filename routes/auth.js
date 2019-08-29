const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').mongoClient
const bcrypt = require('bcrypt');
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
                            _id: user._id
                        },
                        'secret', {
                            expiresIn: '1h'
                        });
                    return res.status(200).json({
                        token: JWTToken,
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


const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if (typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}

router.get('/profile', checkToken, (req, res) => {
    //verify the JWT token generated for the user
    jwt.verify(req.token, 'secret', (err, authorizedData) => {
        if (err) {
            //If error send Forbidden (403)
            res.sendStatus(403);
        } else {
            //If token is successfully verified, we can send the autorized data 
            res.json({
                message: 'Successful log in',
                authorizedData
            });
        }
    })
});

module.exports = router;