const Ratings = require("../../DB/Schema/index").Rating;

const updateAmine = (req, res) => {
    Ratings.find({
            anime_id: req.body.anime_id,
            "ratings.user_id": req.body.user
        },
        {
            ratings: {
                $elemMatch: {
                    user_id: req.body.user
                }
            }
        }
        , (err, result) => {
            if (!err) {
                if (result.length === 0) {
                    addRating(req, res);
                } else {
                    updateRating(req, res);
                }
            } else {
                res.status(406).send();
            }
        })
}

const addRating = (req, res) => {
    Ratings.updateOne({anime_id: req.body.anime_id}, {
        $push: {
            ratings: {
                user_id: req.body.user,
                rating: req.body.rate
            }
        }
    }, (err, result) => {
        if (!err) {
            res.status(201).send("added review");
        } else {
            res.status(406).send();
        }
    })
}


const updateRating = (req, res) => {
    Ratings.updateOne(
        {
            anime_id: req.body.anime_id,
            "ratings.user_id": req.body.user
        }, {
            '$set': {
                'ratings.$.rating': req.body.rate
            }
        },
        (err, result) => {
            res.send(result);
        }
    )
}

module.exports = updateAmine;