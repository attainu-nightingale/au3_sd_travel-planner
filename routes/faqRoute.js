const express = require('express');
const router = express.Router();

//add the faq
router.get('/faq/create', function(req, res) {
    res.render('create', {
        title: "Add your FAQ"
    });
});

router.get("/faq", function(req, res) {
    db.collection("addfaq").find().toArray(function(err, result) {
        if (err) throw err;
        res.render("displayfaq.hbs", {
            data: result,
            title: "List of FAQ",
            script: "./faq.js"
        });
    });
});

router.post("/addfaq", function(req, res) {
    db.collection("addfaq").insertOne(req.body);
    console.log(req.body);
    res.redirect("/listfaq");
});

//displaying the FAQ
router.get("/listfaq", function(req, res) {
    db.collection("addfaq").find().toArray(function(err, result) {
        if (err) throw err;
        res.render("listfaq", {
            data: result,
            title: "FAQ",
            script: "./faq.js"
        });
    });
});
//for string 


router.get('/editFaqByid/:id', (req, res) => {
    db.collection("addfaq").findOne({
        _id: ObjectId(req.params.id)
    }, (err, result) => {
        if (err) throw err;
        res.json(result)
        console.log(result)
    })
})

router.put('/updateFaq/:id', (req, res) => {
    db.collection('addfaq').findOneAndUpdate({
        _id: ObjectId(req.params.id)
    }, {
        $set: (req.body)
    }, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})


//delete process
router.delete("/listfaq/:_id", function(req, res) {
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

module.exports = router;