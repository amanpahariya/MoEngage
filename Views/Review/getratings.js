const Ratings = require("../../DB/Schema/index").Rating;

const getRating = (req, res) => {
    Ratings.find({anime_id: req.query.anime_id}, (err, result) => {
        if (!err) {
            if (result.length === 0) {
                res.status(200).json({"rating": 0, "total_user": 0})
            } else {
                const sum = result[0].ratings.reduce((acc, curr) => {
                    return acc + curr.rating;
                }, 0)
                Ratings.find(
                    {
                        anime_id: req.query.anime_id,
                        "ratings.user_id": req.query.user_id
                    },
                    {
                        ratings: {
                            $elemMatch: {
                                user_id: req.query.user_id
                            }
                        }
                    }, (e, r) => {
                        if (r.length !== 0) {
                            res.status(200).json({
                                "rating": sum / result[0].ratings.length,
                                "total_user": result[0].ratings.length,
                                "user_rate": r[0].ratings[0].rating
                            });
                        }else{
                            res.status(200).json({
                                "rating": sum / result[0].ratings.length,
                                "total_user": result[0].ratings.length,
                            });
                        }
                    }
                )
            }

        } else {
            res.status(406).send(err);
        }
    })
}

module.exports = getRating;