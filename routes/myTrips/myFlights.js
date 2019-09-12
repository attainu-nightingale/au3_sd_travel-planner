const express = require("express");
const router = express.Router();
router.get("/", (req, res) => {
    res.render("myFlights.hbs", {
        title: "My Flight Bookings",
        script: "/script.js"
    });
});
// router.get('/BookedFlights', (req, res) => {
//     db.collection('myTrips').find().toArray((err, result) => {
//         if (err) throw err;
//         res.json(result)
//     })
// })
router.post("/addMyFlights", (req, res) => {
    db.collection("myTrips").insertOne({
            userId: ObjectId(req.userData._id),
            type: "Flight",
            flightData: req.body
        },
        (err, result) => {
            if (err) throw err;
            res.json(result);
        }
    );
});
router.get("/getMyBookings", (req, res) => {
    db.collection("users")
        .aggregate([{
                $match: {
                    _id: ObjectId("5d696ccb499cda100323e701")
                }
            },
            {
                $lookup: {
                    from: "myTrips",
                    localField: "_id",
                    foreignField: "userId",
                    as: "flightData"
                }
            }
        ])
        .toArray((err, result) => {
            if (err) throw err;
            res.json(result);
        });
});
module.exports = router;