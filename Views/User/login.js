const bcrypt = require("bcrypt");
const User = require("../../DB/Schema/index").User;
const AccessToken = require("../TokenManager/TokenManager");
const user = (req, res) => {
    User.findOne({email: req.body.email}, (err, foundUser) => {
        if (!err && foundUser) {
            bcrypt.compare(req.body.password, foundUser.password, (e, result) => {
                if (result) {
                    const userData = {id: foundUser.id, firstname: foundUser.firstname};
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
                    res.status(401).json({"error": "incorrect password or email"});
                }
            })
        } else if (foundUser == null) {
            res.status(401).json({"error": "incorrect password or email"});
        }
    })
}

module.exports = user;