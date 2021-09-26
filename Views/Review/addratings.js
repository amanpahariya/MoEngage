const Ratings = require("../../DB/Schema/index").Rating;

const addRating = (req, res) => {
    Ratings.insertMany({
        amine_id: req.body.amine_id,
        ratings: {
            user_id: req.body.user,
            rating: req.body.rate
        }
    }, (err, result) => {
        if (!err) {
            res.status(201).send("added review");
        } else {
            console.log(err)
            res.status(406).send(err);
        }
    })
}

module.exports = addRating;