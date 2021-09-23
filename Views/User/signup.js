const bcrypt = require("bcrypt");
const AccessToken = require("../TokenManager/TokenManager");
const User = require("../../DB/Schema/index").User;
const saltRound = 10;
const user = (req, res) => {
    bcrypt.hash(req.body.password, saltRound, (err, hash) => {
        User.insertMany({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: hash
        }, (err, result) => {
            if (!err) {
                const userData = {id: result[0]._id, firstname: req.body.firstname};
                const accessToken = AccessToken(userData);
                res
                    .status(202)
                    .cookie("token", accessToken, {
                        sameSite: "none",
                        secure: true,
                        path: "/",
                        expires: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    })
                    .json({
                        isLogin: true,
                        userData
                    });
            } else {
                res.status(400).send();
            }
        })
    });
}

module.exports = user;