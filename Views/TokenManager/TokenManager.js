const jwt = require("jsonwebtoken");

const accessToken = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "1d"});
}

module.exports = accessToken;