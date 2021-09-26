const Ratings = require("../../DB/Schema/index").Rating;

const addRating = (req, res) => {
    Ratings.insertMany({
        anime_id: req.body.anime_id,
        ratings: {
            user_id: req.body.user,
            rating: req.body.rate
        }
    }, (err, result) => {
        if (!err) {
            res.status(201).send("added review");
        } else {
            res.status(406).send(err);
        }
    })
}

module.exports = addRating;