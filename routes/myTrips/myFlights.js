const express = require('express');
const router = express.Router();
const mongoClient = require('mongodb').mongoClient

router.get('/BookedFlights', (req, res) => {
    db.collection('myTrips').find().toArray((err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

router.post('/addMyFlights', (req, res) => {
    db.collection('myTrips').insertOne({
        userId: ObjectId(req.query.id),
        flightData: {
            originCity: req.body.originCity,
            destinationCity: req.body.destinationCity,
            journeyDate: req.body.journeyDate,
            returnDate: req.body.returnDate,
            ticketPrice: req.body.ticketPrice
        }
    }, (err, result) => {
        if (err) throw err;
        res.json(result)
    })
})


router.get('/tripsByUserId', (req, res) => {
    db.collection('myTrips').aggrigate([{
        $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "tripData"
        }
    }])
})

module.exports = router;