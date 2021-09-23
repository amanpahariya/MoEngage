const User = require("../DB/Schema/index").User;

const userExist = (req, res, next) => {
    User.find({email: req.body.email}, (err, result) => {
        if (result.length === 0) {
            next();
        } else if (result.length === 1) {
            res.status(406).json({"message": "already_exist"});
        } else {
            res.status(405).send();
        }
    })
}

module.exports = userExist;