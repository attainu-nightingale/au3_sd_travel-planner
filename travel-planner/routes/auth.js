var express = require('express');
var router = express.Router();

router.post('/auth', function(req, res) {              //auth route
  var db = app.locals.db;
  db.collection('admin').find().toArray(function (err, result) { //db name needs to be changed
    if (err)
      throw error;
    for (var i = 0; i < result.length; i++) {
      if (
        req.body.username == result[i].username &&
        req.body.password === result[i].password) {
        req.session.loggedIn = true;
        name = req.body.username
      }
    }
    res.redirect('/profile');             
  });
});

router.get('/profile', function (req, res) {
  if (req.session.loggedIn) {
    res.render('home.hbs', { //render page to be changed 
      title: 'User Details',
      user: name
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;