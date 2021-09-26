const Ratings = require("../../DB/Schema/index").Rating;

const getRating = (req, res) => {
    Ratings.find({amine_id: req.body.amine_id}, (err, result) => {
        if (!err) {
            const sum = result[0].ratings.reduce((acc, curr) => {
                return acc + curr.rating;
            }, 0)
            res.status(200).json({"rating": sum / result[0].ratings.length});
        } else {
            res.status(406).send(err);
        }
    })
}

module.exports = getRating;