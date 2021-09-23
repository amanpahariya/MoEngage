const bcrypt = require("bcrypt");
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
                res.send().status(201);
            } else {
                res.send().status(400);
            }
        })
    });
}

module.exports = user;