const Ratings = require("../DB/Schema/index").Rating;
const addRatings = require("../Views/Review/addratings");
const updateAmine = require("../Views/Review/updateamine");
const animeExist = (req, res) => {
    Ratings.find({anime_id: req.body.anime_id}, (err, result) => {
        if (!err) {
            if (result.length === 0) {
                addRatings(req, res);
            } else {
                updateAmine(req, res);
            }
        } else {
            res.status(406).send();
        }
    })
}

module.exports = animeExist;